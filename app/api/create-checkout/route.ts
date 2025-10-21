import { NextRequest, NextResponse } from "next/server"
import { createCheckoutSession } from "@/lib/stripe/client"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))

    // Optional dynamic inputs for flexible use across flows
    const amountCents: number = typeof body?.amountCents === 'number' && body.amountCents > 0
      ? body.amountCents
      : 50000 // default: $500.00 USD for trial signup

    const description: string = typeof body?.description === 'string' && body.description.length > 0
      ? body.description
      : "DentalFlow Trial - First 10 Patients"

    const metadata: Record<string, string | number | boolean | null> = {
      // defaults for trial signups
      type: 'trial_signup',
      email: typeof body?.email === 'string' ? body.email : null,
      name: typeof body?.name === 'string' ? body.name : null,
      ...((body?.metadata && typeof body.metadata === 'object') ? body.metadata : {}),
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    // Allow callers to override success/cancel URLs if needed
    const successUrl = typeof body?.successUrl === 'string' && body.successUrl.length > 0
      ? body.successUrl
      : `${baseUrl}/onboarding/start`
    const cancelUrl = typeof body?.cancelUrl === 'string' && body.cancelUrl.length > 0
      ? body.cancelUrl
      : `${baseUrl}/pricing`

    const session = await createCheckoutSession(
      amountCents,
      description,
      metadata,
      successUrl,
      cancelUrl
    )

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (error) {
    console.error("[create-checkout] error", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}