import { Hero } from "@/components/landing/hero"
import { SocialProof } from "@/components/landing/social-proof"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default function MarketingHomePage() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <FAQ />
      <Footer />
    </main>
  )
}