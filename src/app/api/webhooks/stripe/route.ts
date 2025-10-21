import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email/client';
import { paymentFailedEmail, appointmentConfirmationEmail } from '@/lib/email/templates';
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Stripe expects the raw request body for signature verification.
export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get('stripe-signature') ?? '';

  // Always respond 200 to Stripe to avoid retries, but log and no-op on errors.
  if (!webhookSecret) {
    console.error('[stripe-webhook] Missing STRIPE_WEBHOOK_SECRET');
    return NextResponse.json({ received: true }, { status: 200 });
  }

  let event: import('stripe').Stripe.Event;
  try {
    const payload = await req.text();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err: any) {
    console.error('[stripe-webhook] Signature verification failed:', err?.message || err);
    return NextResponse.json({ received: true }, { status: 200 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as import('stripe').Stripe.Checkout.Session;
        const customerId = typeof session.customer === 'string' ? session.customer : undefined;
        const email = session.customer_details?.email || session.customer_email || undefined;
        const name = (session.metadata?.name as string) || undefined;
        const metadataType = (session.metadata?.type as string) || undefined;

        console.log('[stripe-webhook] checkout.session.completed', {
          id: session.id,
          customerId,
          email,
          metadataType,
        });

        // Only handle trial signups here
        if (metadataType === 'trial_signup') {
          try {
            const supabase = createSupabaseServerClient();

            // 1) Find or create dentist linked to this Stripe customer/email
            let dentistId: string | undefined;

            // Prefer lookup by Stripe customer id
            if (customerId) {
              const { data: byCustomer } = await supabase
                .from('dentists')
                .select('id')
                .eq('stripe_customer_id', customerId)
                .single();
              if (byCustomer?.id) dentistId = byCustomer.id as any;
            }

            // Fallback: lookup by email
            if (!dentistId && email) {
              const { data: byEmail } = await supabase
                .from('dentists')
                .select('id, stripe_customer_id')
                .eq('email', email)
                .single();
              if (byEmail?.id) dentistId = byEmail.id as any;

              // Attach stripe_customer_id if missing
              if (byEmail && !byEmail.stripe_customer_id && customerId) {
                await supabase
                  .from('dentists')
                  .update({ stripe_customer_id: customerId })
                  .eq('id', byEmail.id);
              }
            }

            // Create dentist if not found
            if (!dentistId) {
              const { data: inserted } = await supabase
                .from('dentists')
                .insert({
                  email: email || null,
                  contact_name: null,
                  stripe_customer_id: customerId || null,
                  current_status: 'payment_received',
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                })
                .select('id')
                .single();
              dentistId = inserted?.id as any;
            } else {
              // Ensure status reflects successful payment
              await supabase
                .from('dentists')
                .update({
                  current_status: 'payment_received',
                  updated_at: new Date().toISOString(),
                })
                .eq('id', dentistId);
            }

            // 2) Create onboarding token (24h expiry)
            if (dentistId) {
              const token = randomUUID();
              const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
              await supabase
                .from('onboarding_tokens')
                .insert({
                  dentist_id: dentistId,
                  token,
                  expires_at: expiresAt,
                  used: false,
                });
            }
          } catch (signupErr: any) {
            console.error('[stripe-webhook] Trial signup handling error:', signupErr?.message || signupErr);
          }
        }

        break;
      }

      case 'payment_intent.succeeded': {
        const pi = event.data.object as import('stripe').Stripe.PaymentIntent;
        const metadata = pi.metadata || {};
        console.log('[stripe-webhook] payment_intent.succeeded', { id: pi.id, metadata });

        // Handle patient booking payments: update appointment and dentist budget
        if (metadata?.type === 'patient_booking' && metadata?.appointment_id) {
          try {
            const supabase = createSupabaseServerClient();

            // 1) Mark appointment as paid
            const appointmentId = metadata.appointment_id as string;
            const { error: apptUpdateError } = await supabase
              .from('appointments')
              .update({ payment_status: 'paid' })
              .eq('id', appointmentId);
            if (apptUpdateError) {
              console.error('[stripe-webhook] Appointment update error:', apptUpdateError.message);
            }

            // 2) Retrieve appointment to get dentist_id
            const { data: appointment, error: apptFetchError } = await supabase
              .from('appointments')
              .select('dentist_id')
              .eq('id', appointmentId)
              .single();
            if (apptFetchError) {
              console.error('[stripe-webhook] Appointment fetch error:', apptFetchError.message);
            }

            // 3) Increment dentist.trial_budget_from_patients by 79
            const dentistId = (appointment as any)?.dentist_id as string | undefined;
            if (dentistId) {
              // Read current value
              const { data: dentist, error: dentistFetchError } = await supabase
                .from('dentists')
                .select('trial_budget_from_patients')
                .eq('id', dentistId)
                .single();
              if (dentistFetchError) {
                console.error('[stripe-webhook] Dentist fetch error:', dentistFetchError.message);
              } else {
                const current = Number((dentist as any)?.trial_budget_from_patients ?? 0);
                const next = current + 79;
                const { error: dentistUpdateError } = await supabase
                  .from('dentists')
                  .update({ trial_budget_from_patients: next })
                  .eq('id', dentistId);
                if (dentistUpdateError) {
                  console.error('[stripe-webhook] Dentist budget update error:', dentistUpdateError.message);
                }
              }
            }
          } catch (bookingErr: any) {
            console.error('[stripe-webhook] Booking handling error:', bookingErr?.message || bookingErr);
          }
        }

        // Example email confirmation when booking metadata is present
        try {
          const patientEmail = metadata.patient_email;
          const patientName = metadata.patient_name || 'Patient';
          const dentistName = metadata.dentist_name || 'Doctor';
          const datetime = metadata.appointment_time || '';
          const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
          const rescheduleLink = `${baseUrl}/reschedule/${metadata.reschedule_token || ''}`;
          if (patientEmail) {
            const html = appointmentConfirmationEmail(patientName, dentistName, datetime, 'Practice Address', rescheduleLink);
            await sendEmail({ to: patientEmail, subject: 'Appointment Confirmed', html });
          }
        } catch (mailErr: any) {
          console.error('[stripe-webhook] Appointment email error:', mailErr?.message || mailErr);
        }

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as import('stripe').Stripe.Invoice;
        const customerId = typeof invoice.customer === 'string' ? invoice.customer : undefined;
        console.log('[stripe-webhook] invoice.payment_failed', { id: invoice.id, customerId });

        // Pause dentist account and notify
        try {
          const supabase = createSupabaseServerClient();
          // 1) Update dentist account_status to 'paused'
          const { error: pauseError } = await supabase
            .from('dentists')
            .update({ account_status: 'paused' })
            .eq('stripe_customer_id', customerId ?? '');
          if (pauseError) {
            console.error('[stripe-webhook] Dentist pause update error:', pauseError.message);
          }

          // 2) Lookup dentist email and notify
          const { data: dentist, error: dentistLookupError } = await supabase
            .from('dentists')
            .select('email')
            .eq('stripe_customer_id', customerId ?? '')
            .single();
          if (dentistLookupError) {
            console.error('[stripe-webhook] Dentist lookup error:', dentistLookupError.message);
          } else if (dentist?.email) {
            await sendEmail({ to: dentist.email, subject: 'Payment Failed — Action Required', html: paymentFailedEmail('Doctor') });
          }
        } catch (mailErr: any) {
          console.error('[stripe-webhook] Payment failed handling error:', mailErr?.message || mailErr);
        }

        break;
      }

      default: {
        console.log('[stripe-webhook] Unhandled event type:', event.type);
      }
    }
  } catch (handlerErr: any) {
    console.error('[stripe-webhook] Handler error:', handlerErr?.message || handlerErr);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}