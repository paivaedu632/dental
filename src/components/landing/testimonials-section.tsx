"use client"

import React, { useState, useEffect } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: 'Dr. Sarah Mitchell',
      title: 'Owner, Bright Smiles Dental',
      location: 'Austin, TX',
      image: '/images/testimonials/sarah-mitchell.jpg',
      rating: 5,
      quote: "DentalFlow transformed our practice. We've increased revenue by 45% and cut no-shows in half. The automated billing alone saves us 10 hours per week.",
      results: {
        revenue: '+45%',
        noShows: '-60%',
        timeSaved: '10 hrs/week'
      },
      beforeAfter: {
        before: 'Struggling with manual scheduling and billing',
        after: 'Streamlined operations and 45% revenue growth'
      }
    },
    {
      name: 'Dr. Michael Chen',
      title: 'Practice Manager, Family Dental Care',
      location: 'Denver, CO',
      image: '/images/testimonials/michael-chen.jpg',
      rating: 5,
      quote: "The setup was incredibly easy - we were up and running in 20 minutes. Our patients love the online booking, and we love getting paid faster.",
      results: {
        setup: '20 minutes',
        payments: '2x faster',
        satisfaction: '98%'
      },
      beforeAfter: {
        before: 'Complex software taking months to implement',
        after: 'Simple solution working in 20 minutes'
      }
    },
    {
      name: 'Dr. Emily Rodriguez',
      title: 'Owner, Modern Dentistry',
      location: 'Seattle, WA',
      image: '/images/testimonials/emily-rodriguez.jpg',
      rating: 5,
      quote: "Best investment we've made. The patient communication features have improved our reviews, and the analytics help us make better business decisions.",
      results: {
        reviews: '+4.8 stars',
        efficiency: '+35%',
        decisions: 'Data-driven'
      },
      beforeAfter: {
        before: 'Poor patient communication and no insights',
        after: '4.8-star reviews and clear business metrics'
      }
    }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentTestimonial]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Real Results from Real Practices
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what dental professionals 
            are saying about DentalFlow.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12 border border-blue-100 relative overflow-hidden">
            {/* Background Quote */}
            <Quote className="absolute top-8 right-8 w-24 h-24 text-blue-100 opacity-50" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              {/* Left Column - Testimonial */}
              <div className="space-y-6">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl lg:text-2xl text-gray-900 leading-relaxed font-medium">
                  "{current.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
                    <span className="text-blue-800 font-semibold text-lg">
                      {current.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{current.name}</div>
                    <div className="text-gray-600">{current.title}</div>
                    <div className="text-sm text-gray-500">{current.location}</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Results Achieved:</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(current.results).map(([key, value], index) => (
                    <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{value}</div>
                      <div className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    </div>
                  ))}
                </div>

                {/* Before/After */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Transformation:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">Before:</div>
                        <div className="text-sm text-gray-600">{current.beforeAfter.before}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">After:</div>
                        <div className="text-sm text-gray-600">{current.beforeAfter.after}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentTestimonial ? 'bg-blue-600' : 'bg-blue-200'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="w-10 h-10 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="w-10 h-10 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 cursor-pointer transition-all duration-200 ${
                index === currentTestimonial ? 'ring-2 ring-blue-500 shadow-md' : 'hover:shadow-md'
              }`}
              onClick={() => setCurrentTestimonial(index)}
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-800 font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-600">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to join these successful practices?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your free 14-day trial today and see why 2,500+ practices trust DentalFlow.
          </p>
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            onClick={() => window.open('/signup', '_blank')}
          >
            Start Your Success Story
          </Button>
        </div>
      </div>
    </section>
  )
}
