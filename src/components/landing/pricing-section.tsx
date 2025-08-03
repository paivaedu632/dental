"use client"

import React, { useState } from 'react'
import { Check, X, Zap, Calculator, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function PricingSection() {
  const [appointmentsPerMonth, setAppointmentsPerMonth] = useState(25)

  // Calculate pricing based on usage-based model
  const calculatePricing = (appointments: number) => {
    const adSpendInvestment = 300  // 100% goes to TikTok ads for guaranteed appointments
    const baseFee = 97
    const guaranteedAppointments = 10
    const perAppointmentFee = 50

    const billableAppointments = Math.max(0, appointments - guaranteedAppointments)
    const usageFee = billableAppointments * perAppointmentFee
    const monthlyTotal = baseFee + usageFee

    return {
      adSpendInvestment,
      baseFee,
      usageFee,
      monthlyTotal,
      firstMonthTotal: adSpendInvestment + monthlyTotal,
      billableAppointments,
      guaranteedAppointments: Math.min(appointments, guaranteedAppointments)
    }
  }

  const pricing = calculatePricing(appointmentsPerMonth)

  const competitors = [
    {
      name: 'Dentrix',
      price: '$599/month',
      setupFee: '$2,500',
      limitations: 'Complex setup, expensive training'
    },
    {
      name: 'Eaglesoft',
      price: '$449/month',
      setupFee: '$1,800',
      limitations: 'Outdated interface, poor support'
    },
    {
      name: 'Open Dental',
      price: '$349/month',
      setupFee: '$1,200',
      limitations: 'Limited features, manual processes'
    }
  ]

  const features = [
    { name: 'Smart Scheduling', included: true },
    { name: 'Automated Billing', included: true },
    { name: 'Patient Communication', included: true },
    { name: 'Practice Analytics', included: true },
    { name: 'HIPAA Compliance', included: true },
    { name: 'Mobile App', included: true },
    { name: '24/7 Support', included: true },
    { name: 'Free Updates', included: true },
    { name: 'Data Migration', included: true },
    { name: 'Training & Onboarding', included: true }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
            <Zap className="w-3 h-3 mr-1" />
            Simple, Fair Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            We Guarantee Your First 10 Appointments
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No setup fees ever. We invest $300 in TikTok ads to guarantee your first 10 appointments.
            You only pay our platform fee + additional appointments.
          </p>
        </div>

        {/* Pricing Calculator */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-white shadow-lg border-2 border-blue-200">
            <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calculator className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Pricing Calculator</h3>
              </div>
              <p className="text-gray-600">See exactly what you'll pay based on your practice size</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Calculator */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      How many appointments do you have per month?
                    </label>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={appointmentsPerMonth}
                        onChange={(e) => setAppointmentsPerMonth(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>5</span>
                        <span className="font-semibold text-blue-600 text-lg">
                          {appointmentsPerMonth} appointments
                        </span>
                        <span>100+</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                    <h4 className="font-semibold text-gray-900">Your Monthly Cost:</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Platform Fee</span>
                        <span className="font-semibold">${pricing.baseFee}/month</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          First {pricing.guaranteedAppointments} appointments
                        </span>
                        <span className="font-semibold text-green-600">GUARANTEED</span>
                      </div>

                      {pricing.billableAppointments > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">
                            {pricing.billableAppointments} additional appointments × $50
                          </span>
                          <span className="font-semibold">${pricing.usageFee}</span>
                        </div>
                      )}

                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">Monthly Total</span>
                          <span className="text-2xl font-bold text-blue-600">
                            ${pricing.monthlyTotal}/month
                          </span>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800 text-center">
                        <strong>No setup fees!</strong> We invest $300 in TikTok ads to guarantee your first 10 appointments
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Value Proposition */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      Everything Included:
                    </h4>
                    <div className="space-y-3">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h5 className="font-semibold text-blue-900 mb-3">
                      💡 Why We Guarantee Appointments:
                    </h5>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li>• We invest $300 (100% ad spend) to get you patients</li>
                      <li>• No setup fees or hidden costs</li>
                      <li>• We only succeed when you get appointments</li>
                      <li>• Unlimited staff access included</li>
                      <li>• Cancel anytime, no contracts</li>
                    </ul>
                  </div>

                  <Button 
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.open('/signup', '_blank')}
                  >
                    Start Free 14-Day Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Compare with Traditional Software
            </h3>
            <p className="text-gray-600">
              See how DentalFlow stacks up against expensive legacy systems
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Software
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Monthly Cost
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Setup Fee
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Setup Time
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Support
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* DentalFlow Row */}
                  <tr className="bg-blue-50 border-2 border-blue-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">DF</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">DentalFlow</div>
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Recommended
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-bold text-blue-600">${pricing.monthlyTotal}</div>
                      <div className="text-xs text-gray-500">Usage-based</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-semibold text-green-600">$0</div>
                      <div className="text-xs text-gray-500">No setup fees</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-semibold text-green-600">15 minutes</div>
                      <div className="text-xs text-gray-500">+ 10 guaranteed appointments</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-semibold text-green-600">24/7</div>
                      <div className="text-xs text-gray-500">Real humans</div>
                    </td>
                  </tr>

                  {/* Competitors */}
                  {competitors.map((competitor, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{competitor.name}</div>
                        <div className="text-xs text-gray-500">{competitor.limitations}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-semibold text-gray-900">{competitor.price}</div>
                        <div className="text-xs text-gray-500">Fixed cost</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-semibold text-red-600">{competitor.setupFee}</div>
                        <div className="text-xs text-gray-500">+ training</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-semibold text-red-600">2-6 months</div>
                        <div className="text-xs text-gray-500">Complex</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-semibold text-yellow-600">Business hours</div>
                        <div className="text-xs text-gray-500">Limited</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Save Money and Grow Your Practice?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join 2,500+ practices that switched to DentalFlow and never looked back. 
              Start your free trial today - no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
                onClick={() => window.open('/signup', '_blank')}
              >
                Start Free 14-Day Trial
              </Button>
              <span className="text-blue-200 text-sm">
                ✓ No credit card required ✓ Setup in 15 minutes ✓ Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
