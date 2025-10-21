'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Stethoscope } from 'lucide-react'

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6


export default function OnboardingV2() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(0)

  const [businessName, setBusinessName] = useState<string>('')
  const hasBusinessName = businessName.trim().length > 0

  const [streetAddress, setStreetAddress] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [addressState, setAddressState] = useState<string>('')
  const [zip, setZip] = useState<string>('')
  const isZipValid = /^\d{5}(-\d{4})?$/.test(zip)
  const isAddressComplete = streetAddress.trim().length > 0 && city.trim().length > 0 && addressState.trim().length > 0 && isZipValid

  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const hasName = fullName.trim().length > 0
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isPhoneValid = /^\(\d{3}\) \d{3}-\d{4}$/.test(phone)
  const isContactComplete = hasName && isEmailValid && isPhoneValid
const [practiceEditOpen, setPracticeEditOpen] = useState(false)
const [offerType, setOfferType] = useState<'standard' | 'custom'>('standard')
const [customServiceName, setCustomServiceName] = useState<string>('')
const [customPrice, setCustomPrice] = useState<string>('79')
const isCustomPriceValid = /^\d+(\.\d{1,2})?$/.test(customPrice) && parseFloat(customPrice) > 0
const isOfferValid = offerType === 'standard' || (customServiceName.trim().length > 0 && isCustomPriceValid)

// Availability (Step 5)
const [availableDays, setAvailableDays] = useState({ M: true, T: true, W: true, Th: true, F: true, Sa: false, Su: false })
const toggleDay = (key: keyof typeof availableDays) => setAvailableDays(d => ({ ...d, [key]: !d[key] }))

const [startTime, setStartTime] = useState<string>('9:00 AM')
const [endTime, setEndTime] = useState<string>('5:00 PM')

const [maxNewPatients, setMaxNewPatients] = useState<string>('30')
const maxPatientsNum = parseInt(maxNewPatients, 10)
const isMaxPatientsValid = Number.isFinite(maxPatientsNum) && maxPatientsNum > 0

const [prefSms, setPrefSms] = useState<boolean>(true)
const [prefEmail, setPrefEmail] = useState<boolean>(true)
const [prefSameDay, setPrefSameDay] = useState<boolean>(false)

const isDaysSelected = Object.values(availableDays).some(Boolean)
const isAvailabilityValid = isDaysSelected && !!startTime && !!endTime && isMaxPatientsValid

const [agreeTerms, setAgreeTerms] = useState<boolean>(false)

  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)
  const [isLeavingConfirmed, setIsLeavingConfirmed] = useState(false)
  const hasPushedGuardRef = useRef(false)
 
  const totalSteps = 7
  const progressPercent = Math.round(((step + 1) / totalSteps) * 100)
  const timerMessages = ['Complete in 2 minutes', '60s left to launch your ads', '30s left to launch your ads', '30s left to launch your ads', 'Final step.', 'Almost done!', 'All set'] as const
  const timerText = timerMessages[step]
  const estimatedTotalSeconds = 120
  const remainingSeconds = Math.max(5, Math.round((estimatedTotalSeconds * (100 - progressPercent)) / 100))

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isLeavingConfirmed && step > 0 && step < 6) {
        e.preventDefault()
        e.returnValue = ''
        return ''
      }
    }

    const onPopState = (e: PopStateEvent) => {
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
  }, [step, isLeavingConfirmed])

  function next() {
    setStep((s) => (s < 6 ? ((s + 1) as Step) : s))
  }
  function back() {
    setStep((s) => (s > 0 ? ((s - 1) as Step) : s))
  }

  function handleContinue() {
    if (step === 0) return next()
    if (step === 1 && isAddressComplete) return next()
    if (step === 2 && isContactComplete) return next()
    if (step === 3 && isOfferValid) return next()
    if (step === 4 && isAvailabilityValid) return next()
    if (step === 5 && agreeTerms) return next()
    if (step === 6) router.push('/')
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[526px] mx-auto">
        {/* Logo above progress */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <Stethoscope className="h-8 w-8 text-black" aria-hidden />
          <span className="text-black text-xl md:text-2xl font-semibold tracking-tight leading-none">DentalFlow</span>
        </div>
        {/* Indicator: left text + emoji, right percentage */}
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm md:text-base font-medium text-foreground">
            {timerText} <span aria-hidden="true" className="ml-1">✨</span>
          </div>
          <div className="text-sm md:text-base font-medium text-foreground">
            {progressPercent}%
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Title + Subtitle */}
        {step === 0 ? (
            <div className="mb-6 mx-auto max-w-[526px] w-full text-center">
              <h1 className="text-foreground font-semibold text-[26px] mt-4 mb-4">What's Your Practice Name?</h1>
              <p id="business-name-hint" className="mt-2 text-sm md:text-base text-muted-foreground">Use your clinic or brand name.</p>
            </div>
          ) : step === 1 ? (
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">What's Your Practice Address?</h1>
          </div>
        ) : step === 2 ? (
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">What's Your Contact Info?</h1>
          </div>
        ) : step === 3 ? (
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">What will you offer new patients?</h1>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">Most dentists start with just the $79 cleaning offer.</p>
          </div>
        ) : step === 4 ? (
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">When can you see new patients?</h1>
          </div>
        ) : step === 5 ? (
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Confirm your details</h1>
          </div>
        ) : step === 6 ? (
          <div className="text-center mb-8">
            {/* Confetti animation overlay */}
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

            {/* Success content */}
            <div className="text-4xl" aria-hidden="true">🎉</div>
            <h1 className="text-foreground font-semibold text-[26px] mt-4 mb-4">Your ads are launching!</h1>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">We'll email you when they go live.</p>
            <Button className="mt-6 w-full" onClick={() => router.push('/dashboard')}>
              Go to dashboard
            </Button>
          </div>
        ) : null}

        {/* Step content */}
        <div className="space-y-6">
          {step === 0 && (
            <div className="space-y-5">
              <div>

                <input
                  type="text"
                  id="business-name"
                  name="businessName"
                  autoComplete="organization"
                  aria-invalid={!hasBusinessName}
                  aria-describedby="business-name-hint"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                   className="w-full px-4 py-3 text-base border border-black rounded-lg focus:border-2 focus:border-black focus:outline-none transition-all duration-150 ease-in-out bg-white min-h-[44px]"
                   required
                />
              </div>


              <Button
                type="button"
                onClick={() => hasBusinessName && next()}
                className="w-full"
              >
                Next
              </Button>

              <p className="text-center text-sm text-[#2e2e2e]">
                support@example.com.
               </p>
            </div>
          )}


          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="street-address" className="block text-black text-sm font-bold mb-2">Street Address</label>
                <input
                  type="text"
                  id="street-address"
                  name="streetAddress"
                  autoComplete="address-line1"
                  aria-invalid={streetAddress.trim().length === 0}
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full px-4 py-3 text-base border border-black rounded-lg focus:border-2 focus:border-black focus:outline-none transition-all duration-150 ease-in-out bg-white min-h-[44px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="city" className="block text-black text-sm font-bold mb-2">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    aria-invalid={city.trim().length === 0}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 text-base border border-black rounded-lg focus:border-2 focus:border-black focus:outline-none transition-all duration-150 ease-in-out bg-white min-h-[44px]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-black text-sm font-bold mb-2">State</label>
                  <select
                    id="state"
                    name="state"
                    autoComplete="address-level1"
                    aria-invalid={addressState.trim().length === 0}
                    value={addressState}
                    onChange={(e) => setAddressState(e.target.value)}
                    className="w-full px-4 py-3 text-base border border-black rounded-lg focus:border-2 focus:border-black focus:outline-none transition-all duration-150 ease-in-out bg-white min-h-[44px]"
                    required
                  >
                    <option value="" disabled>Select</option>
                    <option value="AL">AL</option>
                    <option value="AK">AK</option>
                    <option value="AZ">AZ</option>
                    <option value="AR">AR</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="IA">IA</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="ME">ME</option>
                    <option value="MD">MD</option>
                    <option value="MA">MA</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MS">MS</option>
                    <option value="MO">MO</option>
                    <option value="MT">MT</option>
                    <option value="NE">NE</option>
                    <option value="NV">NV</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NY">NY</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VT">VT</option>
                    <option value="VA">VA</option>
                    <option value="WA">WA</option>
                    <option value="WV">WV</option>
                    <option value="WI">WI</option>
                    <option value="WY">WY</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="zip" className="block text-black text-sm font-bold mb-2">Zip</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    pattern="\d{5}(-\d{4})?"
                    aria-invalid={!isZipValid}
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full px-4 py-3 text-base border border-black rounded-lg focus:border-2 focus:border-black focus:outline-none transition-all duration-150 ease-in-out bg-white min-h-[44px]"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="full-name" className="block text-black text-sm font-bold mb-2">Your Name</label>
                <input
                  type="text"
                  id="full-name"
                  name="fullName"
                  autoComplete="name"
                  aria-invalid={!hasName}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 text-base border border-black rounded-lg focus:border-2 focus:border-black focus:outline-none transition-all duration-150 ease-in-out bg-white min-h-[44px]"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-black text-sm font-bold mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  aria-invalid={!isEmailValid}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-base border border-black rounded-lg focus:border-2 focus:border-black focus:outline-none transition-all duration-150 ease-in-out bg-white min-h-[44px]"
                  required
                />
                <p className="mt-2 text-[#2e2e2e] text-sm"> *Booking notifications will be sent here</p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-black text-sm font-bold mb-2">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  inputMode="tel"
                  pattern="^\(\d{3}\) \d{3}-\d{4}$"
                  aria-invalid={!isPhoneValid}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 text-base border border-black rounded-lg focus:border-2 focus:border-black focus:outline-none transition-all duration-150 ease-in-out bg-white min-h-[44px]"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4" role="radiogroup" aria-label="New patient offer">
              <button
                type="button"
                role="radio"
                aria-checked={offerType === 'standard'}
                onClick={() => setOfferType('standard')}
                className={`w-full text-left rounded-xl border px-5 py-4 transition ${offerType === 'standard' ? 'border-primary bg-accent' : 'border-border hover:bg-accent'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-base md:text-lg font-semibold text-foreground">Cleaning + Exam - $79</div>
                  <span aria-hidden="true" className="text-xl">{offerType === 'standard' ? '◉' : '○'}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">Cleaning plus comprehensive examination</div>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={offerType === 'custom'}
                onClick={() => setOfferType('custom')}
                className={`w-full text-left rounded-xl border px-5 py-4 transition ${offerType === 'custom' ? 'border-primary bg-accent' : 'border-border hover:bg-accent'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-base md:text-lg font-semibold text-foreground">Custom Service</div>
                  <span aria-hidden="true" className="text-xl">{offerType === 'custom' ? '◉' : '○'}</span>
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="custom-service-name" className="block text-black text-sm font-bold mb-2">Service name</label>
                    <input
                      type="text"
                      id="custom-service-name"
                      value={customServiceName}
                      onChange={(e) => setCustomServiceName(e.target.value)}
                      disabled={offerType !== 'custom'}
                      className="w-full px-4 py-3 text-base border border-black rounded-lg focus:border-2 focus:border-black focus:outline-none transition-all duration-150 ease-in-out bg-white min-h-[44px] disabled:opacity-50"
                      placeholder="e.g., Whitening + Exam"
                    />
                  </div>
                  <div>
                    <label htmlFor="custom-price" className="block text-black text-sm font-bold mb-2">$ Price patient pays</label>
                    <input
                      type="text"
                      id="custom-price"
                      inputMode="decimal"
                      pattern="^\\d+(\\.\\d{1,2})?$"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                      disabled={offerType !== 'custom'}
                      className="w-full px-4 py-3 text-base border border-black rounded-lg focus:border-2 focus:border-black focus:outline-none transition-all duration-150 ease-in-out bg-white min-h-[44px] disabled:opacity-50"
                      placeholder="79"
                    />
                  </div>
                </div>
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-black text-sm font-bold mb-2">Available Days</label>
                <div className="flex flex-wrap gap-2">
                  {(['M','T','W','Th','F','Sa','Su'] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDay(d as keyof typeof availableDays)}
                      className={`px-4 py-2 rounded-full border transition ${availableDays[d as keyof typeof availableDays] ? 'border-black bg-black text-white' : 'border-black bg-white'} `}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-black text-sm font-bold mb-2">Office Hours</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="start-time" className="block text-black text-sm font-medium mb-1">From</label>
                    <select
                      id="start-time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-4 py-3 text-base border border-black rounded-lg focus:border-2 focus:border-black bg-white"
                    >
                      {['7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="end-time" className="block text-black text-sm font-medium mb-1">to</label>
                    <select
                      id="end-time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-4 py-3 text-base border border-black rounded-lg focus:border-2 focus:border-black bg-white"
                    >
                      {['12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="max-new-patients" className="block text-black text-sm font-bold mb-2">Maximum New Patients Per Month</label>
                <input
                  type="number"
                  id="max-new-patients"
                  min={1}
                  value={maxNewPatients}
                  onChange={(e) => setMaxNewPatients(e.target.value)}
                  className="w-full px-4 py-3 text-base border border-black rounded-lg focus:border-2 focus:border-black focus:outline-none bg-white min-h-[44px]"
                  placeholder="30"
                />
                <p className="mt-2 text-[#2e2e2e] text-sm">We'll automatically pause ads when this limit is reached</p>
              </div>

              <div>
                <label className="block text-black text-sm font-bold mb-2">Patient Booking Preferences</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input className="accent-black" type="checkbox" checked={prefSms} onChange={(e) => setPrefSms(e.target.checked)} />
                    <span>Send me SMS when patients book</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input className="accent-black" type="checkbox" checked={prefEmail} onChange={(e) => setPrefEmail(e.target.checked)} />
                    <span>Send me email summaries (daily)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input className="accent-black" type="checkbox" checked={prefSameDay} onChange={(e) => setPrefSameDay(e.target.checked)} />
                    <span>Allow same-day bookings</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Practice Information</h2>
                  <div className="relative">
                    <button type="button" className="text-sm underline text-black" onClick={() => setPracticeEditOpen((v) => !v)}>Edit</button>
                    {practiceEditOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg z-10">
                        <ul className="py-1 text-sm">
                          <li>
                            <button type="button" className="w-full text-left px-3 py-2 hover:bg-accent" onClick={() => { setStep(0); setPracticeEditOpen(false); }}>
                              Business name
                            </button>
                          </li>
                          <li>
                            <button type="button" className="w-full text-left px-3 py-2 hover:bg-accent" onClick={() => { setStep(1); setPracticeEditOpen(false); }}>
                              Address
                            </button>
                          </li>
                          <li>
                            <button type="button" className="w-full text-left px-3 py-2 hover:bg-accent" onClick={() => { setStep(2); setPracticeEditOpen(false); }}>
                              Contact details
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="text-base text-foreground">{businessName || '—'}</div>
                  <div className="text-muted-foreground">{fullName || '—'}</div>
                  <div className="text-muted-foreground">{email || '—'}</div>
                  <div className="text-muted-foreground">{phone || '—'}</div>
                  <div className="text-muted-foreground">{[streetAddress, (city && addressState ? `${city}, ${addressState}` : ''), zip].filter(Boolean).join(', ') || '—'}</div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Services Offered</h2>
                  <button type="button" className="text-sm underline text-black" onClick={() => setOfferType('standard') || setStep(3)}>Edit</button>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {offerType === 'standard' ? (
                    <span>Cleaning - $79</span>
                  ) : (
                    <span>{customServiceName || 'Custom Service'} - ${customPrice}</span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Availability</h2>
                  <button type="button" className="text-sm underline text-black" onClick={() => setStep(4)}>Edit</button>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <div>
                    {availableDays.M && availableDays.T && availableDays.W && availableDays.Th && availableDays.F && !availableDays.Sa && !availableDays.Su
                      ? 'Monday - Friday'
                      : ['M','T','W','Th','F','Sa','Su']
                          .filter(d => availableDays[d as keyof typeof availableDays])
                          .map(d => ({M:'Monday',T:'Tuesday',W:'Wednesday',Th:'Thursday',F:'Friday',Sa:'Saturday',Su:'Sunday'}[d]))
                          .join(', ')}
                    , {startTime} - {endTime}
                  </div>
                  <div>Up to {isMaxPatientsValid ? maxPatientsNum : maxNewPatients} new patients per month</div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground">Your Target Area</h2>
                <p className="mt-2 text-sm text-muted-foreground">We'll target people within 15 miles of {city && addressState ? `${city}, ${addressState}` : 'your city'}</p>
                <p className="text-sm text-muted-foreground">Your ads will be shown to ~250,000 potential patients</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground">What happens next?</h2>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>✅ We launch your TikTok ads (within 48 hours)</li>
                  <li>✅ You'll get email confirmation when ads are live</li>
                  <li>✅ Patients start booking (typically 3-5 days)</li>
                  <li>✅ You only pay $150/patient after we deliver 10+</li>
                </ul>
              </div>

              <label className="flex items-start gap-3 text-sm text-foreground">
                <input className="accent-black mt-1" type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                <span>
                  I agree to the Terms of Service and understand the no-refund policy for the $500 trial payment
                </span>
              </label>
            </div>
          )}

          {/* Actions */}
          {step > 0 && (
            <div className="flex flex-col gap-3 pt-2">
              {step < 6 && (
                <Button
                  onClick={handleContinue}
                  disabled={(step === 1 && !isAddressComplete) || (step === 2 && !isContactComplete) || (step === 3 && !isOfferValid) || (step === 4 && !isAvailabilityValid) || (step === 5 && !agreeTerms)}
                  size="lg"
                  className="w-full rounded-full text-base"
                >
                  {step < 5 ? 'Continue' : 'Yes, Launch My Ads'}
                </Button>
              )}

              {step > 0 && step < 6 && (
                <Button variant="outline" size="lg" className="w-full rounded-full text-base" onClick={back}>
                  Back
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {showLeaveConfirm && step < 6 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
            <div className="text-3xl mb-2" aria-hidden="true">⚠️</div>
            <h2 className="text-xl font-semibold mb-2">Leave this page?</h2>
            <p className="text-sm text-muted-foreground">You haven't finished setting up your ads.</p>
            <p className="mt-2 text-sm text-muted-foreground">Your progress is saved — you can come back anytime, but your trial won't be activated until you complete setup.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button className="w-full" onClick={() => { setShowLeaveConfirm(false); history.pushState({ guard: 'onboarding' }, '', window.location.href); }}>
                Stay & Finish (60s left)
              </Button>
              <Button variant="outline" className="w-full" onClick={() => { setIsLeavingConfirmed(true); setTimeout(() => window.history.go(-2), 10); }}>
                Leave Page
              </Button>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}