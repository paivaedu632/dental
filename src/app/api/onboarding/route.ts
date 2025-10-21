import { NextResponse } from 'next/server'
import { z } from 'zod'
import { onboardingFormSchema } from '@/lib/validations'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const BodySchema = z.object({
  token: z.string().min(8),
  data: onboardingFormSchema,
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = BodySchema.parse(json)

    // Validate token exists and not expired
    const supabase = createSupabaseServerClient()
    const { data: tokenRow, error: tokenErr } = await supabase
      .from('onboarding_tokens')
      .select('dentist_id, expires_at')
      .eq('token', parsed.token)
      .single()

    if (tokenErr || !tokenRow) {
      return NextResponse.json({ error: 'Invalid or missing token' }, { status: 400 })
    }

    const expiresAt = new Date((tokenRow as any).expires_at)
    if (Number.isFinite(expiresAt.getTime()) && expiresAt.getTime() < Date.now()) {
      return NextResponse.json({ error: 'Token expired' }, { status: 400 })
    }

    // Mark token as used by deleting it to prevent reuse
    await supabase.from('onboarding_tokens').delete().eq('token', parsed.token)

    // Future: persist parsed.data into dentist profile/settings as needed
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    const message = e?.message || 'Invalid request'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}