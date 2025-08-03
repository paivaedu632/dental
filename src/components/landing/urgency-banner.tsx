"use client"

import React, { useState, useEffect } from 'react'
import { X, Clock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  })

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          // Reset to 24 hours when it reaches 0
          return { hours: 23, minutes: 59, seconds: 59 }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/50 to-red-700/50 animate-pulse" />
      
      <div className="relative container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span className="font-bold text-sm sm:text-base">LIMITED TIME OFFER</span>
            </div>
            
            <div className="hidden sm:block w-px h-6 bg-red-400" />
            
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <span className="font-medium">Get 3 months FREE when you start today!</span>
              <span className="hidden md:inline">• Save $291 • No setup fees</span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-red-800/50 rounded-lg px-3 py-1">
              <Clock className="w-4 h-4" />
              <div className="flex items-center gap-1 font-mono font-bold">
                <span className="bg-white text-red-600 px-1 rounded text-sm">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span>:</span>
                <span className="bg-white text-red-600 px-1 rounded text-sm">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span>:</span>
                <span className="bg-white text-red-600 px-1 rounded text-sm">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            <Button
              size="sm"
              className="bg-yellow-400 hover:bg-yellow-500 text-red-900 font-bold hidden sm:inline-flex"
              onClick={() => window.open('/signup?promo=3MONTHS', '_blank')}
            >
              Claim Offer
            </Button>

            <button
              onClick={() => setIsVisible(false)}
              className="text-red-200 hover:text-white transition-colors p-1"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden mt-2 pt-2 border-t border-red-500">
          <Button
            size="sm"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-red-900 font-bold"
            onClick={() => window.open('/signup?promo=3MONTHS', '_blank')}
          >
            Claim 3 Months FREE - Limited Time
          </Button>
        </div>
      </div>
    </div>
  )
}
