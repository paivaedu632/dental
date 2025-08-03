import React from 'react'
import { Metadata } from 'next'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { StatsSection } from '@/components/landing/stats-section'
import { CTASection } from '@/components/landing/cta-section'
import { FAQSection } from '@/components/landing/faq-section'
import { TrustSection } from '@/components/landing/trust-section'
import { UrgencyBanner } from '@/components/landing/urgency-banner'

export const metadata: Metadata = {
  title: 'DentalFlow - Modern Practice Management That Actually Works',
  description: 'Stop losing money on complicated software. DentalFlow helps dental practices increase revenue by 40% with simple, powerful practice management. Try free for 14 days.',
  keywords: 'dental practice management, dental software, appointment scheduling, billing software, dental practice growth',
  openGraph: {
    title: 'DentalFlow - Increase Your Practice Revenue by 40%',
    description: 'The only dental practice management software that pays for itself. Join 2,500+ practices already growing with DentalFlow.',
    images: ['/images/og-landing.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DentalFlow - Modern Practice Management',
    description: 'Stop losing money on complicated software. Try DentalFlow free for 14 days.',
    images: ['/images/twitter-card.jpg'],
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Urgency Banner */}
      <UrgencyBanner />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Trust Indicators */}
      <TrustSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Pricing Section */}
      <PricingSection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Final CTA */}
      <CTASection />
    </div>
  )
}
