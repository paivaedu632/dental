"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Play, ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy */}
          <div className="space-y-8">
            {/* Social Proof Badge */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <Star className="w-3 h-3 mr-1 fill-current" />
                #1 Rated Dental Software
              </Badge>
              <span className="text-sm text-gray-600">2,500+ practices trust us</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Stop Losing Money on
                <span className="text-blue-600 block">Complicated Software</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                DentalFlow helps dental practices <strong className="text-gray-900">increase revenue by 40%</strong> with 
                simple, powerful practice management that actually works.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-3">
              {[
                'Set up in 15 minutes (not 3 months)',
                'Reduce no-shows by 60% with smart reminders',
                'Automate billing and get paid 2x faster',
                'Works on any device, anywhere'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Form */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Start your free 14-day trial (no credit card required)
                  </label>
                  <div className="flex gap-3">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 h-12 text-base"
                    />
                    <Button 
                      type="submit" 
                      size="lg"
                      disabled={isSubmitting}
                      className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      {isSubmitting ? 'Starting...' : 'Start Free Trial'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>✓ Free 14-day trial</span>
                  <span>✓ No setup fees</span>
                  <span>✓ Cancel anytime</span>
                </div>
              </form>
            </div>

            {/* Video CTA */}
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 p-0"
                onClick={() => window.open('https://www.youtube.com/watch?v=demo', '_blank')}
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <span className="font-medium">Watch 2-min demo</span>
              </Button>
              <span className="text-sm text-gray-500">See how it works</span>
            </div>
          </div>

          {/* Right Column - Hero Image/Demo */}
          <div className="relative">
            {/* Main Dashboard Image */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="ml-4 text-sm text-gray-600">dentalflow.com/dashboard</span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Mock Dashboard Content */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                  <Badge className="bg-green-100 text-green-800">12 appointments</Badge>
                </div>
                
                <div className="space-y-3">
                  {[
                    { time: '9:00 AM', patient: 'Sarah Johnson', type: 'Cleaning', status: 'confirmed' },
                    { time: '10:30 AM', patient: 'Mike Chen', type: 'Consultation', status: 'confirmed' },
                    { time: '2:00 PM', patient: 'Emma Davis', type: 'Filling', status: 'pending' },
                  ].map((apt, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <div className="font-medium text-gray-900">{apt.time}</div>
                          <div className="text-sm text-gray-600">{apt.patient}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{apt.type}</div>
                        <Badge 
                          variant={apt.status === 'confirmed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {apt.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">+40%</div>
                <div className="text-sm text-gray-600">Revenue Increase</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">60%</div>
                <div className="text-sm text-gray-600">Fewer No-Shows</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
