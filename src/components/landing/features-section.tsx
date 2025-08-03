"use client"

import React, { useState } from 'react'
import { Calendar, CreditCard, MessageSquare, BarChart3, Shield, Smartphone, CheckCircle, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState(0)

  const features = [
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      subtitle: 'Never double-book again',
      description: 'Intelligent appointment scheduling that prevents conflicts, optimizes your calendar, and sends automatic reminders to reduce no-shows by 60%.',
      benefits: [
        'Automatic conflict detection',
        'Smart reminder system',
        'Online booking portal',
        'Waitlist management'
      ],
      image: '/images/features/scheduling.png'
    },
    {
      icon: CreditCard,
      title: 'Automated Billing',
      subtitle: 'Get paid 2x faster',
      description: 'Streamlined billing that automatically processes payments, sends invoices, and handles insurance claims. No more chasing payments.',
      benefits: [
        'Automatic payment processing',
        'Insurance claim automation',
        'Payment plan management',
        'Financial reporting'
      ],
      image: '/images/features/billing.png'
    },
    {
      icon: MessageSquare,
      title: 'Patient Communication',
      subtitle: 'Keep patients engaged',
      description: 'Two-way messaging, appointment confirmations, and treatment reminders that keep your patients informed and engaged.',
      benefits: [
        'SMS & email reminders',
        'Two-way messaging',
        'Treatment follow-ups',
        'Review requests'
      ],
      image: '/images/features/communication.png'
    },
    {
      icon: BarChart3,
      title: 'Practice Analytics',
      subtitle: 'Data-driven decisions',
      description: 'Comprehensive reporting and analytics that show you exactly how your practice is performing and where to improve.',
      benefits: [
        'Revenue tracking',
        'Patient analytics',
        'Staff performance',
        'Custom reports'
      ],
      image: '/images/features/analytics.png'
    }
  ]

  const additionalFeatures = [
    { icon: Shield, title: 'HIPAA Compliant', description: 'Bank-level security for patient data' },
    { icon: Smartphone, title: 'Mobile Ready', description: 'Works perfectly on any device' },
    { icon: Calendar, title: 'Easy Integration', description: 'Connects with your existing tools' },
    { icon: MessageSquare, title: '24/7 Support', description: 'Real humans when you need help' }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            Everything You Need
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            One Platform, Complete Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop juggling multiple tools. DentalFlow gives you everything you need 
            to run a modern dental practice in one simple platform.
          </p>
        </div>

        {/* Main Features Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-16">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`flex-1 min-w-0 px-6 py-4 text-center border-b-2 transition-colors duration-200 ${
                      activeTab === index
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-semibold text-sm">{feature.title}</div>
                    <div className="text-xs opacity-75">{feature.subtitle}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {features[activeTab].title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {features[activeTab].description}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-3">
                  {features[activeTab].benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.open('/signup', '_blank')}
                  >
                    Start Free Trial
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => window.open('/demo', '_blank')}
                  >
                    <Play className="w-4 h-4" />
                    Watch Demo
                  </Button>
                </div>
              </div>

              {/* Right Column - Feature Image/Demo */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                  {/* Mock Feature Interface */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="ml-4 text-sm text-gray-600">
                          {features[activeTab].title}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      {/* Dynamic content based on active tab */}
                      {activeTab === 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">Today's Schedule</h4>
                          {[
                            { time: '9:00 AM', patient: 'Sarah Johnson', type: 'Cleaning' },
                            { time: '10:30 AM', patient: 'Mike Chen', type: 'Consultation' },
                            { time: '2:00 PM', patient: 'Emma Davis', type: 'Filling' },
                          ].map((apt, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                              <div>
                                <div className="font-medium">{apt.time}</div>
                                <div className="text-sm text-gray-600">{apt.patient}</div>
                              </div>
                              <Badge variant="secondary">{apt.type}</Badge>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === 1 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">Payment Overview</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-50 p-4 rounded-lg text-center">
                              <div className="text-2xl font-bold text-green-600">$12,450</div>
                              <div className="text-sm text-gray-600">This Month</div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                              <div className="text-2xl font-bold text-blue-600">$2,100</div>
                              <div className="text-sm text-gray-600">Pending</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 2 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">Recent Messages</h4>
                          {[
                            { patient: 'John Smith', message: 'Confirmed for tomorrow', time: '2m ago' },
                            { patient: 'Lisa Brown', message: 'Need to reschedule', time: '1h ago' },
                          ].map((msg, i) => (
                            <div key={i} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium text-sm">{msg.patient}</div>
                                  <div className="text-sm text-gray-600">{msg.message}</div>
                                </div>
                                <div className="text-xs text-gray-500">{msg.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === 3 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">Practice Metrics</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Revenue Growth</span>
                              <span className="font-semibold text-green-600">+24%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Patient Satisfaction</span>
                              <span className="font-semibold text-blue-600">4.8/5</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">No-Show Rate</span>
                              <span className="font-semibold text-purple-600">3.2%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
