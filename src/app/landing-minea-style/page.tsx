import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Play,
  Calendar,
  CreditCard,
  MessageSquare,
  BarChart3,
  Users,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'DentalFlow - The Ultimate Practice Management Tool | Minea-Style',
  description: 'The ultimate practice management tool for dental professionals. Increase revenue by 40% with smart scheduling, automated billing, and patient communication.',
  keywords: 'ultimate dental software, practice management tool, dental appointments, billing automation',
}

export default function LandingMineaStyle() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* A/B Test Identifier - Development Only */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-gray-100 text-gray-800 text-center py-2 text-sm font-medium">
          🧪 A/B Test: Minea-Style Version (Free Appointments Focus)
        </div>
      )}

      {/* Header - Black & White Style */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DF</span>
              </div>
              <span className="font-bold text-xl text-gray-900">DentalFlow</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-gray-900 hover:bg-gray-100" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button className="bg-black hover:bg-gray-800 text-white font-semibold" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Video + Content Layout with Minea Spacing */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Centered Header Content - Exact Minea Specifications */}
            <div className="text-center mb-20">
              {/* Attention Badge - Minea Style */}
              <div className="bg-black text-white px-6 py-3 rounded-lg inline-block mb-12">
                <span className="text-sm md:text-base font-semibold tracking-wide">
                  ATTENTION DENTISTS & DENTAL PRACTICE OWNERS:
                </span>
              </div>

              {/* Main Headline - Exact Minea Typography: Mobile 48px/58px, Desktop 64px/76px */}
              <h1 className="font-semibold text-gray-900 mb-8 text-5xl md:text-6xl leading-tight md:leading-tight" style={{
                fontSize: 'clamp(48px, 5vw, 64px)',
                lineHeight: 'clamp(58px, 6vw, 76px)',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif'
              }}>
                Free Trial: 10 Guaranteed
                <span className="block text-black">Appointments</span>
              </h1>

              {/* Subheadline - Exact Minea Typography: Mobile 16px/24px, Desktop 18px/28px */}
              <p className="text-gray-600 max-w-4xl mx-auto font-semibold" style={{
                fontSize: 'clamp(16px, 2vw, 18px)',
                lineHeight: 'clamp(24px, 3vw, 28px)',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif'
              }}>
                You only cover the $300 ad cost. No setup fees. No contracts. Just results.
              </p>
            </div>

            {/* Video + Content Layout - Minea Spacing */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Video */}
              <div className="relative">
                <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
                  {/* Video Placeholder with Play Button */}
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/20"></div>

                    {/* Mock Video Thumbnail */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-gray-800/20"></div>

                    {/* Play Button */}
                    <button className="relative z-10 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-200 group">
                      <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform duration-200 fill-current" />
                    </button>

                    {/* Video Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="text-white font-semibold text-sm">
                          Free Trial: How We Get You 10 Guaranteed Appointments
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-300">
                          <span className="flex items-center gap-1">
                            <Play className="w-3 h-3" />
                            Watch later
                          </span>
                          <span className="flex items-center gap-1">
                            <ArrowRight className="w-3 h-3" />
                            Share
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* YouTube-style branding */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                      <span className="text-white text-xs font-medium">Watch on DentalFlow</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Content with Minea Typography */}
              <div className="space-y-8">
                {/* Content - Minea Body Text Specifications */}
                <div className="max-w-none">
                  <p className="text-gray-700 mb-6" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    We invest <strong className="text-gray-900 font-semibold">$300 in targeted ads</strong> to guarantee your first 10 appointments
                    within 28 days. You only pay for the ad spend - no setup fees, no contracts, no hidden costs.
                    This practice management tool has been carefully designed to not just manage your practice,
                    but to actively grow it from day one with real patients booking real appointments.
                  </p>

                  <p className="text-gray-700 mb-6" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    DentalFlow stands out because we put our money where our mouth is.
                    Instead of charging setup fees like other software companies, we
                    <strong className="text-gray-900 font-semibold"> invest in your success</strong> by running professional ad campaigns
                    that bring qualified patients directly to your practice within the first month.
                  </p>

                  <p className="text-gray-700" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    The result? You get a <strong className="text-gray-900 font-semibold">powerful practice management system</strong> plus
                    10 guaranteed appointments within 28 days to start generating revenue immediately.
                    This combination of software and marketing makes DentalFlow the
                    <strong className="text-gray-900 font-semibold"> complete growth solution</strong> for dental practices.
                  </p>
                </div>

                {/* CTA Button - Minea Spacing */}
                <div className="pt-8">
                  <Button
                    size="lg"
                    className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-lg"
                    style={{
                      fontSize: '16px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                    }}
                  >
                    Start My Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                {/* Trust Indicators - Minea Typography */}
                <div className="flex flex-wrap items-center gap-6 pt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600" style={{
                      fontSize: '14px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>Only pay $300 ad cost</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600" style={{
                      fontSize: '14px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>No setup fees ever</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600" style={{
                      fontSize: '14px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>28-day guarantee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof Section - Bottom of Hero with Minea Spacing */}
            <div className="mt-24 pt-20 border-t border-gray-200">
              <div className="text-center mb-16">
                <p className="text-gray-600" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '600'
                }}>
                  Trusted by dental practices nationwide
                </p>
              </div>

              {/* Stats Row - Minea Typography */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
                {[
                  { number: '2,500+', label: 'Dental Practices' },
                  { number: '40%', label: 'Revenue Increase' },
                  { number: '60%', label: 'Fewer No-Shows' },
                  { number: '15 min', label: 'Setup Time' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="font-bold text-gray-900 mb-3" style={{
                      fontSize: '48px',
                      lineHeight: '58px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '700'
                    }}>
                      {stat.number}
                    </div>
                    <div className="text-gray-600" style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Indicators Grid - Minea Typography */}
              <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                {[
                  {
                    icon: Users,
                    stat: '2,500+',
                    label: 'Active Practices',
                    description: 'Dental practices trust DentalFlow'
                  },
                  {
                    icon: TrendingUp,
                    stat: '40%',
                    label: 'Revenue Increase',
                    description: 'Average revenue growth in 6 months'
                  },
                  {
                    icon: Shield,
                    stat: '99.9%',
                    label: 'Uptime',
                    description: 'HIPAA compliant and secure'
                  }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="font-bold text-gray-900 mb-3" style={{
                        fontSize: '24px',
                        lineHeight: '38px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                        fontWeight: '700'
                      }}>
                        {item.stat}
                      </div>
                      <div className="font-semibold text-gray-700 mb-3" style={{
                        fontSize: '18px',
                        lineHeight: '28px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                        fontWeight: '600'
                      }}>
                        {item.label}
                      </div>
                      <div className="text-gray-600" style={{
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                        fontWeight: '500'
                      }}>
                        {item.description}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Black & White Style */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything you need to
              <span className="block text-black">grow your practice</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools designed specifically for dental practices.
              No complexity, just results.
            </p>
          </div>

          {/* Feature Grid - Black & White Style */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Calendar,
                title: 'Smart Scheduling',
                description: 'AI-powered appointment booking that prevents conflicts and reduces no-shows by 60%.'
              },
              {
                icon: CreditCard,
                title: 'Automated Billing',
                description: 'Streamlined payment processing that gets you paid 2x faster with zero manual work.'
              },
              {
                icon: MessageSquare,
                title: 'Patient Communication',
                description: 'Two-way messaging system that keeps patients engaged and coming back.'
              },
              {
                icon: BarChart3,
                title: 'Practice Analytics',
                description: 'Real-time insights and reporting to optimize your practice performance.'
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="bg-white border-gray-200 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>





      {/* Final CTA Section - Black & White Style */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to start your
              <span className="block text-white">free trial?</span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join 2,500+ dental practices already growing with DentalFlow.
              You only cover the $300 ad cost - we handle the rest.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="h-16 px-12 bg-white hover:bg-gray-100 text-black font-bold text-xl"
              >
                Start My Free Trial
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-12 border-white/20 text-white hover:bg-white/10 font-bold text-xl"
              >
                Watch Demo
              </Button>
            </div>

            {/* Final Trust Indicators */}
            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Only pay $300 ad cost</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>28-day guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No setup fees ever</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
