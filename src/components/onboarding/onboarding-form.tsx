'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { onboardingFormSchema, type OnboardingFormData } from '@/lib/onboarding-validations'

// using native input
// using native label

// using native select

import { toast } from 'sonner'

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
const DAYS = ['M','T','W','Th','F','Sa','Su']

interface Props { dentistId: string; email: string; token: string }
export function OnboardingForm({ dentistId, email, token }: Props) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: { businessName:'', contactName:'', email, phone:'', address:'', city:'', state:'', zip:'', services:[{name:'Cleaning',price:79}], availableDays:['M','T','W','Th','F'], hoursStart:'09:00', hoursEnd:'17:00', maxPatientsPerMonth:30, acceptPolicies:false },
  })

  useEffect(() => { const s = localStorage.getItem(`onboarding_progress_${dentistId}`); if (s) { try { form.reset(JSON.parse(s)) } catch {} } }, [dentistId])
  const watched = form.watch()
  useEffect(() => { localStorage.setItem(`onboarding_progress_${dentistId}`, JSON.stringify(watched)) }, [watched, dentistId])
  useEffect(() => { const h = (e: BeforeUnloadEvent) => { if (form.formState.isDirty && !form.formState.isSubmitSuccessful) { e.preventDefault(); e.returnValue = '' } }; window.addEventListener('beforeunload', h); return () => window.removeEventListener('beforeunload', h) }, [form.formState.isDirty, form.formState.isSubmitSuccessful])

  const progress = (step / 4) * 100
  async function onSubmit(data: OnboardingFormData) {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/onboarding/complete', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...data, dentistId, token }) })
      if (!res.ok) throw new Error('Failed')
      localStorage.removeItem(`onboarding_progress_${dentistId}`)
      toast.success('Setup complete! Launching your ads...')
      setTimeout(() => router.push('/dashboard'), 1500)
    } catch (e) { toast.error('Failed to complete setup. Please try again.'); setIsSubmitting(false) }
  }
  function nextStep() { const f = fields(step); form.trigger(f).then((ok) => { if (ok) { setStep(step + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) } }) }
  function prevStep() { setStep(step - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  function fields(s: number): (keyof OnboardingFormData)[] { if (s===1) return ['businessName','contactName','email','phone','address','city','state','zip']; if (s===2) return ['services']; if (s===3) return ['availableDays','hoursStart','hoursEnd','maxPatientsPerMonth']; if (s===4) return ['acceptPolicies']; return [] }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="mb-8 text-center"><h1 className="text-2xl font-bold mb-2">DentalFlow</h1><p className="text-gray-600">Complete your setup</p></div>
      <div className="mb-6 border border-yellow-400 bg-yellow-50 rounded-lg p-4 text-yellow-800"><strong>Complete setup now to launch your ads today.</strong> This form takes 2 minutes. Link expires in 24 hours.</div>
      <div className="mb-8"><div className="flex justify-between text-sm text-gray-600 mb-2"><span>Progress</span><span className="font-medium">{progress.toFixed(0)}% Complete</span></div><div className="h-2 bg-gray-200 rounded-full"><div className="h-2 bg-sky-500 rounded-full" style={{ width: `${progress}%` }} /></div></div>
      <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
        <div className="mb-6"><p className="text-sm text-gray-600">Step {step} of 4</p></div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step===1 && (
            <div className="space-y-4">
              <div><label htmlFor="businessName" className="block text-sm font-medium">Business Name *</label><input id="businessName" {...form.register('businessName')} placeholder="Austin Dental Care" className="mt-1 w-full border rounded px-3 py-2" /></div>
              <div><label htmlFor="contactName" className="block text-sm font-medium">Your Name *</label><input id="contactName" {...form.register('contactName')} placeholder="Dr. Sarah Johnson" className="mt-1 w-full border rounded px-3 py-2" /></div>
              <div><label htmlFor="email" className="block text-sm font-medium">Email Address *</label><input id="email" type="email" {...form.register('email')} disabled className="mt-1 w-full border rounded px-3 py-2 bg-gray-50" /><p className="text-sm text-gray-500 mt-1">This is where we'll send booking notifications</p></div>
              <div><label htmlFor="phone" className="block text-sm font-medium">Phone Number *</label><input id="phone" {...form.register('phone')} placeholder="(555) 123-4567" className="mt-1 w-full border rounded px-3 py-2" /></div>
              <div><label htmlFor="address" className="block text-sm font-medium">Practice Address *</label><input id="address" {...form.register('address')} placeholder="123 Main Street" className="mt-1 w-full border rounded px-3 py-2" /></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label htmlFor="city" className="block text-sm font-medium">City *</label><input id="city" {...form.register('city')} placeholder="Austin" className="mt-1 w-full border rounded px-3 py-2" /></div>
                <div><label htmlFor="state" className="block text-sm font-medium">State *</label><select id="state" value={form.watch('state')} onChange={(e)=>form.setValue('state', e.target.value)} className="mt-1 w-full border rounded px-3 py-2"><option value="">Select</option>{US_STATES.map((s)=> (<option key={s} value={s}>{s}</option>))}</select></div>
                <div><label htmlFor="zip" className="block text-sm font-medium">ZIP *</label><input id="zip" {...form.register('zip')} placeholder="78701" className="mt-1 w-full border rounded px-3 py-2" /></div>
              </div>
              <div className="flex justify-end"><button type="button" onClick={nextStep} className="px-3 py-2 rounded bg-sky-600 text-white">Next</button></div>
            </div>
          )}

          {step===2 && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 space-y-3">
                <label className="flex items-start gap-2"><input type="checkbox" id="cleaning" checked={form.watch('services').some((s)=>s.name==='Cleaning')} onChange={(e)=>{const c=e.target.checked; const cur=form.watch('services'); form.setValue('services', c?[...cur,{name:'Cleaning',price:79}]:cur.filter((s)=>s.name!=='Cleaning'))}} /><span>Cleaning - $79</span></label>
                <label className="flex items-start gap-2"><input type="checkbox" id="cleaning-exam" checked={form.watch('services').some((s)=>s.name==='Cleaning + Exam')} onChange={(e)=>{const c=e.target.checked; const cur=form.watch('services'); form.setValue('services', c?[...cur,{name:'Cleaning + Exam',price:99}]:cur.filter((s)=>s.name!=='Cleaning + Exam'))}} /><span>Cleaning + Exam - $99</span></label>
              </div>
              <div className="flex justify-between"><button type="button" onClick={prevStep} className="px-3 py-2 rounded border">Back</button><button type="button" onClick={nextStep} className="px-3 py-2 rounded bg-sky-600 text-white">Next</button></div>
            </div>
          )}

          {step===3 && (
            <div className="space-y-4">
              <div><label className="block text-sm font-medium">Available Days *</label><div className="flex flex-wrap gap-3 mt-2">{DAYS.map((d)=> (<label key={d} className="flex items-center gap-2"><input type="checkbox" checked={form.watch('availableDays').includes(d)} onChange={(e)=>{const c=e.target.checked; const cur=form.watch('availableDays'); form.setValue('availableDays', c?[...cur,d]:cur.filter((x)=>x!==d))}} /><span>{d}</span></label>))}</div></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label htmlFor="hoursStart" className="block text-sm font-medium">Start Time *</label><input id="hoursStart" type="time" {...form.register('hoursStart')} className="mt-1 w-full border rounded px-3 py-2" /></div>
                <div><label htmlFor="hoursEnd" className="block text-sm font-medium">End Time *</label><input id="hoursEnd" type="time" {...form.register('hoursEnd')} className="mt-1 w-full border rounded px-3 py-2" /></div>
                <div><label htmlFor="maxPatientsPerMonth" className="block text-sm font-medium">Max Patients / Month *</label><input id="maxPatientsPerMonth" type="number" min={1} {...form.register('maxPatientsPerMonth',{ valueAsNumber:true })} className="mt-1 w-full border rounded px-3 py-2" /></div>
              </div>
              <div className="flex justify-between"><button type="button" onClick={prevStep} className="px-3 py-2 rounded border">Back</button><button type="button" onClick={nextStep} className="px-3 py-2 rounded bg-sky-600 text-white">Next</button></div>
            </div>
          )}

          {step===4 && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 text-sm text-gray-700 space-y-1">
                <p><strong>Practice:</strong> {form.watch('businessName')}</p>
                <p><strong>Contact:</strong> {form.watch('contactName')} • {form.watch('phone')}</p>
                <p><strong>Address:</strong> {form.watch('address')}, {form.watch('city')}, {form.watch('state')} {form.watch('zip')}</p>
                <p><strong>Services:</strong> {form.watch('services').map((s)=>s.name).join(', ')}</p>
                <p><strong>Schedule:</strong> {form.watch('availableDays').join(', ')} • {form.watch('hoursStart')} - {form.watch('hoursEnd')}</p>
                <p><strong>Max Patients:</strong> {form.watch('maxPatientsPerMonth')}</p>
              </div>
              <label className="flex items-start gap-3 text-sm"><input type="checkbox" {...form.register('acceptPolicies')} /><span>I confirm this information is accurate and I accept the service terms.</span></label>
              <div className="flex justify-between"><button type="button" onClick={prevStep} className="px-3 py-2 rounded border">Back</button><button type="submit" disabled={isSubmitting} className="px-3 py-2 rounded bg-sky-600 text-white">{isSubmitting?'Submitting...':'Finish Setup'}</button></div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}