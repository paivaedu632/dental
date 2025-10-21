import { NextResponse } from 'next/server'
import { z } from 'zod'
import { bookingFormSchema } from '@/lib/validations'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createCheckoutSession } from '@/lib/stripe/client'

const RequestSchema = z.object({
  dentist_id: z.string().optional(),
  dentist_slug: z.string().optional(),
  data: bookingFormSchema,
})

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null)
    const parsed = RequestSchema.parse(json)

    const supabase = createSupabaseServerClient()

    // Resolve dentist_id from slug if necessary
    let dentistId = parsed.dentist_id || ''
    if (!dentistId && parsed.dentist_slug) {
      const { data: dentist, error: dentistErr } = await supabase
        .from('dentists')
        .select('id')
        .eq('booking_page_slug', parsed.dentist_slug)
        .single()
      if (dentistErr || !dentist?.id) {
        return NextResponse.json({ error: 'Invalid dentist' }, { status: 400 })
      }
      dentistId = dentist.id as string
    }
    if (!dentistId) {
      return NextResponse.json({ error: 'Missing dentist_id' }, { status: 400 })
    }

    const { patientName, patientEmail, patientPhone, appointmentDate, appointmentTime } = parsed.data
    const scheduledAtISO = `${appointmentDate}T${appointmentTime}:00`

    // Insert appointment
    const { data: appt, error: apptErr } = await supabase
      .from('appointments')
      .insert({
        dentist_id: dentistId,
        patient_name: patientName,
        patient_email: patientEmail,
        patient_phone: patientPhone,
        scheduled_at: scheduledAtISO,
        status: 'scheduled',
        payment_status: 'pending',
      })
      .select('id')
      .single()
    if (apptErr || !appt?.id) {
      return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
    }
    const appointmentId = appt.id as string

    // Create reschedule token (simple random token valid for 30 days)
    const token = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10)
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    await supabase
      .from('reschedule_tokens')
      .insert({
        dentist_id: dentistId,
        appointment_id: appointmentId,
        token,
        expires_at: expiresAt,
      })

    // Optional: Lookup dentist name for email metadata
    let dentistName = 'Doctor'
    try {
      const { data: dentistRow } = await supabase
        .from('dentists')
        .select('business_name, contact_name')
        .eq('id', dentistId)
        .single()
      dentistName = (dentistRow as any)?.business_name || (dentistRow as any)?.contact_name || dentistName
    } catch {}

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const successUrl = `${baseUrl}/success`
    const cancelUrl = `${baseUrl}/book?dentist_id=${encodeURIComponent(dentistId)}&cancel=1`

    // Create checkout session for patient booking prepayment ($79)
    const session = await createCheckoutSession(
      7900,
      'Patient Booking Prepayment',
      {
        type: 'patient_booking',
        appointment_id: appointmentId,
        patient_email: patientEmail,
        patient_name: patientName,
        dentist_name: dentistName,
        appointment_time: `${appointmentDate} ${appointmentTime}`,
        reschedule_token: token,
      },
      successUrl,
      cancelUrl,
    )

    return NextResponse.json({ url: session.url, appointmentId })
  } catch (e: any) {
    const message = e?.message || 'Invalid request'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}