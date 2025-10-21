import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
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
      dentistId,
      token,
    } = body

    // Dev bypass: simulate success locally without Supabase/Stripe
    if (process.env.NODE_ENV === 'development' && typeof token === 'string' && token.startsWith('dev')) {
      return NextResponse.json({ ok: true })
    }

    const supabase = await createClient()

    const { data: tokenRow } = await supabase
      .from('onboarding_tokens')
      .select('*, dentists(*)')
      .eq('token', token)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (!tokenRow || tokenRow.dentist_id !== dentistId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
    }

    const { error: updateError } = await supabase
      .from('dentists')
      .update({
        business_name: businessName,
        contact_name: contactName,
        phone,
        address,
        city,
        state,
        zip,
        services,
        available_days: availableDays,
        hours_start: hoursStart,
        hours_end: hoursEnd,
        max_patients_per_month: maxPatientsPerMonth,
        onboarding_completed_at: new Date().toISOString(),
      })
      .eq('id', dentistId)

    if (updateError) {
      return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    }

    await supabase
      .from('onboarding_tokens')
      .update({ used: true })
      .eq('token', token)

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}