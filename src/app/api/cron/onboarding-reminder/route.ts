import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email/client'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function hoursRemaining(expiresAtIso: string): number {
  const expires = new Date(expiresAtIso).getTime()
  const now = Date.now()
  const diffMs = Math.max(0, expires - now)
  return Math.floor(diffMs / (60 * 60 * 1000))
}

export async function GET() {
  try {
    const supabase = createSupabaseServerClient()

    // Find dentists who paid but haven't completed onboarding yet
    const { data: dentists, error } = await supabase
      .from('dentists')
      .select('id, email, contact_name, current_status, onboarding_tokens(token, expires_at)')
      .eq('current_status', 'payment_received')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    const list = Array.isArray(dentists) ? dentists : []
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    let sent = 0

    for (const d of list) {
      const contactName = (d as any)?.contact_name
      const email = (d as any)?.email as string | undefined
      const tokens = ((d as any)?.onboarding_tokens || []) as Array<{ token: string; expires_at: string }>

      // Skip if already completed or missing email
      if (contactName || !email) continue

      // Find a valid (non-expired) token, prefer the one that expires last
      const now = Date.now()
      const validTokens = tokens.filter(t => new Date(t.expires_at).getTime() > now)
      if (validTokens.length === 0) continue

      validTokens.sort((a, b) => new Date(b.expires_at).getTime() - new Date(a.expires_at).getTime())
      const token = validTokens[0]

      const url = `${baseUrl}/onboarding/${token.token}`
      const remainingHours = hoursRemaining(token.expires_at)

      const html = `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
          <h1 style="font-size:20px;margin:0 0 12px">Complete Your Setup</h1>
          <p style="margin:0 0 12px">You're almost done — please complete your 2-minute onboarding to launch your ads today.</p>
          <p style="margin:12px 0"><a href="${url}" style="background:#0ea5e9;color:#fff;text-decoration:none;padding:10px 14px;border-radius:6px;display:inline-block">Complete Setup Now</a></p>
          <p style="margin:12px 0;color:#444">Your link expires in <strong>${remainingHours}</strong> hour${remainingHours === 1 ? '' : 's'}.</p>
          <p style="margin:16px 0;color:#666">Need help? Just reply to this email.</p>
        </div>
      `

      try {
        await sendEmail({ to: email, subject: '⏰ Reminder: Complete Your Setup', html })
        sent += 1
      } catch (mailErr: any) {
        // Log and continue
        console.error('[onboarding-reminder] Email send error:', mailErr?.message || mailErr)
      }
    }

    return NextResponse.json({ ok: true, remindersSent: sent })
  } catch (err: any) {
    const message = err?.message || 'Unexpected error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}