import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckCircle, Star, ArrowRight, Crown, Shield, Zap, Award, TrendingUp, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'DentalFlow Premium - Elite Practice Management | Premium Version',
  description: 'Premium practice management for elite dental practices. Advanced analytics, white-glove service, and guaranteed ROI. Starting at $297/month.',
  keywords: 'premium dental software, elite practice management, advanced analytics, white glove service',
}

export default function LandingPremium() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* A/B Test Identifier - Development Only */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-purple-100 text-purple-800 text-center py-2 text-sm font-medium">
          🧪 A/B Test: Premium Version (Elite/Luxury Focus)
        </div>
      )}

      {/* Premium Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg text-white">DentalFlow Premium</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button className="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-black font-semibold" asChild>
                <Link href="/signup">Get Premium Access</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Hero */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gold-400/20 to-transparent rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6 bg-gold-100 text-gold-800 border-gold-200">
            <Crown className="w-3 h-3 mr-1" />
            Elite Practice Management
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            For Practices That Demand
            <span className="block bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Excellence
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Premium practice management with white-glove service, advanced analytics, 
            and guaranteed ROI. Built for practices generating $2M+ annually.
          </p>

          {/* Premium Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400 mb-2">150%</div>
              <div className="text-gray-300 text-sm">Average ROI Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400 mb-2">$500K+</div>
              <div className="text-gray-300 text-sm">Avg Revenue Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-400 mb-2">24/7</div>
              <div className="text-gray-300 text-sm">Dedicated Support</div>
            </div>
          </div>

          {/* Premium CTA */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email for premium access"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-black font-semibold">
                Get Premium
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              White-glove onboarding • Dedicated success manager • ROI guarantee
            </p>
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Premium Features
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Advanced capabilities designed for high-performing practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: 'Advanced Analytics',
                description: 'AI-powered insights with predictive modeling and custom dashboards.',
                premium: true
              },
              {
                icon: Shield,
                title: 'White-Glove Service',
                description: 'Dedicated success manager and priority support with 1-hour response.',
                premium: true
              },
              {
                icon: Users,
                title: 'Team Training',
                description: 'Comprehensive staff training and ongoing education programs.',
                premium: true
              },
              {
                icon: Zap,
                title: 'Custom Integrations',
                description: 'Bespoke integrations with your existing systems and workflows.',
                premium: true
              },
              {
                icon: Award,
                title: 'ROI Guarantee',
                description: '150% ROI guarantee or we refund the difference. No questions asked.',
                premium: true
              },
              {
                icon: Crown,
                title: 'Concierge Setup',
                description: 'Complete setup and migration handled by our expert team.',
                premium: true
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="bg-white/5 border-white/10 text-white">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {feature.title}
                      {feature.premium && (
                        <Badge className="bg-gold-100 text-gold-800 text-xs">Premium</Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Premium Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Premium Investment
          </h2>
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
            For practices serious about maximizing their potential.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Premium Plan */}
            <Card className="bg-gradient-to-br from-gold-400/10 to-gold-600/10 border-gold-400/20 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-gold-400 to-gold-600 text-black font-semibold">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Premium</CardTitle>
                <CardDescription className="text-gray-300">For growing practices</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-gold-400 mb-4">
                  $297<span className="text-lg text-gray-400">/month</span>
                </div>
                <div className="text-gray-300 mb-6">
                  + $75 per appointment after 20 included
                </div>
                
                <div className="space-y-3 mb-8 text-left">
                  {[
                    'First 20 appointments included',
                    'Advanced analytics & reporting',
                    'Dedicated success manager',
                    'Priority support (1-hour response)',
                    'Custom integrations',
                    'Team training included'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-gold-400" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-black font-semibold" size="lg">
                  Start Premium Trial
                </Button>
              </CardContent>
            </Card>

            {/* Elite Plan */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Elite</CardTitle>
                <CardDescription className="text-gray-300">For enterprise practices</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-white mb-4">
                  Custom
                </div>
                <div className="text-gray-300 mb-6">
                  Tailored to your practice needs
                </div>
                
                <div className="space-y-3 mb-8 text-left">
                  {[
                    'Unlimited appointments',
                    'Custom AI analytics',
                    'White-glove concierge service',
                    'Instant support (15-min response)',
                    'Bespoke integrations',
                    'On-site training & setup'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-white" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-white text-black hover:bg-gray-100 font-semibold" size="lg">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-16 bg-gradient-to-r from-gold-400/10 to-gold-600/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Elevate Your Practice?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join elite practices using DentalFlow Premium to achieve unprecedented growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-black font-semibold">
              Start Premium Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 DentalFlow Premium. Elite practice management for exceptional practices.</p>
        </div>
      </footer>
    </div>
  )
}
