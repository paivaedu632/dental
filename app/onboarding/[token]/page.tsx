import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { OnboardingForm } from '@/components/onboarding/onboarding-form'

export default async function OnboardingPage({
  params,
  searchParams,
}: {
  params: { token: string }
  searchParams?: { dev?: string; dentistId?: string; email?: string }
}) {
  // Dev bypass: allow rendering the form without Supabase when dev flag is set
  if (process.env.NODE_ENV === 'development' && searchParams?.dev === '1') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <OnboardingForm
          dentistId={searchParams.dentistId || 'dev-dentist'}
          email={searchParams.email || 'dev@example.com'}
          token={params.token}
        />
      </div>
    )
  }

  const supabase = await createClient()

  // Verify token
  const { data: tokenData } = await supabase
    .from('onboarding_tokens')
    .select('*, dentists(*)')
    .eq('token', params.token)
    .eq('used', false)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (!tokenData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Invalid or Expired Link</h1>
          <p className="text-gray-600 mb-4">
            This onboarding link is invalid or has expired. Please contact
            support for a new link.
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

  // Check if already completed
  if ((tokenData as any).dentists?.contact_name) {
    // Already onboarded, redirect to dashboard
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <OnboardingForm
        dentistId={(tokenData as any).dentist_id}
        email={(tokenData as any).dentists?.email}
        token={params.token}
      />
    </div>
  )
}