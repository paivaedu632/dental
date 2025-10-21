# Prompt for Claude Code

```
I need you to implement a complete onboarding flow from scratch that maximizes completion rates. After Stripe payment, users should be redirected IMMEDIATELY to the onboarding form (not to a success page or email).

## Overview

The flow should be:
Payment succeeds → Stripe redirects to /onboarding/start → Verify payment → Redirect to /onboarding/{token} → User completes 4-step form → Submit → Redirect to dashboard

Target: 85-95% completion rate

## Step 1: Create Onboarding Start Handler

Create file: /app/onboarding/start/page.tsx

```typescript
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/client'
import { OnboardingLoader } from '@/components/onboarding/onboarding-loader'

export default async function OnboardingStartPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  const sessionId = searchParams.session_id

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Link</h1>
          <p className="text-gray-600 mb-4">
            This onboarding link is invalid. Please contact support.
          </p>
          
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
  let session
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
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Setup Error</h1>
          <p className="text-gray-600 mb-4">
            We're having trouble setting up your account. Please contact support
            and reference session: {sessionId}
          </p>
          
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
```

## Step 2: Create Loading Component

Create file: /components/onboarding/onboarding-loader.tsx

```typescript
export function OnboardingLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold mb-2 text-gray-900">
          Processing your payment...
        </h2>
        <p className="text-gray-600">
          You'll be redirected to setup in a moment.
        </p>
      </div>
    </div>
  )
}
```

## Step 3: Update Stripe Success URL

File: /lib/stripe/client.ts

In the createCheckoutSession function, update success_url:

```typescript
success_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/start?session_id={CHECKOUT_SESSION_ID}`,
```

## Step 4: Create Onboarding Token Page

Create file: /app/onboarding/[token]/page.tsx

```typescript
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { OnboardingForm } from '@/components/onboarding/onboarding-form'

export default async function OnboardingPage({
  params,
}: {
  params: { token: string }
}) {
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
  if (tokenData.dentists.contact_name) {
    // Already onboarded, redirect to dashboard
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <OnboardingForm
        dentistId={tokenData.dentist_id}
        email={tokenData.dentists.email}
        token={params.token}
      />
    </div>
  )
}
```

## Step 5: Create Multi-Step Onboarding Form Component

Create file: /components/onboarding/onboarding-form.tsx

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { onboardingFormSchema, type OnboardingFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

const DAYS = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su']

interface OnboardingFormProps {
  dentistId: string
  email: string
  token: string
}

export function OnboardingForm({ dentistId, email, token }: OnboardingFormProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      businessName: '',
      contactName: '',
      email: email,
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      services: [{ name: 'Cleaning', price: 79 }],
      availableDays: ['M', 'T', 'W', 'Th', 'F'],
      hoursStart: '09:00',
      hoursEnd: '17:00',
      maxPatientsPerMonth: 30,
    },
  })

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`onboarding_progress_${dentistId}`)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        form.reset(data)
      } catch (e) {
        console.error('Failed to load saved progress:', e)
      }
    }
  }, [dentistId, form])

  // Save progress on every change
  const watchedValues = form.watch()
  useEffect(() => {
    localStorage.setItem(
      `onboarding_progress_${dentistId}`,
      JSON.stringify(watchedValues)
    )
  }, [watchedValues, dentistId])

  // Warn before leaving if form is dirty
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (form.formState.isDirty && !form.formState.isSubmitSuccessful) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [form.formState.isDirty, form.formState.isSubmitSuccessful])

  const progressPercent = (step / 4) * 100

  async function onSubmit(data: OnboardingFormData) {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          dentistId,
          token,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to complete onboarding')
      }

      // Clear saved progress
      localStorage.removeItem(`onboarding_progress_${dentistId}`)

      // Show success
      toast.success('Setup complete! Launching your ads...')

      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (error) {
      console.error('Onboarding error:', error)
      toast.error('Failed to complete setup. Please try again.')
      setIsSubmitting(false)
    }
  }

  function nextStep() {
    // Validate current step fields before proceeding
    const fieldsToValidate = getFieldsForStep(step)
    form.trigger(fieldsToValidate).then((isValid) => {
      if (isValid) {
        setStep(step + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }

  function prevStep() {
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function getFieldsForStep(currentStep: number): (keyof OnboardingFormData)[] {
    switch (currentStep) {
      case 1:
        return ['businessName', 'contactName', 'email', 'phone', 'address', 'city', 'state', 'zip']
      case 2:
        return ['services']
      case 3:
        return ['availableDays', 'hoursStart', 'hoursEnd', 'maxPatientsPerMonth']
      default:
        return []
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">DentalFlow</h1>
        <p className="text-gray-600">Complete your setup</p>
      </div>

      {/* Urgency Banner */}
      <Alert className="mb-6 border-yellow-400 bg-yellow-50">
        <AlertCircle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Complete setup now to launch your ads today.</strong> This form
          takes 2 minutes. Link expires in 24 hours.
        </AlertDescription>
      </Alert>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span className="font-medium">{progressPercent.toFixed(0)}% Complete</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
        {/* Step Indicator */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Step {step} of 4 •{' '}
            {step === 1 && 'About 30 seconds'}
            {step === 2 && 'About 20 seconds'}
            {step === 3 && 'About 30 seconds'}
            {step === 4 && 'Final step'}
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Step 1: Business Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  Tell us about your practice
                </h2>
                <p className="text-sm text-gray-600">
                  Basic information about your dental practice
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    {...form.register('businessName')}
                    placeholder="Austin Dental Care"
                  />
                  {form.formState.errors.businessName && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.businessName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="contactName">Your Name *</Label>
                  <Input
                    id="contactName"
                    {...form.register('contactName')}
                    placeholder="Dr. Sarah Johnson"
                  />
                  {form.formState.errors.contactName && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.contactName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register('email')}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This is where we'll send booking notifications
                  </p>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    {...form.register('phone')}
                    placeholder="(555) 123-4567"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Practice Address *</Label>
                  <Input
                    id="address"
                    {...form.register('address')}
                    placeholder="123 Main Street"
                  />
                  {form.formState.errors.address && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" {...form.register('city')} placeholder="Austin" />
                    {form.formState.errors.city && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select
                      value={form.watch('state')}
                      onValueChange={(value) => form.setValue('state', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {US_STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.state && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.state.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="zip">ZIP *</Label>
                    <Input id="zip" {...form.register('zip')} placeholder="78701" />
                    {form.formState.errors.zip && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.zip.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Services */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  What will you offer new patients?
                </h2>
                <p className="text-sm text-gray-600">
                  Select at least one service
                </p>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="cleaning"
                      checked={form
                        .watch('services')
                        .some((s) => s.name === 'Cleaning')}
                      onCheckedChange={(checked) => {
                        const current = form.watch('services')
                        if (checked) {
                          form.setValue('services', [
                            ...current,
                            { name: 'Cleaning', price: 79 },
                          ])
                        } else {
                          form.setValue(
                            'services',
                            current.filter((s) => s.name !== 'Cleaning')
                          )
                        }
                      }}
                    />
                    <div className="flex-1">
                      <Label htmlFor="cleaning" className="font-medium cursor-pointer">
                        Cleaning - $79
                      </Label>
                      <p className="text-sm text-gray-600">
                        Professional teeth cleaning
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="cleaning-exam"
                      checked={form
                        .watch('services')
                        .some((s) => s.name === 'Cleaning + Exam')}
                      onCheckedChange={(checked) => {
                        const current = form.watch('services')
                        if (checked) {
                          form.setValue('services', [
                            ...current,
                            { name: 'Cleaning + Exam', price: 99 },
                          ])
                        } else {
                          form.setValue(
                            'services',
                            current.filter((s) => s.name !== 'Cleaning + Exam')
                          )
                        }
                      }}
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="cleaning-exam"
                        className="font-medium cursor-pointer"
                      >
                        Cleaning + Exam - $99
                      </Label>
                      <p className="text-sm text-gray-600">
                        Cleaning plus comprehensive examination
                      </p>
                    </div>
                  </div>
                </div>

                {form.formState.errors.services && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.services.message}
                  </p>
                )}

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Tip:</strong> Keep pricing simple. Most dentists start
                    with just the $79 cleaning offer.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          )}

          {/* Step 3: Availability */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  When can you see new patients?
                </h2>
                <p className="text-sm text-gray-600">
                  Set your availability preferences
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Available Days *</Label>
                  <div className="flex gap-2 mt-2">
                    {DAYS.map((day) => (
                      <Button
                        key={day}
                        type="button"
                        variant={
                          form.watch('availableDays').includes(day)
                            ? 'default'
                            : 'outline'
                        }
                        className="flex-1"
                        onClick={() => {
                          const current = form.watch('availableDays')
                          if (current.includes(day)) {
                            form.setValue(
                              'availableDays',
                              current.filter((d) => d !== day)
                            )
                          } else {
                            form.setValue('availableDays', [...current, day])
                          }
                        }}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                  {form.formState.errors.availableDays && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.availableDays.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Office Hours *</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Input
                      type="time"
                      {...form.register('hoursStart')}
                      className="flex-1"
                    />
                    <span className="text-gray-600">to</span>
                    <Input
                      type="time"
                      {...form.register('hoursEnd')}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="maxPatients">
                    Maximum New Patients Per Month *
                  </Label>
                  <Input
                    id="maxPatients"
                    type="number"
                    {...form.register('maxPatientsPerMonth', {
                      valueAsNumber: true,
                    })}
                    className="w-32"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    We'll automatically pause ads when this limit is reached
                  </p>
                  {form.formState.errors.maxPatientsPerMonth && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.maxPatientsPerMonth.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  Review your information
                </h2>
                <p className="text-sm text-gray-600">
                  Make sure everything looks correct before launching
                </p>
              </div>

              <div className="space-y-4">
                {/* Practice Info */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium flex items-center gap-2">
                      📋 Practice Information
                    </h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(1)}
                    >
                      Edit ✏️
                    </Button>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="font-medium text-gray-900">
                      {form.watch('businessName')}
                    </p>
                    <p>{form.watch('contactName')}</p>
                    <p>{form.watch('email')}</p>
                    <p>{form.watch('phone')}</p>
                    <p>
                      {form.watch('address')}, {form.watch('city')},{' '}
                      {form.watch('state')} {form.watch('zip')}
                    </p>
                  </div>
                </div>

                {/* Services */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium flex items-center gap-2">
                      💰 Services Offered
                    </h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(2)}
                    >
                      Edit ✏️
                    </Button>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    {form.watch('services').map((service, i) => (
                      <p key={i}>
                        • {service.name} - ${service.price}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium flex items-center gap-2">
                      📅 Availability
                    </h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(3)}
                    >
                      Edit ✏️
                    </Button>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      {form.watch('availableDays').join(', ')} •{' '}
                      {form.watch('hoursStart')} - {form.watch('hoursEnd')}
                    </p>
                    <p>Up to {form.watch('maxPatientsPerMonth')} patients/month</p>
                  </div>
                </div>

                {/* Target Area */}
                <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    🎯 Your Target Area
                  </h3>
                  <p className="text-sm text-gray-700">
                    We'll target people within 15 miles of {form.watch('city')},{' '}
                    {form.watch('state')}
                  </p>
                </div>

                {/* What's Next */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">What happens next?</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      We launch your TikTok ads (within 2 hours)
                    </p>
                    <p className="flex```typescript
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      You'll get email confirmation when ads are live
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Patients start booking (typically 3-5 days)
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      You only pay $150/patient after we deliver 10+
                    </p>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-3 border rounded-lg p-4">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                    I agree to the Terms of Service and understand the no-refund
                    policy for the $500 trial payment
                  </Label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isSubmitting}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}

            {step < 4 ? (
              <Button type="button" onClick={nextStep} className="ml-auto">
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Launching...
                  </>
                ) : (
                  <>
                    🚀 Launch My Ads
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Auto-save indicator */}
          <p className="text-center text-sm text-gray-500 mt-4">
            ⚡ Your progress is automatically saved
          </p>

          {/* Security badge */}
          {step === 4 && (
            <p className="text-center text-sm text-gray-500 mt-2">
              🔒 Your information is secure and encrypted
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
```

## Step 6: Create Onboarding Complete API Route

Create file: /app/api/onboarding/complete/route.ts

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getRegionalPixel } from '@/lib/utils'
import { sendEmail } from '@/lib/email/client'
import { adminNewDentistEmail } from '@/lib/email/templates'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      dentistId,
      token,
      businessName,
      contactName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      services,
      availableDays,
      hoursStart,
      hoursEnd,
      maxPatientsPerMonth,
    } = body

    const supabase = await createClient()

    // Verify token is valid and not used
    const { data: tokenData, error: tokenError } = await supabase
      .from('onboarding_tokens')
      .select('*')
      .eq('token', token)
      .eq('dentist_id', dentistId)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (tokenError || !tokenData) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      )
    }

    // Get regional pixel for this state
    const regionalPixel = await getRegionalPixel(state)

    if (!regionalPixel) {
      return NextResponse.json(
        { error: 'Could not assign regional pixel' },
        { status: 500 }
      )
    }

    // Generate booking page slug
    const slug = businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    // Update dentist record
    const { error: updateError } = await supabase
      .from('dentists')
      .update({
        business_name: businessName,
        contact_name: contactName,
        phone: phone,
        address: address,
        city: city,
        state: state,
        zip: zip,
        tiktok_pixel_id: regionalPixel.tiktok_pixel_id,
        tiktok_region: regionalPixel.region_name,
        booking_page_slug: slug,
        max_patients_per_month: maxPatientsPerMonth,
        current_status: 'pending_ad_setup',
        updated_at: new Date().toISOString(),
      })
      .eq('id', dentistId)

    if (updateError) {
      console.error('Failed to update dentist:', updateError)
      return NextResponse.json(
        { error: 'Failed to update dentist record' },
        { status: 500 }
      )
    }

    // Insert services
    const serviceInserts = services.map((service: any) => ({
      dentist_id: dentistId,
      name: service.name,
      patient_price: service.price,
      active: true,
    }))

    const { error: servicesError } = await supabase
      .from('services')
      .insert(serviceInserts)

    if (servicesError) {
      console.error('Failed to insert services:', servicesError)
    }

    // Mark token as used
    await supabase
      .from('onboarding_tokens')
      .update({
        used: true,
        used_at: new Date().toISOString(),
      })
      .eq('token', token)

    // Log status change
    await supabase.from('campaign_status_log').insert({
      dentist_id: dentistId,
      status: 'pending_ad_setup',
      status_message: 'Onboarding completed. Awaiting ad group creation.',
      next_step: 'Admin will create ad group in TikTok',
    })

    // Send admin notification email
    const landingPageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/book?dentist_id=${dentistId}`

    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: '🚨 New Dentist Signup - Create Ad Group',
      html: adminNewDentistEmail({
        businessName,
        email,
        dentistId,
        city,
        state,
        zip,
        pixelId: regionalPixel.tiktok_pixel_id,
        pixelName: regionalPixel.region_name,
        landingPageUrl,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Onboarding complete error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## Step 7: Add Admin Email Template

Update file: /lib/email/templates.ts

Add this function:

```typescript
export function adminNewDentistEmail({
  businessName,
  email,
  dentistId,
  city,
  state,
  zip,
  pixelId,
  pixelName,
  landingPageUrl,
}: {
  businessName: string
  email: string
  dentistId: string
  city: string
  state: string
  zip: string
  pixelId: string
  pixelName: string
  landingPageUrl: string
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .section { background: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
        .info { background: white; padding: 15px; border: 1px solid #e5e7eb; border-radius: 6px; margin: 10px 0; }
        .steps { background: white; padding: 15px; border: 2px solid #3b82f6; border-radius: 6px; margin: 15px 0; }
        .step { margin: 10px 0; padding-left: 20px; }
        code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">🚨 New Dentist Signup</h1>
          <p style="margin: 5px 0 0 0;">Action required: Create ad group manually</p>
        </div>

        <div class="section">
          <h2>Dentist Information</h2>
          <div class="info">
            <p><strong>Business:</strong> ${businessName}</p>
            <p><strong>Contact:</strong> ${email}</p>
            <p><strong>Location:</strong> ${city}, ${state} ${zip}</p>
            <p><strong>Dentist ID:</strong> <code>${dentistId}</code></p>
          </div>
        </div>

        <div class="section">
          <h2>TikTok Configuration</h2>
          <div class="info">
            <p><strong>Regional Pixel:</strong> ${pixelName}</p>
            <p><strong>Pixel ID:</strong> <code>${pixelId}</code></p>
            <p><strong>Landing Page:</strong><br><code>${landingPageUrl}</code></p>
          </div>
        </div>

        <div class="steps">
          <h2>Manual Setup Steps</h2>
          <p><strong>Follow these steps in TikTok Ads Manager:</strong></p>

          <div class="step">
            <strong>1. Open Master Campaign</strong>
            <p>Go to TikTok Ads Manager → Campaigns → Open master campaign</p>
          </div>

          <div class="step">
            <strong>2. Create Ad Group</strong>
            <ul>
              <li>Click "Create Ad Group"</li>
              <li>Name: <code>${businessName} - ${city}</code></li>
              <li>Targeting: ZIP <code>${zip}</code>, 15 mile radius</li>
              <li>Age: 25-55</li>
              <li>Placement: TikTok only</li>
              <li>Pixel: <code>${pixelId}</code> (${pixelName})</li>
              <li>Budget: $70/day</li>
              <li>Optimization: Conversions</li>
              <li>Bid Strategy: Cost Cap at $60</li>
            </ul>
          </div>

          <div class="step">
            <strong>3. Create Ad</strong>
            <ul>
              <li>Video: Select master video</li>
              <li>Ad Text: <code>Book your $79 cleaning in ${city}. Limited spots.</code></li>
              <li>Display Name: <code>$79 Dental Cleaning - ${city}</code></li>
              <li>Landing Page: <code>${landingPageUrl}</code></li>
              <li>CTA: "Book Now"</li>
            </ul>
          </div>

          <div class="step">
            <strong>4. Launch Ad Group</strong>
            <p>Click "Submit" to launch the ad group</p>
          </div>

          <div class="step">
            <strong>5. Update Database</strong>
            <p>After ad group is live, update the database with:</p>
            <code style="display: block; background: #1f2937; color: #10b981; padding: 10px; border-radius: 4px; margin-top: 10px;">
              UPDATE dentists<br>
              SET tiktok_adgroup_id = 'YOUR_AD_GROUP_ID',<br>
              &nbsp;&nbsp;&nbsp;&nbsp;current_status = 'live'<br>
              WHERE id = '${dentistId}';
            </code>
          </div>
        </div>

        <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px; border: 1px solid #0ea5e9;">
          <p style="margin: 0;"><strong>⏰ Expected turnaround:</strong> Complete within 2 hours of receiving this email</p>
        </div>

        <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
          <p>DentalFlow Admin System</p>
        </div>
      </div>
    </body>
    </html>
  `
}
```

## Step 8: Update Webhook to Prevent Duplicates

Update file: /app/api/webhooks/stripe/route.ts

In the handleCheckoutCompleted function, add this check at the very beginning:

```typescript
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const supabase = await createClient()

  // Check if dentist already exists (prevent duplicates)
  const { data: existing } = await supabase
    .from('dentists')
    .select('id')
    .eq('stripe_customer_id', session.customer as string)
    .single()

  if (existing) {
    console.log('Dentist already exists, skipping creation')
    return
  }

  // Continue with existing creation logic...
  // (keep all your existing code after this check)
}
```

## Step 9: Update Success Page as Fallback

Update file: /app/(auth)/success/page.tsx

```typescript
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/client'
import { Button } from '@/components/ui/button'

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  const sessionId = searchParams.session_id

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Payment Confirmed</h1>
          <p className="text-gray-600 mb-4">
            Please check your email for the onboarding link.
          </p>
        </div>
      </div>
    )
  }

  // Verify session
  let session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Invalid Session</h1>
          <p className="text-gray-600">
            This payment session could not be found.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="text-center max-w-md bg-white p-8 rounded-lg shadow-sm border">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">🎉 Payment Confirmed!</h1>
          <p className="text-gray-600">
            Please check your email for the onboarding link if you weren't
            automatically redirected.
          </p>
        </div>

        <Button asChild className="w-full">
          <a href={`/onboarding/start?session_id=${sessionId}`}>
            Click here to continue setup
          </a>
        </Button>

        <p className="text-sm text-gray-500 mt-4">
          Having trouble?{' '}
          
            href={`mailto:${process.env.ADMIN_EMAIL}`}
            className="text-blue-600 hover:underline"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  )
}
```

## Testing Instructions

After implementing all the above:

1. **Test the complete flow:**
   - Go to landing page: http://localhost:3000
   - Click "Yes, I Want This"
   - Use test card: 4242 4242 4242 4242
   - Complete Stripe payment
   - Should redirect to /onboarding/start
   - Should see loading screen briefly
   - Should redirect to /onboarding/{token}
   - Should see Step 1 of onboarding form

2. **Test form features:**
   - Fill out Step 1, click Continue
   - Check browser DevTools → Application → Local Storage
   - Verify form data is saved
   - Refresh page - data should persist
   - Try to close tab - browser should warn
   - Complete all 4 steps
   - Submit form
   - Should redirect to dashboard (you'll need to create this next)

3. **Test email:**
   - Check your admin email inbox
   - Should receive "New Dentist Signup" email with manual instructions

4. **Verify database:**
   - Check Supabase dentists table
   - Should have complete record with all info
   - Should have tiktok_pixel_id assigned
   - Should have status = 'pending_ad_setup'
   - Check services table - should have services inserted
   - Check onboarding_tokens table - token should be marked used=true

5. **Test edge cases:**
   - Try accessing /onboarding/start without session_id - should error
   - Try accessing /onboarding/{token} with invalid token - should error
   - Try accessing already-used token - should redirect to dashboard
   - Try making payment, then immediately accessing /onboarding/start before webhook completes - should poll and wait

