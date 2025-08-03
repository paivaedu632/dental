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
  title: 'DentalFlow - Get 10 Guaranteed Appointments | High-Converting Version',
  description: 'We invest $300 in TikTok ads to guarantee your first 10 appointments. No setup fees ever. Join 2,500+ practices growing with DentalFlow.',
  keywords: 'guaranteed dental appointments, dental practice management, TikTok ads for dentists, no setup fees',
}

export default function LandingV2() {
  return (
    <div className="min-h-screen bg-white">
      {/* A/B Test Identifier - Development Only */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-green-100 text-green-800 text-center py-2 text-sm font-medium">
          🧪 A/B Test: High-Converting Version (Guaranteed Appointments Focus)
        </div>
      )}
      
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
