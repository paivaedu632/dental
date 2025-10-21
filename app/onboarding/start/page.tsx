import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/client'
import { OnboardingLoader } from '@/components/onboarding/onboarding-loader'

export default async function OnboardingStartPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams
  const sessionId = session_id

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Link</h1>
          <p className="text-gray-600 mb-4">
            This onboarding link is invalid. Please contact support.
          </p>
          <a
            href={`mailto:${process.env.ADMIN_EMAIL}`}
            className="text-blue-600 hover:underline"
          >
            Contact Support
          </a>
        </div>
      </div>
    )
  }

  // Verify Stripe session
  let session: Awaited<ReturnType<typeof stripe.checkout.sessions.retrieve>>
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Session</h1>
          <p className="text-gray-600">
            This payment session is invalid. Please contact support.
          </p>
        </div>
      </div>
    )
  }

  if (session.payment_status !== 'paid') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Payment Not Completed</h1>
          <p className="text-gray-600">
            Your payment was not completed. Please try again.
          </p>
        </div>
      </div>
    )
  }

  // Poll for dentist record (webhook might be processing)
  const supabase = await createClient()
  let token: string | null = null

  for (let i = 0; i < 10; i++) {
    const { data: dentist } = await supabase
      .from('dentists')
      .select('id')
      .eq('stripe_customer_id', session.customer as string)
      .single()

    if (dentist) {
      // Found dentist, get token
      const { data: tokenData } = await supabase
        .from('onboarding_tokens')
        .select('token')
        .eq('dentist_id', dentist.id)
        .eq('used', false)
        .single()

      if (tokenData) {
        token = tokenData.token
        break
      }
    }

    // Wait 500ms before retry
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  if (!token) {
    // Dev fallback: if webhook hasn't created records, create dentist and token locally
    if (process.env.NODE_ENV === 'development') {
      const supabase = await createClient()
      const customerId = session.customer as string
      const email = (session.customer_details?.email || session.customer_email) as string | undefined

      // Ensure dentist exists
      let dentistId: string | null = null
      const { data: byCustomer } = await supabase
        .from('dentists')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single()
      if (byCustomer?.id) {
        dentistId = (byCustomer as any).id
      } else {
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
          .single()
        dentistId = (inserted as any)?.id || null
      }

      // Create token
      if (dentistId) {
        const devToken = `dev-${Math.random().toString(36).slice(2)}`
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        await supabase
          .from('onboarding_tokens')
          .insert({ dentist_id: dentistId, token: devToken, expires_at: expiresAt, used: false })
        redirect(`/onboarding/${devToken}`)
      }
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Setup Error</h1>
          <p className="text-gray-600 mb-4">
            We're having trouble setting up your account. Please contact support
            and reference session: {sessionId}
          </p>
          <a
            href={`mailto:${process.env.ADMIN_EMAIL}`}
            className="text-blue-600 hover:underline"
          >
            Contact Support
          </a>
        </div>
      </div>
    )
  }

  // Redirect to onboarding form
  redirect(`/onboarding/${token}`)
}