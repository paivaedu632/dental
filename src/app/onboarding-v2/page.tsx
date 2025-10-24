'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Stethoscope, Check, Camera, Upload, X } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

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
  photoFile: File | null
  photoPreview: string | null
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

const TOTAL_STEPS = 8
const LAUNCH_DELAY_MS = 2000

const TIMER_MESSAGES = [
  'Complete in 2 minutes',
  '60s left to launch your ads',
  '45s left to launch your ads',
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
  'photo',
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
  customPrice: '97',
  photoFile: null,
  photoPreview: null,
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
      return formData.photoFile !== null
    case 5:
      const hasDaysSelected = Object.values(formData.availableDays ?? {}).some(Boolean)
      const maxPatientsNum = parseInt(formData.maxNewPatients ?? '0', 10)
      return (
        hasDaysSelected &&
        !!formData.startTime &&
        !!formData.endTime &&
        Number.isFinite(maxPatientsNum) &&
        maxPatientsNum > 0
      )
    case 6:
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
    const { photoFile, ...saveableData } = data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveableData))
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
    console.error('Failed to clear saved progress', e)
  }
}

// ============================================================================
// ANALYTICS
// ============================================================================

const trackStepView = (step: Step) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'onboarding_step_view', {
      step: step,
      step_name: STEP_NAMES[step],
    })
  }
}

const trackStepComplete = (step: Step) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'onboarding_step_complete', {
      step: step,
      step_name: STEP_NAMES[step],
    })
  }
}

const trackOnboardingComplete = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'onboarding_complete', {
      value: 500,
    })
  }
}

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

const useFormPersistence = (step: Step, formData: Partial<FormData>) => {
  useEffect(() => {
    if (step < 7) {
      saveToLocalStorage({ ...formData, step })
    }
  }, [step, formData])
}

const useNavigationGuard = (
  step: Step,
  isLeavingConfirmed: boolean,
  setShowLeaveConfirm: (value: boolean) => void
) => {
  useEffect(() => {
    if (step >= 7 || isLeavingConfirmed) return

    const handlePopState = (e: PopStateEvent) => {
      if (!isLeavingConfirmed) {
        e.preventDefault()
        setShowLeaveConfirm(true)
        history.pushState({ guard: 'onboarding' }, '', window.location.href)
      }
    }

    history.pushState({ guard: 'onboarding' }, '', window.location.href)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [step, isLeavingConfirmed, setShowLeaveConfirm])
}

const useAnalytics = (step: Step) => {
  useEffect(() => {
    trackStepView(step)
  }, [step])
}

const useKeyboardShortcuts = (
  step: Step,
  isStepValid: boolean,
  onContinue: () => void,
  onBack: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isStepValid && step !== 6) {
        e.preventDefault()
        onContinue()
      }
      if (e.key === 'Escape' && step > 0 && step < 7) {
        e.preventDefault()
        onBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [step, isStepValid, onContinue, onBack])
}

// ============================================================================
// SUB-COMPONENTS
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

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  autoFocus = false,
  maxLength,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  error?: string
  autoFocus?: boolean
  maxLength?: number
}) => (
  <div className="space-y-2">
    <label className="block text-black text-sm font-bold mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      maxLength={maxLength}
      className={`w-full rounded-lg border border-gray-600 px-4 py-3 text-base focus:outline-none focus:border-2 focus:border-gray-900 focus:ring-2 ${
        error
          ? 'border-red-300 focus:border-2 focus:border-red-500 focus:ring-red-200'
          : 'focus:ring-gray-200'
      }`}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
)

const CurrencyInputField = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  autoFocus = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  autoFocus?: boolean
}) => (
  <div className="space-y-2">
    <label className="block text-black text-sm font-bold mb-2">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full rounded-lg border border-gray-600 pl-8 pr-4 py-3 text-base focus:outline-none focus:border-2 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 ${
          error
            ? 'border-red-300 focus:border-2 focus:border-red-500 focus:ring-red-200'
            : ''
        }`}
      />
    </div>
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
)

const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly string[]
  placeholder?: string
}) => (
  <div className="space-y-2">
    <label className="block text-black text-sm font-bold mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-600 px-4 py-3 text-base focus:border-2 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
)

const RadioCard = ({
  value,
  currentValue,
  onChange,
  label,
  description,
}: {
  value: string
  currentValue: string
  onChange: (value: string) => void
  label: string
  description?: string
}) => {
  const isSelected = currentValue === value
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
        isSelected
          ? 'border-gray-900 bg-gray-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
            isSelected ? 'border-gray-900 bg-gray-900' : 'border-gray-300 bg-white'
          }`}
        >
          {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
        </div>
        <div>
          <div className="font-medium text-gray-900">{label}</div>
          {description && <div className="mt-1 text-sm text-gray-600">{description}</div>}
        </div>
      </div>
    </button>
  )
}

const CheckboxField = ({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean
  onChange: () => void
  label: string
  description?: string
}) => (
  <button
    type="button"
    onClick={onChange}
    className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
      checked
        ? 'border-gray-900 bg-gray-50'
        : 'border-gray-200 bg-white hover:bg-gray-50'
    }`}
  >
    <div
      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
        checked ? 'border-gray-900 bg-gray-900' : 'border-gray-300 bg-white'
      }`}
    >
      {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
    </div>
    <div>
      <div className="font-medium text-gray-900">{label}</div>
      {description && <div className="mt-1 text-sm text-gray-600">{description}</div>}
    </div>
  </button>
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
}) => {
  const getButtonText = () => {
    if (step === 6) return isSubmitting ? 'Launching...' : '🚀 Yes, Launch My Ads'
    if (step === 0) return 'Continue'
    return 'Continue'
  }

  return (
    <div className="flex gap-3">
      {step > 0 && step < 7 && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="h-12 flex-1"
        >
          Back
        </Button>
      )}
      <Button
        type="button"
        onClick={onContinue}
        disabled={!isStepValid || isSubmitting}
        className="h-12 flex-1 bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-300"
      >
        {getButtonText()}
      </Button>
    </div>
  )
}

const LeaveConfirmModal = ({ onStay, onLeave }: { onStay: () => void; onLeave: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      <h3 className="mb-2 text-xl font-bold text-gray-900">You're almost done!</h3>
      <p className="mb-6 text-gray-600">
        Your progress is saved. Are you sure you want to leave now?
      </p>
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onLeave}
          className="h-12 flex-1"
        >
          Leave
        </Button>
        <Button
          type="button"
          onClick={onStay}
          className="h-12 flex-1 bg-gray-900 text-white hover:bg-gray-800"
        >
          Stay & Complete
        </Button>
      </div>
    </div>
  </div>
)

// ============================================================================
// STEP COMPONENTS
// ============================================================================

const Step0BusinessName = ({
  businessName,
  onChange,
  onNext,
}: {
  businessName: string
  onChange: (value: string) => void
  onNext: () => void
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && businessName.trim().length > 0) {
      onNext()
    }
  }

  return (
    <div className="space-y-6 rounded-xl bg-white p-8 shadow-sm">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">What's your practice name?</h2>
        <p className="text-gray-600">We'll use this in your patient booking page</p>
      </div>
      <InputField
        label="Practice Name"
        value={businessName}
        onChange={onChange}
        placeholder="e.g., Austin Family Dental"
        autoFocus
        maxLength={100}
      />
      <div className="pt-2">
        <Button
          type="button"
          onClick={onNext}
          disabled={businessName.trim().length === 0}
          className="h-12 w-full bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-300"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

const Step1Address = ({
  streetAddress,
  city,
  state,
  zip,
  onChange,
}: {
  streetAddress: string
  city: string
  state: string
  zip: string
  onChange: (field: string, value: string) => void
}) => {
  const handleZipChange = (value: string) => {
    onChange('zip', formatZip(value))
  }

  return (
    <div className="space-y-6 rounded-xl bg-white p-8 shadow-sm">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Where's your practice located?</h2>
        <p className="text-gray-600">We'll target patients near your location</p>
      </div>
      <div className="space-y-4">
        <InputField
          label="Street Address"
          value={streetAddress}
          onChange={(v) => onChange('streetAddress', v)}
          placeholder="123 Main Street"
          autoFocus
        />
        <InputField
          label="City"
          value={city}
          onChange={(v) => onChange('city', v)}
          placeholder="Austin"
        />
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="State"
            value={state}
            onChange={(v) => onChange('state', v)}
            options={US_STATES}
            placeholder="Select state"
          />
          <InputField
            label="ZIP Code"
            value={zip}
            onChange={handleZipChange}
            placeholder="78701"
            error={getFieldError('zip', zip, { zip })}
            maxLength={10}
          />
        </div>
      </div>
    </div>
  )
}

const Step2Contact = ({
  fullName,
  email,
  phone,
  onChange,
}: {
  fullName: string
  email: string
  phone: string
  onChange: (field: string, value: string) => void
}) => {
  const handlePhoneChange = (value: string) => {
    onChange('phone', formatPhoneNumber(value))
  }

  return (
    <div className="space-y-6 rounded-xl bg-white p-8 shadow-sm">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">How can patients reach you?</h2>
        <p className="text-gray-600">This info appears on your booking page</p>
      </div>
      <div className="space-y-4">
        <InputField
          label="Your Full Name"
          value={fullName}
          onChange={(v) => onChange('fullName', v)}
          placeholder="Dr. Sarah Johnson"
          autoFocus
        />
        <InputField
          label="Email Address"
          value={email}
          onChange={(v) => onChange('email', v)}
          placeholder="you@example.com"
          type="email"
          error={getFieldError('email', email, { email })}
        />
        <InputField
          label="Phone Number"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="(555) 123-4567"
          type="tel"
          error={getFieldError('phone', phone, { phone })}
          maxLength={14}
        />
      </div>
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
  const handlePriceChange = (value: string) => {
    onChange('customPrice', formatPrice(value))
  }

  return (
    <div className="space-y-6 rounded-xl bg-white p-8 shadow-sm">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">What service will you offer?</h2>
        <p className="text-gray-600">
          Most dentists start with the <span className="font-semibold">$97 cleaning offer</span>
        </p>
      </div>
      <div className="space-y-3">
        <RadioCard
          value="standard"
          currentValue={offerType}
          onChange={(v) => onChange('offerType', v)}
          label="Standard Cleaning & Exam"
          description="Patients pay $97, you earn ~$400-600 in lifetime value"
        />
        <RadioCard
          value="custom"
          currentValue={offerType}
          onChange={(v) => onChange('offerType', v)}
          label="Custom Service"
          description="Offer a different service at your preferred price"
        />
      </div>
      {offerType === 'custom' && (
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <InputField
            label="Service Name"
            value={customServiceName}
            onChange={(v) => onChange('customServiceName', v)}
            placeholder="e.g., Teeth Whitening"
            autoFocus
          />
          <CurrencyInputField
            label="Patient Price"
            value={customPrice}
            onChange={handlePriceChange}
            placeholder="97"
            error={getFieldError('customPrice', customPrice, { offerType, customPrice })}
          />
        </div>
      )}
    </div>
  )
}

const Step4Photo = ({
  photoFile,
  photoPreview,
  onPhotoSelect,
  onPhotoRemove,
}: {
  photoFile: File | null
  photoPreview: string | null
  onPhotoSelect: (file: File) => void
  onPhotoRemove: () => void
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onPhotoSelect(file)
    } else {
      alert('Please select an image file (JPG, PNG, etc.)')
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  return (
    <div className="space-y-6 rounded-xl bg-white p-8 shadow-sm">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Upload your photo</h2>
        <p className="text-gray-600">
          Patients are <span className="font-semibold">3x more likely to book</span> when they see your friendly face
        </p>
      </div>

      {!photoPreview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all ${
            isDragging
              ? 'border-gray-900 bg-gray-50'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-gray-200 p-4">
                <Camera className="h-8 w-8 text-gray-900" />
              </div>
            </div>
            
            <div>
              <p className="mb-2 text-lg font-medium text-gray-900">
                {isDragging ? 'Drop your photo here' : 'Take or upload a photo'}
              </p>
              <p className="text-sm text-gray-500">
                A professional headshot or friendly selfie works best
              </p>
            </div>

            <div className="space-y-2">
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="h-12 w-full bg-gray-900 text-white hover:bg-gray-800"
              >
                <Upload className="mr-2 h-5 w-5" />
                Choose Photo
              </Button>
              <p className="text-xs text-gray-400">JPG, PNG, or HEIC • Max 10MB</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-100">
            <img
              src={photoPreview}
              alt="Your photo"
              className="h-64 w-full object-cover"
            />
            <button
              type="button"
              onClick={onPhotoRemove}
              className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-lg transition-transform hover:scale-110"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>
          
          <div className="rounded-lg border-2 border-gray-900 bg-gray-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900">
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Great photo!</p>
                <p className="mt-1 text-sm text-gray-700">
                  This will appear on your patient booking page to build trust
                </p>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="h-12 w-full"
          >
            <Upload className="mr-2 h-5 w-5" />
            Choose Different Photo
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      )}

      <div className="rounded-lg border border-gray-300 bg-gray-50 p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Pro tip:</span> Smile naturally and make sure your face is well-lit. 
          Patients respond best to warm, approachable photos.
        </p>
      </div>
    </div>
  )
}

const Step5Availability = ({
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
}) => (
  <div className="space-y-6 rounded-xl bg-white p-8 shadow-sm">
    <div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">When can you see new patients?</h2>
      <p className="text-gray-600">We'll only book appointments during these times</p>
    </div>
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-black text-sm font-bold">Available Days</label>
        <div className="grid grid-cols-7 gap-2">
          {DAY_KEYS.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => onToggleDay(day)}
              className={`rounded-lg border-2 px-2 py-3 text-center text-xs font-medium transition-all ${
                availableDays[day]
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Start Time"
          value={startTime}
          onChange={(v) => onChange('startTime', v)}
          options={TIME_OPTIONS.start}
        />
        <SelectField
          label="End Time"
          value={endTime}
          onChange={(v) => onChange('endTime', v)}
          options={TIME_OPTIONS.end}
        />
      </div>
      <InputField
        label="Max New Patients Per Month"
        value={maxNewPatients}
        onChange={(v) => onChange('maxNewPatients', v.replace(/\D/g, ''))}
        placeholder="30"
        type="number"
      />
      <div>
        <label className="mb-2 block text-black text-sm font-bold">
          Notification Preferences
        </label>
        <div className="space-y-2">
          <CheckboxField
            checked={prefSms}
            onChange={() => onTogglePref('prefSms')}
            label="SMS notifications"
            description="Get text alerts for new bookings"
          />
          <CheckboxField
            checked={prefEmail}
            onChange={() => onTogglePref('prefEmail')}
            label="Email notifications"
            description="Receive booking confirmations via email"
          />
          <CheckboxField
            checked={prefSameDay}
            onChange={() => onTogglePref('prefSameDay')}
            label="Allow same-day bookings"
            description="Let patients book appointments for today"
          />
        </div>
      </div>
    </div>
  </div>
)

const Step6Review = ({
  formData,
  onEdit,
  onToggleTerms,
}: {
  formData: Partial<FormData>
  onEdit: (step: Step) => void
  onToggleTerms: () => void
}) => {
  const serviceName = formData.offerType === 'standard' 
    ? 'Standard Cleaning & Exam' 
    : formData.customServiceName
  const servicePrice = formData.offerType === 'standard' 
    ? '$97' 
    : `$${formData.customPrice}`

  return (
    <div className="space-y-6 rounded-xl bg-white p-8 shadow-sm">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Review your information</h2>
        <p className="text-gray-600">Make sure everything looks good before launching</p>
      </div>

      <div className="space-y-4">
        <ReviewSection title="Practice Info" onEdit={() => onEdit(0)}>
          <ReviewItem label="Practice Name" value={formData.businessName} />
          <ReviewItem
            label="Address"
            value={`${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zip}`}
          />
        </ReviewSection>

        <ReviewSection title="Contact" onEdit={() => onEdit(2)}>
          <ReviewItem label="Name" value={formData.fullName} />
          <ReviewItem label="Email" value={formData.email} />
          <ReviewItem label="Phone" value={formData.phone} />
        </ReviewSection>

        <ReviewSection title="Service Offered" onEdit={() => onEdit(3)}>
          <ReviewItem label="Service" value={serviceName} />
          <ReviewItem label="Patient Price" value={servicePrice} />
        </ReviewSection>

        <ReviewSection title="Photo" onEdit={() => onEdit(4)}>
          {formData.photoPreview ? (
            <img
              src={formData.photoPreview}
              alt="Your photo"
              className="h-20 w-20 rounded-lg border border-gray-200 object-cover"
            />
          ) : (
            <p className="text-sm text-gray-500">No photo uploaded</p>
          )}
        </ReviewSection>

        <ReviewSection title="Availability" onEdit={() => onEdit(5)}>
          <ReviewItem
            label="Days"
            value={formatDaysForDisplay(formData.availableDays || DEFAULT_AVAILABLE_DAYS)}
          />
          <ReviewItem
            label="Hours"
            value={`${formData.startTime} - ${formData.endTime}`}
          />
          <ReviewItem
            label="Max Patients/Month"
            value={formData.maxNewPatients}
          />
        </ReviewSection>
      </div>

      <div className="rounded-lg border-2 border-gray-900 bg-gray-50 p-4">
        <CheckboxField
          checked={formData.agreeTerms || false}
          onChange={onToggleTerms}
          label="I agree to the terms and conditions"
          description="You'll only be charged $150 per patient after we deliver 10+ confirmed appointments"
        />
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h4 className="mb-2 font-semibold text-gray-900">What happens next?</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>✓ Your ads will launch within 24 hours</li>
          <li>✓ Track everything in real-time from your dashboard</li>
          <li>✓ We'll notify you when patients book</li>
          <li>✓ You only pay $150/patient after we deliver 10+</li>
        </ul>
      </div>
    </div>
  )
}

const ReviewSection = ({
  title,
  onEdit,
  children,
}: {
  title: string
  onEdit: () => void
  children: React.ReactNode
}) => (
  <div className="rounded-lg border border-gray-200 p-4">
    <div className="mb-3 flex items-center justify-between">
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <button
        type="button"
        onClick={onEdit}
        className="text-sm font-medium text-gray-900 underline hover:text-gray-700"
      >
        Edit
      </button>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
)

const ReviewItem = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
)

const Step7Success = ({ onGoToDashboard }: { onGoToDashboard: () => void }) => {
  useEffect(() => {
    clearLocalStorage()
  }, [])

  return (
    <div className="space-y-6 rounded-xl bg-white p-8 text-center shadow-sm">
      <div className="text-6xl">🎉</div>
      <div>
        <h2 className="mb-2 text-3xl font-bold text-gray-900">Your ads are launching!</h2>
        <p className="text-lg text-gray-600">
          We'll send you an email once your campaign is live
        </p>
      </div>
      <div className="rounded-lg border-2 border-gray-900 bg-gray-50 p-6">
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900">
            <Check className="h-7 w-7 text-white" strokeWidth={3} />
          </div>
        </div>
        <h3 className="mb-2 font-semibold text-gray-900">What's Next?</h3>
        <ul className="space-y-2 text-left text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="mt-0.5">✓</span>
            <span>Your campaign will be live within 24 hours</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5">✓</span>
            <span>Track bookings in real-time from your dashboard</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5">✓</span>
            <span>You'll be notified when patients book appointments</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5">✓</span>
            <span>Remember: You only pay after we deliver 10+ patients</span>
          </li>
        </ul>
      </div>
      <Button
        type="button"
        onClick={onGoToDashboard}
        className="h-12 w-full bg-gray-900 text-white hover:bg-gray-800"
      >
        Go to Dashboard
      </Button>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function OnboardingForm() {
  const router = useRouter()

  // Step & control state
  const [step, setStep] = useState<Step>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)
  const [isLeavingConfirmed, setIsLeavingConfirmed] = useState(false)

  // Form state
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
  const [photoFile, setPhotoFile] = useState<File | null>(DEFAULT_FORM_DATA.photoFile)
  const [photoPreview, setPhotoPreview] = useState<string | null>(DEFAULT_FORM_DATA.photoPreview)
  const [availableDays, setAvailableDays] = useState<AvailableDays>(DEFAULT_FORM_DATA.availableDays)
  const [startTime, setStartTime] = useState(DEFAULT_FORM_DATA.startTime)
  const [endTime, setEndTime] = useState(DEFAULT_FORM_DATA.endTime)
  const [maxNewPatients, setMaxNewPatients] = useState(DEFAULT_FORM_DATA.maxNewPatients)
  const [prefSms, setPrefSms] = useState(DEFAULT_FORM_DATA.prefSms)
  const [prefEmail, setPrefEmail] = useState(DEFAULT_FORM_DATA.prefEmail)
  const [prefSameDay, setPrefSameDay] = useState(DEFAULT_FORM_DATA.prefSameDay)
  const [agreeTerms, setAgreeTerms] = useState(DEFAULT_FORM_DATA.agreeTerms)

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
    photoFile,
    photoPreview,
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
      setPhotoPreview(saved.photoPreview || DEFAULT_FORM_DATA.photoPreview)
      setAvailableDays(saved.availableDays || DEFAULT_FORM_DATA.availableDays)
      setStartTime(saved.startTime || DEFAULT_FORM_DATA.startTime)
      setEndTime(saved.endTime || DEFAULT_FORM_DATA.endTime)
      setMaxNewPatients(saved.maxNewPatients || DEFAULT_FORM_DATA.maxNewPatients)
      setPrefSms(saved.prefSms ?? DEFAULT_FORM_DATA.prefSms)
      setPrefEmail(saved.prefEmail ?? DEFAULT_FORM_DATA.prefEmail)
      setPrefSameDay(saved.prefSameDay ?? DEFAULT_FORM_DATA.prefSameDay)
      setAgreeTerms(saved.agreeTerms ?? DEFAULT_FORM_DATA.agreeTerms)
      if (saved.step !== undefined && saved.step < 7) {
        setStep(saved.step)
      }
    }
  }, [])

  // Custom hooks
  useFormPersistence(step, formData)
  useNavigationGuard(step, isLeavingConfirmed, setShowLeaveConfirm)
  useAnalytics(step)

  // Navigation handlers
  const next = () => {
    if (step < 7) {
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

  const handlePhotoSelect = (file: File) => {
    setPhotoFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handlePhotoRemove = () => {
    setPhotoFile(null)
    setPhotoPreview(null)
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
      next() // Go to step 7 (success)
      setIsSubmitting(false)
    }, LAUNCH_DELAY_MS)

    // TODO: Replace with actual API call
    // const formDataToSubmit = new FormData()
    // Object.entries(formData).forEach(([key, value]) => {
    //   if (key === 'photoFile' && value) {
    //     formDataToSubmit.append('photo', value)
    //   } else if (key !== 'photoPreview' && key !== 'photoFile') {
    //     formDataToSubmit.append(key, JSON.stringify(value))
    //   }
    // })
    // try {
    //   const response = await fetch('/api/onboarding/complete', {
    //     method: 'POST',
    //     body: formDataToSubmit,
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
    if (step === 6) {
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
            />
          )}

          {step === 1 && (
            <Step1Address
              streetAddress={streetAddress}
              city={city}
              state={addressState}
              zip={zip}
              onChange={updateField}
            />
          )}

          {step === 2 && (
            <Step2Contact
              fullName={fullName}
              email={email}
              phone={phone}
              onChange={updateField}
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
            <Step4Photo
              photoFile={photoFile}
              photoPreview={photoPreview}
              onPhotoSelect={handlePhotoSelect}
              onPhotoRemove={handlePhotoRemove}
            />
          )}

          {step === 5 && (
            <Step5Availability
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

          {step === 6 && (
            <Step6Review
              formData={formData}
              onEdit={goToStep}
              onToggleTerms={toggleTerms}
            />
          )}

          {step === 7 && (
            <Step7Success onGoToDashboard={handleGoToDashboard} />
          )}

          {step > 0 && step < 7 && (
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

      {showLeaveConfirm && step < 7 && (
        <LeaveConfirmModal onStay={handleStay} onLeave={handleLeave} />
      )}
    </main>
  )
}