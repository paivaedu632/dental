import React from 'react'
import { Star, Users, Award, Shield } from 'lucide-react'

export function TrustSection() {
  const logos = [
    { name: 'American Dental Association', src: '/images/logos/ada.png' },
    { name: 'Dental Economics', src: '/images/logos/dental-economics.png' },
    { name: 'Dentistry Today', src: '/images/logos/dentistry-today.png' },
    { name: 'Modern Dentistry', src: '/images/logos/modern-dentistry.png' },
    { name: 'Practice Management', src: '/images/logos/practice-mgmt.png' },
  ]

  const trustIndicators = [
    {
      icon: Star,
      value: '4.9/5',
      label: 'Average Rating',
      subtext: 'From 1,200+ reviews'
    },
    {
      icon: Users,
      value: '2,500+',
      label: 'Practices',
      subtext: 'Trust DentalFlow'
    },
    {
      icon: Award,
      value: '#1',
      label: 'Rated Software',
      subtext: 'Dental Economics 2024'
    },
    {
      icon: Shield,
      value: '99.9%',
      label: 'Uptime',
      subtext: 'HIPAA Compliant'
    }
  ]

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustIndicators.map((indicator, index) => {
            const Icon = indicator.icon
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {indicator.value}
                </div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  {indicator.label}
                </div>
                <div className="text-xs text-gray-500">
                  {indicator.subtext}
                </div>
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex-1 h-px bg-gray-200"></div>
          <div className="px-4 text-sm text-gray-500 font-medium">
            Trusted by leading dental organizations
          </div>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center h-16 w-full opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              {/* Placeholder for logos - in production, use actual logo images */}
              <div className="bg-gray-300 rounded-lg h-12 w-32 flex items-center justify-center">
                <span className="text-xs text-gray-600 font-medium text-center px-2">
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Security Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="font-medium">HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="font-medium">SOC 2 Type II</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-5 h-5 text-purple-600" />
            <span className="font-medium">256-bit SSL</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-5 h-5 text-red-600" />
            <span className="font-medium">PCI DSS Level 1</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Join practices that started today
            </h3>
            <p className="text-sm text-gray-600">
              Real practices that signed up in the last 24 hours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Bright Smiles Dental', location: 'Austin, TX', time: '2 hours ago' },
              { name: 'Family Dental Care', location: 'Denver, CO', time: '4 hours ago' },
              { name: 'Modern Dentistry', location: 'Seattle, WA', time: '6 hours ago' },
            ].map((practice, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">
                    {practice.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {practice.location} • {practice.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
