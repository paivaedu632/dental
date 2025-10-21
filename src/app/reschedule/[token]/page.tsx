"use client"
import { useState, use } from "react"
import { z } from "zod"
import { rescheduleFormSchema, type RescheduleFormData } from "@/lib/validations"

interface Props {
  params: Promise<{ token: string }>
}

export default function Page({ params }: Props) {
  const { token } = use(params)
  const [form, setForm] = useState<RescheduleFormData>({
    bookingId: "",
    newDateTime: "",
    reason: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    try {
      setSubmitting(true)
      setError(null)
      rescheduleFormSchema.parse(form)
      const res = await fetch("/api/reschedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, data: form }),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || "Failed to reschedule")
      }
      setSuccess(true)
    } catch (e: any) {
      setError(e?.message || "Submission failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 py-10">
      <div className="max-w-xl mx-auto bg-white/90 backdrop-blur p-6 rounded-xl border shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Reschedule Appointment</h1>
        <p className="text-sm text-muted-foreground mb-6">Token: {token}</p>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-md bg-green-50 text-green-700 border border-green-200">
            Appointment rescheduled successfully.
          </div>
        )}

        <div className="space-y-3">
          <input className="w-full border rounded p-2" placeholder="Booking ID" value={form.bookingId} onChange={e => setForm({ ...form, bookingId: e.target.value })} />
          <input className="w-full border rounded p-2" type="datetime-local" value={form.newDateTime} onChange={e => setForm({ ...form, newDateTime: e.target.value })} />
          <textarea className="w-full border rounded p-2" placeholder="Reason (optional)" value={form.reason || ""} onChange={e => setForm({ ...form, reason: e.target.value })} />
          <div className="flex justify-end">
            <button disabled={submitting} className="px-4 py-2 rounded bg-amber-600 text-white" onClick={submit}>{submitting ? 'Submitting…' : 'Confirm Reschedule'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}