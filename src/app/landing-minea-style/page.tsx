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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* A/B Test Identifier - Development Only */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-purple-100 text-purple-800 text-center py-2 text-sm font-medium">
          🧪 A/B Test: Minea-Style Version (Proven Conversion Design)
        </div>
      )}

      {/* Header - Minea Style */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DF</span>
              </div>
              <span className="font-bold text-xl">DentalFlow</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 font-semibold" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Minea Style */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/30 to-transparent rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Badge */}
          <Badge className="mb-6 bg-purple-100 text-purple-800 border-purple-200 text-sm px-4 py-2">
            <Star className="w-4 h-4 mr-2 fill-current" />
            #1 Practice Management Tool
          </Badge>
          
          {/* Main Headline - Minea Style */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The ultimate
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Practice Management
            </span>
            tool
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Discover how 2,500+ dental practices are increasing revenue by 40% with 
            smart scheduling, automated billing, and patient communication tools.
          </p>

          {/* CTA Section - Minea Style */}
          <div className="max-w-lg mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                />
              </div>
              <Button 
                size="lg" 
                className="h-14 px-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold text-lg"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Setup in 15 minutes</span>
              </div>
            </div>
          </div>

          {/* Video/Demo CTA - Minea Style */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 text-white hover:bg-white/10 text-lg px-6 py-3"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <span>Watch 2-minute demo</span>
            </Button>
          </div>

          {/* Stats Row - Minea Style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '2,500+', label: 'Dental Practices' },
              { number: '40%', label: 'Revenue Increase' },
              { number: '60%', label: 'Fewer No-Shows' },
              { number: '15 min', label: 'Setup Time' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Minea Style Grid */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything you need to
              <span className="block text-purple-400">grow your practice</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful tools designed specifically for dental practices. 
              No complexity, just results.
            </p>
          </div>

          {/* Feature Grid - Minea Style */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Calendar,
                title: 'Smart Scheduling',
                description: 'AI-powered appointment booking that prevents conflicts and reduces no-shows by 60%.',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: CreditCard,
                title: 'Automated Billing',
                description: 'Streamlined payment processing that gets you paid 2x faster with zero manual work.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: MessageSquare,
                title: 'Patient Communication',
                description: 'Two-way messaging system that keeps patients engaged and coming back.',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: BarChart3,
                title: 'Practice Analytics',
                description: 'Real-time insights and reporting to optimize your practice performance.',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Social Proof Section - Minea Style */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by dental practices
              <span className="block text-purple-400">worldwide</span>
            </h2>
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
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {item.stat}
                  </div>
                  <div className="text-xl font-semibold text-purple-400 mb-2">
                    {item.label}
                  </div>
                  <div className="text-gray-300">
                    {item.description}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Minea Style */}
      <section className="py-20 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to transform
              <span className="block text-purple-400">your practice?</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join 2,500+ dental practices already growing with DentalFlow. 
              Start your free trial today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="h-16 px-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold text-xl"
              >
                Start Free Trial
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-16 px-12 border-white/20 text-white hover:bg-white/10 font-bold text-xl"
              >
                Schedule Demo
              </Button>
            </div>

            {/* Final Trust Indicators */}
            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Setup in 15 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>HIPAA compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>No contracts</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
