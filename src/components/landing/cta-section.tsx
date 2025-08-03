"use client"

import React, { useState } from 'react'
import { ArrowRight, CheckCircle, Clock, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function CTASection() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Open in new tab for better conversion
    window.open('/signup?email=' + encodeURIComponent(email), '_blank')
    setIsSubmitting(false)
  }

  const benefits = [
    {
      icon: Clock,
      title: '15-Minute Setup',
      description: 'Get started today, not in 3 months'
    },
    {
      icon: Shield,
      title: 'Risk-Free Trial',
      description: '14 days free, no credit card required'
    },
    {
      icon: Zap,
      title: 'Immediate Results',
      description: 'See improvements in your first week'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl -translate-y-48 translate-x-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-48 -translate-x-48" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to Transform
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Your Practice?
              </span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Join 2,500+ dental practices that increased revenue by 40% with DentalFlow. 
              Start your free trial today and see the difference in 30 days.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <Icon className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-blue-200">{benefit.description}</p>
                </div>
              )
            })}
          </div>

          {/* CTA Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="space-y-4">
                <div>
                  <label htmlFor="cta-email" className="block text-sm font-medium text-blue-100 mb-2">
                    Start your free 14-day trial now
                  </label>
                  <div className="flex gap-3">
                    <Input
                      id="cta-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 h-12 bg-white text-gray-900 border-0 text-base"
                    />
                    <Button 
                      type="submit" 
                      size="lg"
                      disabled={isSubmitting}
                      className="h-12 px-8 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold border-0"
                    >
                      {isSubmitting ? 'Starting...' : 'Start Free Trial'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-6 text-xs text-blue-200">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Free 14-day trial</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Social Proof */}
          <div className="text-center mb-8">
            <p className="text-blue-200 mb-4">
              Trusted by dental practices across the country
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-blue-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>2,500+ practices</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>99.9% uptime</span>
              </div>
            </div>
          </div>

          {/* Alternative CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="outline"
              size="lg"
              className="bg-transparent border-white/30 text-white hover:bg-white/10"
              onClick={() => window.open('/demo', '_blank')}
            >
              Watch 2-Minute Demo
            </Button>
            <Button 
              variant="ghost"
              size="lg"
              className="text-blue-200 hover:text-white hover:bg-white/10"
              onClick={() => window.open('tel:+15551234567')}
            >
              Call Us: (555) 123-4567
            </Button>
          </div>

          {/* Guarantee */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-3">
                🎯 Our 30-Day Growth Guarantee
              </h3>
              <p className="text-blue-200 leading-relaxed">
                If you don't see measurable improvements in your practice efficiency and patient satisfaction 
                within 30 days, we'll refund your setup fee and help you transition back to your old system. 
                That's how confident we are in DentalFlow.
              </p>
            </div>
          </div>

          {/* Urgency Element */}
          <div className="mt-8">
            <p className="text-yellow-400 font-semibold">
              ⚡ Limited Time: Get 3 months FREE when you start today
            </p>
            <p className="text-blue-300 text-sm mt-1">
              Offer expires in 24 hours • Save $291 • No setup fees
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
