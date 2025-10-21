"use client"
import React, { useState } from "react"
import { bookingFormSchema, type BookingFormData } from "@/lib/validations"

type Props = {
  dentistId?: string
  dentistSlug?: string
}

export default function BookingForm({ dentistId, dentistSlug }: Props) {
  const [form, setForm] = useState<BookingFormData>({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    appointmentDate: "",
    appointmentTime: "",
    consent: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (patch: Partial<BookingFormData>) => setForm(prev => ({ ...prev, ...patch }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      // Validate
      const parsed = bookingFormSchema.parse(form)

      const body: any = { data: parsed }
      if (dentistId) body.dentist_id = dentistId
      if (dentistSlug) body.dentist_slug = dentistSlug

      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j?.error || "Failed to start checkout")
      }
      const j = await res.json()
      const url: string = j?.url
      if (!url) throw new Error("Missing checkout URL")
      window.location.href = url
    } catch (err: any) {
      const message: string = err?.message || "Invalid form"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4 border rounded">
      <h2 className="text-xl font-semibold">Book Your Appointment</h2>
      <p className="text-sm text-muted-foreground">Prepayment of $79 to confirm your spot.</p>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Full Name</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={form.patientName}
          onChange={(e) => update({ patientName: e.target.value })}
          placeholder="Jane Doe"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full border rounded p-2"
          value={form.patientEmail}
          onChange={(e) => update({ patientEmail: e.target.value })}
          placeholder="jane@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="tel"
          className="w-full border rounded p-2"
          value={form.patientPhone}
          onChange={(e) => update({ patientPhone: e.target.value })}
          placeholder="(555) 123-4567"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={form.appointmentDate}
            onChange={(e) => update({ appointmentDate: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Time</label>
          <input
            type="time"
            className="w-full border rounded p-2"
            value={form.appointmentTime}
            onChange={(e) => update({ appointmentTime: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="consent"
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update({ consent: e.target.checked })}
          required
        />
        <label htmlFor="consent" className="text-sm">
          I agree to the appointment policy and prepayment.
        </label>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded p-2 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Starting checkout…" : "Confirm and Pay $79"}
      </button>
    </form>
  )
}