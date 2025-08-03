"use client"

import React, { useEffect, useState } from 'react'
import { TrendingUp, DollarSign, Clock, Users } from 'lucide-react'

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('stats-section')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    {
      icon: DollarSign,
      value: 40,
      suffix: '%',
      label: 'Average Revenue Increase',
      description: 'Practices see 40% revenue growth within 6 months',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Clock,
      value: 60,
      suffix: '%',
      label: 'Reduction in No-Shows',
      description: 'Smart reminders cut no-shows by more than half',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: TrendingUp,
      value: 2,
      suffix: 'x',
      label: 'Faster Payments',
      description: 'Automated billing gets you paid twice as fast',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Users,
      value: 15,
      suffix: ' min',
      label: 'Setup Time',
      description: 'Get started in minutes, not months',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  return (
    <section id="stats-section" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            The Results Speak for Themselves
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what happens when dental practices 
            switch to DentalFlow.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div 
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>

                  {/* Animated Number */}
                  <div className="mb-3">
                    <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-1">
                      <AnimatedNumber 
                        value={stat.value} 
                        suffix={stat.suffix}
                        isVisible={isVisible}
                        delay={index * 200}
                      />
                    </div>
                    <div className="text-lg font-semibold text-gray-700">
                      {stat.label}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to see these results in your practice?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join 2,500+ practices already growing with DentalFlow. 
              Start your free trial today and see the difference in 30 days.
            </p>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              onClick={() => window.open('/signup', '_blank')}
            >
              Start Free 14-Day Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Animated Number Component
interface AnimatedNumberProps {
  value: number
  suffix: string
  isVisible: boolean
  delay: number
}

function AnimatedNumber({ value, suffix, isVisible, delay }: AnimatedNumberProps) {
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      const duration = 2000 // 2 seconds
      const steps = 60
      const increment = value / steps
      let current = 0

      const counter = setInterval(() => {
        current += increment
        if (current >= value) {
          setCurrentValue(value)
          clearInterval(counter)
        } else {
          setCurrentValue(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(counter)
    }, delay)

    return () => clearTimeout(timer)
  }, [isVisible, value, delay])

  return (
    <span>
      {currentValue}{suffix}
    </span>
  )
}
