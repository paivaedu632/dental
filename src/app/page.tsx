'use client'

import { useState } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleGetStarted() {
    setErrorMessage(null)
    setIsLoading(true)
    try {
      const resp = await fetch('/api/create-checkout', { method: 'POST' })
      if (!resp.ok) throw new Error('Failed to create checkout session')
      const { url } = await resp.json()
      window.location.href = url
    } catch (err) {
      console.error('Checkout error:', err)
      setErrorMessage('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
            We’ll Deliver 10+ New Patients to Your Practice
          </h1>
          <p className="mt-3 text-xl md:text-2xl font-semibold text-black">
            You Only Pay If We Do
          </p>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-6 sm:p-10 border">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-black">THE OFFER:</h2>
              <div className="mt-4 space-y-3 text-base text-black">
                <p>We run patient acquisition campaigns for your practice.</p>
                <p>When patients book, they prepay $79.</p>
                <p>Once we deliver 10+ patients, you pay $150 per patient.</p>
                <p className="font-semibold">If we deliver fewer than 10, you pay us nothing.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-black">YOUR INVESTMENT:</h2>
              <div className="mt-4 space-y-3 text-base text-black">
                <p>~$500 for ad spend (patient prepayments cover most of this)</p>
                <p>$0 to us until we deliver 10+ patients</p>
                <p>Only $150 per patient after that. No monthly fee. Cancel anytime.</p>
                <p className="font-semibold">Most dentists profit $1,000-$3,000+ upfront before paying us anything.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleGetStarted}
                disabled={isLoading}
                className="w-full rounded-md bg-black px-6 py-4 text-white text-lg font-semibold hover:bg-black/80 disabled:opacity-50"
              >
                {isLoading ? 'Loading…' : 'Yes, I Want This'}
              </button>
              {errorMessage && (
                <p className="mt-3 text-center text-sm text-red-600">{errorMessage}</p>
              )}
              <p className="mt-4 text-center text-lg text-black">
                Setup takes 2 minutes.
                <br />
                <span className="font-semibold">Price increases after 50 practices</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}