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

      {/* Hero Section - Video + Content Layout */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Video + Content Layout */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                          How We Get You 10 Dental Appointments for Free
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

              {/* Right Column - Content */}
              <div className="space-y-6">
                {/* Badge */}
                <Badge className="bg-gray-100 text-gray-800 border-gray-200 text-sm px-4 py-2">
                  <Star className="w-4 h-4 mr-2 fill-current" />
                  #1 Practice Management Tool
                </Badge>

                {/* Main Headline */}
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Get 10 Dental Appointments
                  <span className="block text-black">for Free</span>
                </h1>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    We invest <strong className="text-gray-900">$300 in targeted ads</strong> to guarantee your first 10 appointments
                    at absolutely no cost to you. This practice management tool has been
                    carefully designed to not just manage your practice, but to actively grow it
                    from day one with real patients booking real appointments.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    DentalFlow stands out because we put our money where our mouth is.
                    Instead of charging setup fees like other software companies, we
                    <strong className="text-gray-900"> invest in your success</strong> by running professional ad campaigns
                    that bring qualified patients directly to your practice.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    The result? You get a <strong className="text-gray-900">powerful practice management system</strong> plus
                    10 guaranteed appointments to start generating revenue immediately.
                    This combination of software and marketing makes DentalFlow the
                    <strong className="text-gray-900"> complete growth solution</strong> for dental practices.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Button
                    size="lg"
                    className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-4 text-lg rounded-lg"
                  >
                    Get My 10 Free Appointments
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center gap-6 text-sm text-gray-600 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>$300 ad spend included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>No setup fees ever</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Appointments start day 1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof Section - Bottom of Hero */}
            <div className="mt-20 pt-16 border-t border-gray-200">
              <div className="text-center mb-12">
                <p className="text-gray-600 text-lg">
                  Trusted by dental practices nationwide
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
                {[
                  { number: '2,500+', label: 'Dental Practices' },
                  { number: '40%', label: 'Revenue Increase' },
                  { number: '60%', label: 'Fewer No-Shows' },
                  { number: '15 min', label: 'Setup Time' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Indicators Grid */}
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
                      <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {item.stat}
                      </div>
                      <div className="text-lg font-semibold text-gray-700 mb-2">
                        {item.label}
                      </div>
                      <div className="text-gray-600 text-sm">
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
              Ready to get your
              <span className="block text-white">10 free appointments?</span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join 2,500+ dental practices already growing with DentalFlow.
              We'll invest $300 in ads to get you started.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="h-16 px-12 bg-white hover:bg-gray-100 text-black font-bold text-xl"
              >
                Get My 10 Free Appointments
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
                <span>$300 ad spend included</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>HIPAA compliant</span>
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
