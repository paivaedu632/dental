import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckCircle, Star, ArrowRight, Calendar, CreditCard, MessageSquare, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'DentalFlow - Simple Practice Management Software | Minimal Version',
  description: 'Clean, simple practice management for dental professionals. $97/month + $50 per appointment. No complexity, just results.',
  keywords: 'simple dental software, practice management, clean interface, dental appointments',
}

export default function LandingMinimal() {
  return (
    <div className="min-h-screen bg-white">
      {/* A/B Test Identifier - Development Only */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-blue-100 text-blue-800 text-center py-2 text-sm font-medium">
          🧪 A/B Test: Minimal Version (Simplicity Focus)
        </div>
      )}

      {/* Simple Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DF</span>
              </div>
              <span className="font-semibold text-lg">DentalFlow</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Trusted by 2,500+ Practices
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Simple Practice Management
            <span className="block text-blue-600">That Just Works</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Clean, intuitive software for dental practices. 
            No complexity, no confusion, just the tools you need to grow.
          </p>

          {/* Email Capture */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              14-day free trial • No credit card required
            </p>
          </div>

          {/* Simple Stats */}
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <span>✓ 15-minute setup</span>
            <span>✓ No contracts</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Four core features that handle 90% of your practice management needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Calendar,
                title: 'Smart Scheduling',
                description: 'Appointment booking that prevents conflicts and reduces no-shows.'
              },
              {
                icon: CreditCard,
                title: 'Simple Billing',
                description: 'Automated invoicing and payment processing that just works.'
              },
              {
                icon: MessageSquare,
                title: 'Patient Messages',
                description: 'Two-way communication to keep patients informed and engaged.'
              },
              {
                icon: BarChart3,
                title: 'Basic Reports',
                description: 'Essential metrics to understand your practice performance.'
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Simple Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Simple, usage-based pricing. Pay for what you use, nothing more.
          </p>

          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Usage-Based Plan</CardTitle>
              <CardDescription>Perfect for practices of any size</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">
                $97<span className="text-lg text-gray-600">/month</span>
              </div>
              <div className="text-gray-600 mb-6">
                + $50 per appointment after your first 10
              </div>
              
              <div className="space-y-3 mb-8 text-left">
                {[
                  'First 10 appointments included',
                  'All features included',
                  'Unlimited staff accounts',
                  '24/7 support',
                  'No setup fees',
                  'Cancel anytime'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                Start Free Trial
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Simplify Your Practice?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join 2,500+ dental practices using DentalFlow to streamline their operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 DentalFlow. Simple practice management software.</p>
        </div>
      </footer>
    </div>
  )
}
