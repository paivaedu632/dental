import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rescheduleFormSchema } from '@/lib/validations'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { appointmentService } from '@/lib/api/services'

const BodySchema = z.object({
  token: z.string().min(8),
  data: rescheduleFormSchema,
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = BodySchema.parse(json)

    const supabase = createSupabaseServerClient()
    const { data: tokenRow, error: tokenErr } = await supabase
      .from('reschedule_tokens')
      .select('dentist_id, appointment_id, expires_at')
      .eq('token', parsed.token)
      .single()

    if (tokenErr || !tokenRow) {
      return NextResponse.json({ error: 'Invalid or missing token' }, { status: 400 })
    }

    const expiresAt = new Date((tokenRow as any).expires_at)
    if (Number.isFinite(expiresAt.getTime()) && expiresAt.getTime() < Date.now()) {
      return NextResponse.json({ error: 'Token expired' }, { status: 400 })
    }

    const appointmentId = (tokenRow as any).appointment_id as string

    // Update appointment via service layer
    try {
      await appointmentService.updateAppointment(appointmentId, {
        datetime: parsed.data.newDateTime,
        reason: parsed.data.reason ?? undefined,
      })
    } catch (err: any) {
      return NextResponse.json({ error: err?.message || 'Update failed' }, { status: 400 })
    }

    // Prevent token reuse
    await supabase.from('reschedule_tokens').delete().eq('token', parsed.token)

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    const message = e?.message || 'Invalid request'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}