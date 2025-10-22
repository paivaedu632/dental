
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Stethoscope, Check } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6

type AvailableDays = {
  M: boolean
  T: boolean
  W: boolean
  Th: boolean
  F: boolean
  Sa: boolean
  Su: boolean
}

type FormData = {
  businessName: string
  streetAddress: string
  city: string
  state: string
  zip: string
  fullName: string
  email: string
  phone: string
  offerType: 'standard' | 'custom'
  customServiceName: string
  customPrice: string
  availableDays: AvailableDays
  startTime: string
  endTime: string
  maxNewPatients: string
  prefSms: boolean
  prefEmail: boolean
  prefSameDay: boolean
  agreeTerms: boolean
}

// ============================================================================
// CONSTANTS
// ============================================================================

const TOTAL_STEPS = 7
const LAUNCH_DELAY_MS = 2000
const SUCCESS_REDIRECT_DELAY_MS = 3000

const TIMER_MESSAGES = [
  'Complete in 2 minutes',
  '60s left to launch your ads',
  '30s left to launch your ads',
  '30s left to launch your ads',
  'Final step',
  'Almost done',
  'All set',
] as const

const STEP_NAMES = [
  'business',
  'address',
  'contact',
  'services',
  'availability',
  'review',
  'success',
] as const

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
] as const

const TIME_OPTIONS = {
  start: ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
  end: ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'],
}

const DAY_LABELS = {
  M: 'Monday',
  T: 'Tuesday',
  W: 'Wednesday',
  Th: 'Thursday',
  F: 'Friday',
  Sa: 'Saturday',
  Su: 'Sunday',
} as const

const DAY_KEYS = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'] as const

const DEFAULT_AVAILABLE_DAYS: AvailableDays = {
  M: true,
  T: true,
  W: true,
  Th: true,
  F: true,
  Sa: false,
  Su: false,
}

const DEFAULT_FORM_DATA: FormData = {
  businessName: '',
  streetAddress: '',
  city: '',
  state: '',
  zip: '',
  fullName: '',
  email: '',
  phone: '',
  offerType: 'standard',
  customServiceName: '',
  customPrice: '79',
  availableDays: DEFAULT_AVAILABLE_DAYS,
  startTime: '9:00 AM',
  endTime: '5:00 PM',
  maxNewPatients: '30',
  prefSms: true,
  prefEmail: true,
  prefSameDay: false,
  agreeTerms: false,
}

// ============================================================================
// UTILITIES - FORMATTING
// ============================================================================

const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
}

const formatZip = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 5) return digits
  return `${digits.slice(0, 5)}-${digits.slice(5, 9)}`
}

const formatPrice = (value: string): string => {
  return value.replace(/[^0-9.]/g, '')
}

// ============================================================================
// UTILITIES - VALIDATION
// ============================================================================

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const isValidPhone = (phone: string): boolean => {
  return /^\(\d{3}\) \d{3}-\d{4}$/.test(phone)
}

const isValidZip = (zip: string): boolean => {
  return /^\d{5}(-\d{4})?$/.test(zip)
}

const isValidPrice = (price: string): boolean => {
  return /^\d+(\.\d{1,2})?$/.test(price) && parseFloat(price) > 0
}

const getFieldError = (field: string, value: any, formData: Partial<FormData>): string | undefined => {
  if (!value || (typeof value === 'string' && value.length === 0)) return undefined

  switch (field) {
    case 'email':
      return !isValidEmail(value) ? 'Enter a valid email address' : undefined
    case 'phone':
      return !isValidPhone(value) ? 'Format: (555) 123-4567' : undefined
    case 'zip':
      return !isValidZip(value) ? 'Enter a valid ZIP code (e.g., 78701)' : undefined
    case 'customPrice':
      return formData.offerType === 'custom' && !isValidPrice(value) ? 'Enter a valid price' : undefined
    default:
      return undefined
  }
}

// ============================================================================
// UTILITIES - BUSINESS LOGIC
// ============================================================================

const calculateProgress = (step: Step): number => {
  return Math.round(((step + 1) / TOTAL_STEPS) * 100)
}

const formatDaysForDisplay = (days: AvailableDays): string => {
  if (days.M && days.T && days.W && days.Th && days.F && !days.Sa && !days.Su) {
    return 'Monday - Friday'
  }
  
  return DAY_KEYS
    .filter((d) => days[d])
    .map((d) => DAY_LABELS[d])
    .join(', ')
}

const isStepValid = (step: Step, formData: Partial<FormData>): boolean => {
  switch (step) {
    case 0:
      return (formData.businessName?.trim().length ?? 0) > 0
    case 1:
      return (
        (formData.streetAddress?.trim().length ?? 0) > 0 &&
        (formData.city?.trim().length ?? 0) > 0 &&
        (formData.state?.trim().length ?? 0) > 0 &&
        isValidZip(formData.zip ?? '')
      )
    case 2:
      return (
        (formData.fullName?.trim().length ?? 0) > 0 &&
        isValidEmail(formData.email ?? '') &&
        isValidPhone(formData.phone ?? '')
      )
    case 3:
      return formData.offerType === 'standard' ||
        ((formData.customServiceName?.trim().length ?? 0) > 0 && isValidPrice(formData.customPrice ?? ''))
    case 4:
      const hasDaysSelected = Object.values(formData.availableDays ?? {}).some(Boolean)
      const maxPatientsNum = parseInt(formData.maxNewPatients ?? '0', 10)
      return (
        hasDaysSelected &&
        !!formData.startTime &&
        !!formData.endTime &&
        Number.isFinite(maxPatientsNum) &&
        maxPatientsNum > 0
      )
    case 5:
      return formData.agreeTerms === true
    default:
      return true
  }
}

// ============================================================================
// UTILITIES - PERSISTENCE
// ============================================================================

const STORAGE_KEY = 'dentalflow_onboarding'

const saveToLocalStorage = (data: Partial<FormData> & { step: Step }): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save progress', e)
  }
}

const loadFromLocalStorage = (): (Partial<FormData> & { step?: Step }) | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch (e) {
    console.error('Failed to load saved progress', e)
    return null
  }
}

const clearLocalStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.error('Failed to clear storage', e)
  }
}

// ============================================================================
// UTILITIES - ANALYTICS
// ============================================================================

const trackStepView = (step: Step): void => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'onboarding_step_view', {
      step_number: step,
      step_name: STEP_NAMES[step],
    })
  }
}

const trackStepComplete = (step: Step): void => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'onboarding_step_complete', {
      step_number: step,
      step_name: STEP_NAMES[step],
    })
  }
}

const trackOnboardingComplete = (): void => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'onboarding_complete')
  }
}

// ============================================================================
// COMPONENTS - ANIMATIONS
// ============================================================================

const ConfettiAnimation = () => (
  <div className="confetti-container" aria-hidden="true">
    {Array.from({ length: 60 }).map((_, i) => {
      const left = Math.random() * 100
      const delay = Math.random() * 300
      const duration = 1600 + Math.random() * 600
      const colors = ['#FF3B3B', '#FFB302', '#22C55E', '#3B82F6', '#A855F7']
      const color = colors[i % colors.length]
      const size = 6 + Math.random() * 6
      const rotate = Math.random() * 360
      return (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${left}%`,
            animationDelay: `${delay}ms`,
            animationDuration: `${duration}ms`,
            backgroundColor: color,
            width: `${size}px`,
            height: `${size * 2}px`,
            ['--rotate' as any]: `${rotate}deg`,
          }}
        />
      )
    })}
    <style jsx>{`
      .confetti-container {
        position: fixed;
        pointer-events: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 50;
      }
      .confetti-piece {
        position: absolute;
        top: -10px;
        border-radius: 2px;
        opacity: 0.9;
        animation-name: confetti-fall, confetti-sway;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }
      @keyframes confetti-fall {
        0% { transform: translateY(-10px) rotate(var(--rotate)); }
        100% { transform: translateY(100vh) rotate(calc(var(--rotate) + 720deg)); }
      }
      @keyframes confetti-sway {
        0% { margin-left: 0; }
        50% { margin-left: 12px; }
        100% { margin-left: 0; }
      }
    `}</style>
  </div>
)

// ============================================================================
// COMPONENTS - MODALS
// ============================================================================

const LeaveConfirmModal = ({
  onStay,
  onLeave,
}: {
  onStay: () => void
  onLeave: () => void
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
      <div className="text-3xl mb-2" aria-hidden="true">⚠️</div>
      <h2 className="text-xl font-semibold mb-2">Leave this page?</h2>
      <p className="text-sm text-muted-foreground">You haven't finished setting up your ads.</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Your progress is saved — you can come back anytime, but your trial won't be activated until you complete setup.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button className="w-full" onClick={onStay}>
          Stay & Finish (60s left)
        </Button>
        <Button variant="outline" className="w-full" onClick={onLeave}>
          Leave Page
        </Button>
      </div>
    </div>
  </div>
)

// ============================================================================
// COMPONENTS - FORM INPUTS
// ============================================================================

const FormInput = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  inputMode,
  pattern,
  error,
  hint,
  required = true,
  inputRef,
  onKeyDown,
  prefix,
}: {
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoComplete?: string
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'decimal'
  pattern?: string
  error?: string
  hint?: string
  required?: boolean
  inputRef?: React.RefObject<HTMLInputElement>
  onKeyDown?: (e: React.KeyboardEvent) => void
  prefix?: string
}) => (
  <div>
    {label && (
      <label htmlFor={id} className="block text-black text-sm font-bold mb-2">
        {label}
      </label>
    )}
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2e2e2e]">
          {prefix}
        </span>
      )}
      <input
        ref={inputRef}
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        pattern={pattern}
        aria-invalid={!!error}
        aria-describedby={hint ? `${id}-hint` : undefined}
        onKeyDown={onKeyDown}
        className={`w-full ${prefix ? 'pl-6' : 'pl-4'} pr-4 py-3 text-base border border-black rounded-lg focus:border-2 focus:border-black focus:outline-none transition-all duration-150 ease-in-out bg-white min-h-[44px]`}
        required={required}
      />
    </div>
    {hint && !error && (
      <p id={`${id}-hint`} className="mt-2 text-[#2e2e2e] text-sm">
        {hint}
      </p>
    )}
    {error && (
      <p className="mt-1 text-sm text-red-600">{error}</p>
    )}
  </div>
)

const FormSelect = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly string[] | string[]
  placeholder?: string
}) => (
  <div>
    <label htmlFor={id} className="block text-black text-sm font-bold mb-2">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 text-base border border-black rounded-lg focus:border-2 focus:border-black focus:outline-none transition-all duration-150 ease-in-out bg-white min-h-[44px]"
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
)

// ============================================================================
// COMPONENTS - LAYOUT
// ============================================================================

const Logo = () => (
  <div className="mb-6 flex items-center justify-start gap-2">
    <Stethoscope className="h-8 w-8 text-black" aria-hidden />
    <span className="text-black text-xl md:text-2xl font-semibold tracking-tight leading-none">
      DentalFlow
    </span>
  </div>
)

const ProgressIndicator = ({ step, progressPercent }: { step: Step; progressPercent: number }) => (
  <>
    <div className="mb-2 flex items-center justify-center">
      <div className="text-sm md:text-base font-medium text-foreground">
        {TIMER_MESSAGES[step]} <span aria-hidden="true" className="ml-1">⏱️</span>
      </div>
    </div>
    <div className="mb-8">
      <Progress value={progressPercent} className="h-2" />
    </div>
  </>
)

const ActionButtons = ({
  step,
  isStepValid,
  isSubmitting,
  onContinue,
  onBack,
}: {
  step: Step
  isStepValid: boolean
  isSubmitting: boolean
  onContinue: () => void
  onBack: () => void
}) => (
  <div className="flex flex-col gap-3 pt-2">
    <Button
      onClick={onContinue}
      disabled={!isStepValid || isSubmitting}
      size="lg"
      className="w-full rounded-full text-base"
    >
      {isSubmitting ? (
        <>
          <span className="animate-spin mr-2">⏳</span>
          Launching...
        </>
      ) : step === 5 ? (
        '🚀 Yes, Launch My Ads'
      ) : (
        'Continue'
      )}
    </Button>

    <Button
      variant="outline"
      size="lg"
      className="w-full rounded-full text-base"
      onClick={onBack}
      disabled={isSubmitting}
    >
      Back
    </Button>
  </div>
)

// ============================================================================
// STEP COMPONENTS
// ============================================================================

const Step0BusinessName = ({
  businessName,
  onChange,
  onNext,
  inputRef,
}: {
  businessName: string
  onChange: (value: string) => void
  onNext: () => void
  inputRef: React.RefObject<HTMLInputElement>
}) => {
  const hasBusinessName = businessName.trim().length > 0

  return (
    <div className="space-y-5">
      <div className="mb-6 mx-auto max-w-[526px] w-full text-center">
        <h1 className="text-foreground font-semibold text-[26px] mt-4 mb-4">
          What's Your Practice Name?
        </h1>
        <p id="business-name-hint" className="mt-2 text-sm md:text-base text-muted-foreground">
          Use your clinic or brand name.
        </p>
      </div>

      <FormInput
        id="business-name"
        label=""
        value={businessName}
        onChange={onChange}
        placeholder="e.g., Austin Dental Care"
        autoComplete="organization"
        inputRef={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && hasBusinessName) onNext()
        }}
      />

      <Button
        type="button"
        onClick={onNext}
        disabled={!hasBusinessName}
        className="w-full"
      >
        Next
      </Button>

      <p className="text-center text-sm text-[#2e2e2e]">
        Need help? support@dentalflow.com
      </p>
    </div>
  )
}

const Step1Address = ({
  streetAddress,
  city,
  state,
  zip,
  onChange,
  inputRef,
}: {
  streetAddress: string
  city: string
  state: string
  zip: string
  onChange: (field: string, value: string) => void
  inputRef: React.RefObject<HTMLInputElement>
}) => {
  return (
    <div className="space-y-5">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          What's Your Practice Address?
        </h1>
      </div>

      <FormInput
        id="street-address"
        label="Street Address"
        value={streetAddress}
        onChange={(v) => onChange('streetAddress', v)}
        autoComplete="address-line1"
        inputRef={inputRef}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <FormInput
          id="city"
          label="City"
          value={city}
          onChange={(v) => onChange('city', v)}
          autoComplete="address-level2"
        />

        <FormSelect
          id="state"
          label="State"
          value={state}
          onChange={(v) => onChange('state', v)}
          options={US_STATES}
          placeholder="Select"
        />

        <FormInput
          id="zip"
          label="Zip"
          value={zip}
          onChange={(v) => onChange('zip', formatZip(v))}
          inputMode="numeric"
          pattern="\d{5}(-\d{4})?"
          autoComplete="postal-code"
          error={getFieldError('zip', zip, {})}
        />
      </div>
    </div>
  )
}

const Step2Contact = ({
  fullName,
  email,
  phone,
  onChange,
  inputRef,
}: {
  fullName: string
  email: string
  phone: string
  onChange: (field: string, value: string) => void
  inputRef: React.RefObject<HTMLInputElement>
}) => {
  return (
    <div className="space-y-5">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          What's Your Contact Info?
        </h1>
      </div>

      <FormInput
        id="full-name"
        label="Your Name"
        value={fullName}
        onChange={(v) => onChange('fullName', v)}
        autoComplete="name"
        inputRef={inputRef}
      />

      <FormInput
        id="email"
        label="Email Address"
        type="email"
        value={email}
        onChange={(v) => onChange('email', v)}
        autoComplete="email"
        inputMode="email"
        error={getFieldError('email', email, {})}
        hint="Booking notifications will be sent here"
      />

      <FormInput
        id="phone"
        label="Phone Number"
        value={phone}
        onChange={(v) => onChange('phone', formatPhoneNumber(v))}
        inputMode="tel"
        pattern="^\(\d{3}\) \d{3}-\d{4}$"
        placeholder="(555) 123-4567"
        error={getFieldError('phone', phone, {})}
      />
    </div>
  )
}

const Step3Services = ({
  offerType,
  customServiceName,
  customPrice,
  onChange,
}: {
  offerType: 'standard' | 'custom'
  customServiceName: string
  customPrice: string
  onChange: (field: string, value: string) => void
}) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          What will you offer new patients?
        </h1>
        <p className="mt-2 text-sm md:text-base text-muted-foreground">
          Most dentists start with just the $79 cleaning offer.
        </p>
      </div>

      <div role="radiogroup" aria-label="New patient offer" className="space-y-4">
        <button
          type="button"
          role="radio"
          aria-checked={offerType === 'standard'}
          onClick={() => onChange('offerType', 'standard')}
          className={`w-full text-left rounded-xl border px-5 py-4 transition ${
            offerType === 'standard' ? 'border-primary bg-accent' : 'border-border hover:bg-accent'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="text-base md:text-lg font-semibold text-foreground">
              Cleaning + Exam - $79
            </div>
            <span aria-hidden="true" className="text-xl">
              {offerType === 'standard' ? '◉' : '○'}
            </span>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Cleaning plus comprehensive examination
          </div>
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={offerType === 'custom'}
          onClick={() => onChange('offerType', 'custom')}
          className={`w-full text-left rounded-xl border px-5 py-4 transition ${
            offerType === 'custom' ? 'border-primary bg-accent' : 'border-border hover:bg-accent'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="text-base md:text-lg font-semibold text-foreground">
              Custom offer
            </div>
            <span aria-hidden="true" className="text-xl">
              {offerType === 'custom' ? '◉' : '○'}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
            <FormInput
              id="custom-service-name"
              label="Service name"
              value={customServiceName}
              onChange={(v) => onChange('customServiceName', v)}
              placeholder="e.g., Whitening + Exam"
              required={false}
            />

            <FormInput
              id="custom-price"
              label="Price patient pays"
              value={customPrice}
              onChange={(v) => onChange('customPrice', formatPrice(v))}
              placeholder="79"
              inputMode="decimal"
              pattern="^\d+(\.\d{1,2})?$"
              prefix="$"
              required={false}
            />
          </div>
        </button>
      </div>
    </div>
  )
}

const Step4Availability = ({
  availableDays,
  startTime,
  endTime,
  maxNewPatients,
  prefSms,
  prefEmail,
  prefSameDay,
  onChange,
  onToggleDay,
  onTogglePref,
}: {
  availableDays: AvailableDays
  startTime: string
  endTime: string
  maxNewPatients: string
  prefSms: boolean
  prefEmail: boolean
  prefSameDay: boolean
  onChange: (field: string, value: string) => void
  onToggleDay: (day: keyof AvailableDays) => void
  onTogglePref: (pref: 'prefSms' | 'prefEmail' | 'prefSameDay') => void
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          When can you see new patients?
        </h1>
      </div>

      <div>
        <label className="block text-black text-sm font-bold mb-2">Available Days</label>
        <div className="flex flex-wrap gap-2">
          {DAY_KEYS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onToggleDay(d)}
              className={`px-4 py-2 rounded-full border transition ${
                availableDays[d]
                  ? 'border-black bg-black text-white'
                  : 'border-black bg-white'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-black text-sm font-bold mb-2">Office Hours</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormSelect
            id="start-time"
            label="From"
            value={startTime}
            onChange={(v) => onChange('startTime', v)}
            options={TIME_OPTIONS.start}
          />

          <FormSelect
            id="end-time"
            label="To"
            value={endTime}
            onChange={(v) => onChange('endTime', v)}
            options={TIME_OPTIONS.end}
          />
        </div>
      </div>

      <FormInput
        id="max-new-patients"
        label="Maximum New Patients Per Month"
        type="number"
        value={maxNewPatients}
        onChange={(v) => onChange('maxNewPatients', v)}
        placeholder="30"
        hint="We'll automatically pause ads when this limit is reached"
      />

      <div>
        <label className="block text-black text-sm font-bold mb-2">
          Patient Booking Preferences
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              className="accent-black"
              type="checkbox"
              checked={prefSms}
              onChange={() => onTogglePref('prefSms')}
            />
            <span>Send me SMS when patients book</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              className="accent-black"
              type="checkbox"
              checked={prefEmail}
              onChange={() => onTogglePref('prefEmail')}
            />
            <span>Send me email summaries (daily)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              className="accent-black"
              type="checkbox"
              checked={prefSameDay}
              onChange={() => onTogglePref('prefSameDay')}
            />
            <span>Allow same-day bookings</span>
          </label>
        </div>
      </div>
    </div>
  )
}

const ReviewCard = ({
  title,
  emoji,
  onEdit,
  children,
  highlighted = false,
}: {
  title: string
  emoji: string
  onEdit: () => void
  children: React.ReactNode
  highlighted?: boolean
}) => (
  <div className={`rounded-lg border p-4 ${highlighted ? 'border-2 border-green-500 bg-green-50' : 'border-border bg-accent/50'}`}>
    <div className="flex items-center justify-between mb-3">
      <h2 className={`text-base font-semibold ${highlighted ? 'text-green-900' : ''}`}>
        {emoji} {title}
      </h2>
      {!highlighted && (
        <button
          type="button"
          className="text-sm text-primary underline"
          onClick={onEdit}
        >
          Edit
        </button>
      )}
    </div>
    <div className={highlighted ? 'text-green-900' : ''}>
      {children}
    </div>
  </div>
)

const Step5Review = ({
  formData,
  onEdit,
  onToggleTerms,
}: {
  formData: Partial<FormData>
  onEdit: (step: Step) => void
  onToggleTerms: () => void
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          Confirm your details
        </h1>
      </div>

      {/* Practice Card */}
      <ReviewCard
        title="Practice Information"
        emoji="📋"
        onEdit={() => onEdit(0)}
      >
        <dl className="space-y-2 text-sm">
          <div className="grid grid-cols-[100px_1fr] gap-2">
            <dt className="text-muted-foreground">Business:</dt>
            <dd className="font-medium">{formData.businessName || '—'}</dd>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-2">
            <dt className="text-muted-foreground">Contact:</dt>
            <dd>{formData.fullName || '—'}</dd>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-2">
            <dt className="text-muted-foreground">Email:</dt>
            <dd>{formData.email || '—'}</dd>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-2">
            <dt className="text-muted-foreground">Phone:</dt>
            <dd>{formData.phone || '—'}</dd>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-2">
            <dt className="text-muted-foreground">Address:</dt>
            <dd>
              {[
                formData.streetAddress,
                formData.city && formData.state ? `${formData.city}, ${formData.state}` : '',
                formData.zip,
              ]
                .filter(Boolean)
                .join(', ') || '—'}
            </dd>
          </div>
        </dl>
      </ReviewCard>

      {/* Services Card */}
      <ReviewCard
        title="Service Offered"
        emoji="💰"
        onEdit={() => onEdit(3)}
      >
        <p className="text-sm">
          {formData.offerType === 'standard'
            ? 'Cleaning + Exam - $79'
            : `${formData.customServiceName || 'Custom offer'} - $${Number(formData.customPrice || '79').toString()}`}
        </p>
      </ReviewCard>

      {/* Availability Card */}
      <ReviewCard
        title="Availability"
        emoji="📅"
        onEdit={() => onEdit(4)}
      >
        <dl className="space-y-2 text-sm">
          <div className="grid grid-cols-[100px_1fr] gap-2">
            <dt className="text-muted-foreground">Days:</dt>
            <dd>{formData.availableDays ? formatDaysForDisplay(formData.availableDays) : '—'}</dd>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-2">
            <dt className="text-muted-foreground">Hours:</dt>
            <dd>{formData.startTime} - {formData.endTime}</dd>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-2">
            <dt className="text-muted-foreground">Capacity:</dt>
            <dd>{formData.maxNewPatients}/month</dd>
          </div>
        </dl>
      </ReviewCard>

      {/* Target Area Card */}
      <ReviewCard
        title="Your Target Area"
        emoji="🎯"
        onEdit={() => onEdit(1)}
      >
        <p className="text-sm text-muted-foreground">
          We'll show your ads to people within 15 miles of{' '}
          {formData.city && formData.state ? `${formData.city}, ${formData.state}` : 'your city'}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Estimated reach: ~250,000 potential patients
        </p>
      </ReviewCard>

      {/* What's Next Card */}
      <ReviewCard
        title="What happens next?"
        emoji="✅"
        onEdit={() => {}}
      >
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
            <span>We launch your TikTok ads (within 2 hours)</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
            <span>Email confirmation when ads go live</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
            <span>First bookings (typically 3-5 days)</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-black mt-0.5 flex-shrink-0" />
            <span>You pay $150/patient only after we deliver 10+</span>
          </li>
        </ul>
      </ReviewCard>

      {/* Terms Checkbox */}
      <label className="flex items-start gap-3 text-sm cursor-pointer">
        <input
          className="mt-1 accent-black cursor-pointer"
          type="checkbox"
          checked={formData.agreeTerms}
          onChange={onToggleTerms}
        />
        <span>
          I agree to the{' '}
          <a href="/terms" className="underline text-primary" target="_blank" rel="noopener">
            Terms of Service
          </a>{' '}
          and understand the no-refund policy for the $500 trial payment
        </span>
      </label>
    </div>
  )
}

const Step6Success = ({ onGoToDashboard }: { onGoToDashboard: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onGoToDashboard()
    }, SUCCESS_REDIRECT_DELAY_MS)

    return () => clearTimeout(timer)
  }, [onGoToDashboard])

  return (
    <div className="text-center mb-8">
      <ConfettiAnimation />

      <div className="text-4xl mb-4" aria-hidden="true">
        🎉
      </div>
      <h1 className="text-foreground font-semibold text-[26px] mt-4 mb-4">
        Your ads are launching!
      </h1>
      <p className="mt-2 text-sm md:text-base text-muted-foreground">
        We'll email you when they go live.
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        Redirecting to dashboard in {SUCCESS_REDIRECT_DELAY_MS / 1000} seconds...
      </p>
      <Button className="mt-6 w-full" onClick={onGoToDashboard}>
        Go to dashboard
      </Button>
    </div>
  )
}

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

const useFormPersistence = (step: Step, formData: Partial<FormData>) => {
  useEffect(() => {
    if (step < 6) {
      saveToLocalStorage({ ...formData, step })
    } else {
      clearLocalStorage()
    }
  }, [step, formData])
}

const useNavigationGuard = (
  step: Step,
  isLeavingConfirmed: boolean,
  setShowLeaveConfirm: (show: boolean) => void
) => {
  const hasPushedGuardRef = useRef(false)

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isLeavingConfirmed && step > 0 && step < 6) {
        e.preventDefault()
        e.returnValue = ''
        return ''
      }
    }

    const onPopState = () => {
      if (isLeavingConfirmed) return
      if (step > 0 && step < 6) {
        setShowLeaveConfirm(true)
        history.pushState({ guard: 'onboarding' }, '', window.location.href)
      }
    }

    if (!isLeavingConfirmed && step > 0 && step < 6 && !hasPushedGuardRef.current) {
      history.pushState({ guard: 'onboarding' }, '', window.location.href)
      hasPushedGuardRef.current = true
    }

    if (!isLeavingConfirmed && step > 0 && step < 6) {
      window.addEventListener('beforeunload', onBeforeUnload)
      window.addEventListener('popstate', onPopState)
    }

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      window.removeEventListener('popstate', onPopState)
    }
  }, [step, isLeavingConfirmed, setShowLeaveConfirm])
}

const useKeyboardShortcuts = (
  step: Step,
  isStepValid: boolean,
  onContinue: () => void,
  onBack: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && isStepValid) {
        onContinue()
      }

      if (e.key === 'Escape' && step > 0 && step < 6) {
        onBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [step, isStepValid, onContinue, onBack])
}

const useAnalytics = (step: Step) => {
  useEffect(() => {
    trackStepView(step)
  }, [step])
}

const useAutofocus = (step: Step, refs: { [key: number]: React.RefObject<HTMLInputElement> }) => {
  useEffect(() => {
    const ref = refs[step]
    if (ref?.current) {
      ref.current.focus()
    }
  }, [step, refs])
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function OnboardingV2() {
  const router = useRouter()

  // State - UI
  const [step, setStep] = useState<Step>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)
  const [isLeavingConfirmed, setIsLeavingConfirmed] = useState(false)

  // State - Form data
  const [businessName, setBusinessName] = useState(DEFAULT_FORM_DATA.businessName)
  const [streetAddress, setStreetAddress] = useState(DEFAULT_FORM_DATA.streetAddress)
  const [city, setCity] = useState(DEFAULT_FORM_DATA.city)
  const [addressState, setAddressState] = useState(DEFAULT_FORM_DATA.state)
  const [zip, setZip] = useState(DEFAULT_FORM_DATA.zip)
  const [fullName, setFullName] = useState(DEFAULT_FORM_DATA.fullName)
  const [email, setEmail] = useState(DEFAULT_FORM_DATA.email)
  const [phone, setPhone] = useState(DEFAULT_FORM_DATA.phone)
  const [offerType, setOfferType] = useState<'standard' | 'custom'>(DEFAULT_FORM_DATA.offerType)
  const [customServiceName, setCustomServiceName] = useState(DEFAULT_FORM_DATA.customServiceName)
  const [customPrice, setCustomPrice] = useState(DEFAULT_FORM_DATA.customPrice)
  const [availableDays, setAvailableDays] = useState<AvailableDays>(DEFAULT_FORM_DATA.availableDays)
  const [startTime, setStartTime] = useState(DEFAULT_FORM_DATA.startTime)
  const [endTime, setEndTime] = useState(DEFAULT_FORM_DATA.endTime)
  const [maxNewPatients, setMaxNewPatients] = useState(DEFAULT_FORM_DATA.maxNewPatients)
  const [prefSms, setPrefSms] = useState(DEFAULT_FORM_DATA.prefSms)
  const [prefEmail, setPrefEmail] = useState(DEFAULT_FORM_DATA.prefEmail)
  const [prefSameDay, setPrefSameDay] = useState(DEFAULT_FORM_DATA.prefSameDay)
  const [agreeTerms, setAgreeTerms] = useState(DEFAULT_FORM_DATA.agreeTerms)

  // Refs for autofocus
  const businessNameRef = useRef<HTMLInputElement>(null)
  const streetAddressRef = useRef<HTMLInputElement>(null)
  const fullNameRef = useRef<HTMLInputElement>(null)

  // Derived state
  const formData: Partial<FormData> = {
    businessName,
    streetAddress,
    city,
    state: addressState,
    zip,
    fullName,
    email,
    phone,
    offerType,
    customServiceName,
    customPrice,
    availableDays,
    startTime,
    endTime,
    maxNewPatients,
    prefSms,
    prefEmail,
    prefSameDay,
    agreeTerms,
  }

  const currentStepValid = isStepValid(step, formData)
  const progressPercent = calculateProgress(step)

  // Load saved progress on mount
  useEffect(() => {
    const saved = loadFromLocalStorage()
    if (saved) {
      setBusinessName(saved.businessName || DEFAULT_FORM_DATA.businessName)
      setStreetAddress(saved.streetAddress || DEFAULT_FORM_DATA.streetAddress)
      setCity(saved.city || DEFAULT_FORM_DATA.city)
      setAddressState(saved.state || DEFAULT_FORM_DATA.state)
      setZip(saved.zip || DEFAULT_FORM_DATA.zip)
      setFullName(saved.fullName || DEFAULT_FORM_DATA.fullName)
      setEmail(saved.email || DEFAULT_FORM_DATA.email)
      setPhone(saved.phone || DEFAULT_FORM_DATA.phone)
      setOfferType(saved.offerType || DEFAULT_FORM_DATA.offerType)
      setCustomServiceName(saved.customServiceName || DEFAULT_FORM_DATA.customServiceName)
      setCustomPrice(saved.customPrice || DEFAULT_FORM_DATA.customPrice)
      setAvailableDays(saved.availableDays || DEFAULT_FORM_DATA.availableDays)
      setStartTime(saved.startTime || DEFAULT_FORM_DATA.startTime)
      setEndTime(saved.endTime || DEFAULT_FORM_DATA.endTime)
      setMaxNewPatients(saved.maxNewPatients || DEFAULT_FORM_DATA.maxNewPatients)
      setPrefSms(saved.prefSms ?? DEFAULT_FORM_DATA.prefSms)
      setPrefEmail(saved.prefEmail ?? DEFAULT_FORM_DATA.prefEmail)
      setPrefSameDay(saved.prefSameDay ?? DEFAULT_FORM_DATA.prefSameDay)
      setAgreeTerms(saved.agreeTerms ?? DEFAULT_FORM_DATA.agreeTerms)
      if (saved.step !== undefined && saved.step < 6) {
        setStep(saved.step)
      }
    }
  }, [])

  // Custom hooks
  useFormPersistence(step, formData)
  useNavigationGuard(step, isLeavingConfirmed, setShowLeaveConfirm)
  useAnalytics(step)
  useAutofocus(step, {
    0: businessNameRef,
    1: streetAddressRef,
    2: fullNameRef,
  })

  // Navigation handlers
  const next = () => {
    if (step < 6) {
      trackStepComplete(step)
      setStep((s) => ((s + 1) as Step))
    }
  }

  const back = () => {
    if (step > 0) {
      setStep((s) => ((s - 1) as Step))
    }
  }

  const goToStep = (targetStep: Step) => {
    setStep(targetStep)
  }

  // Form field handlers
  const updateField = (field: string, value: string) => {
    const setters: { [key: string]: (value: any) => void } = {
      businessName: setBusinessName,
      streetAddress: setStreetAddress,
      city: setCity,
      state: setAddressState,
      zip: setZip,
      fullName: setFullName,
      email: setEmail,
      phone: setPhone,
      offerType: setOfferType,
      customServiceName: setCustomServiceName,
      customPrice: setCustomPrice,
      startTime: setStartTime,
      endTime: setEndTime,
      maxNewPatients: setMaxNewPatients,
    }

    const setter = setters[field]
    if (setter) {
      setter(value)
    }
  }

  const toggleDay = (day: keyof AvailableDays) => {
    setAvailableDays((prev) => ({ ...prev, [day]: !prev[day] }))
  }

  const togglePref = (pref: 'prefSms' | 'prefEmail' | 'prefSameDay') => {
    const toggles = {
      prefSms: setPrefSms,
      prefEmail: setPrefEmail,
      prefSameDay: setPrefSameDay,
    }
    toggles[pref]((v) => !v)
  }

  const toggleTerms = () => {
    setAgreeTerms((v) => !v)
  }

  // Submit handler
  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call for now
    setTimeout(() => {
      trackOnboardingComplete()
      next() // Go to step 6 (success)
      setIsSubmitting(false)
    }, LAUNCH_DELAY_MS)

    // TODO: Replace with actual API call
    // try {
    //   const response = await fetch('/api/onboarding/complete', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   })
    //   if (response.ok) {
    //     trackOnboardingComplete()
    //     next()
    //   } else {
    //     throw new Error('Submission failed')
    //   }
    // } catch (error) {
    //   alert('Something went wrong. Please try again.')
    //   setIsSubmitting(false)
    // }
  }

  // Continue handler
  const handleContinue = () => {
    if (step === 5) {
      handleSubmit()
    } else if (currentStepValid) {
      next()
    }
  }

  // Leave confirmation handlers
  const handleStay = () => {
    setShowLeaveConfirm(false)
    history.pushState({ guard: 'onboarding' }, '', window.location.href)
  }

  const handleLeave = () => {
    setIsLeavingConfirmed(true)
    setTimeout(() => window.history.go(-2), 10)
  }

  const handleGoToDashboard = () => {
    router.push('/dashboard')
  }

  // Keyboard shortcuts
  useKeyboardShortcuts(step, currentStepValid, handleContinue, back)

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[526px] mx-auto">
        <Logo />
        <ProgressIndicator step={step} progressPercent={progressPercent} />

        <div className="space-y-6">
          {step === 0 && (
            <Step0BusinessName
              businessName={businessName}
              onChange={setBusinessName}
              onNext={next}
              inputRef={businessNameRef}
            />
          )}

          {step === 1 && (
            <Step1Address
              streetAddress={streetAddress}
              city={city}
              state={addressState}
              zip={zip}
              onChange={updateField}
              inputRef={streetAddressRef}
            />
          )}

          {step === 2 && (
            <Step2Contact
              fullName={fullName}
              email={email}
              phone={phone}
              onChange={updateField}
              inputRef={fullNameRef}
            />
          )}

          {step === 3 && (
            <Step3Services
              offerType={offerType}
              customServiceName={customServiceName}
              customPrice={customPrice}
              onChange={updateField}
            />
          )}

          {step === 4 && (
            <Step4Availability
              availableDays={availableDays}
              startTime={startTime}
              endTime={endTime}
              maxNewPatients={maxNewPatients}
              prefSms={prefSms}
              prefEmail={prefEmail}
              prefSameDay={prefSameDay}
              onChange={updateField}
              onToggleDay={toggleDay}
              onTogglePref={togglePref}
            />
          )}

          {step === 5 && (
            <Step5Review
              formData={formData}
              onEdit={goToStep}
              onToggleTerms={toggleTerms}
            />
          )}

          {step === 6 && (
            <Step6Success onGoToDashboard={handleGoToDashboard} />
          )}

          {step > 0 && step < 6 && (
            <ActionButtons
              step={step}
              isStepValid={currentStepValid}
              isSubmitting={isSubmitting}
              onContinue={handleContinue}
              onBack={back}
            />
          )}
        </div>
      </div>

      {showLeaveConfirm && step < 6 && (
        <LeaveConfirmModal onStay={handleStay} onLeave={handleLeave} />
      )}
    </main>
  )
}