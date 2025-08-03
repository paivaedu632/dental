'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Publication {
  name: string
  logo: string
  alt: string
  size: 'large' | 'medium' | 'small'
}

const publications: Publication[] = [
  {
    name: 'American Dental Association',
    logo: '/images/logos/ada-logo.svg',
    alt: 'American Dental Association (ADA) Logo',
    size: 'large'
  },
  {
    name: 'Dental Economics',
    logo: '/images/logos/dental-economics-logo.svg', 
    alt: 'Dental Economics Magazine Logo',
    size: 'medium'
  },
  {
    name: 'Dentistry Today',
    logo: '/images/logos/dentistry-today-logo.svg',
    alt: 'Dentistry Today Magazine Logo', 
    size: 'small'
  },
  {
    name: 'Modern Dentistry',
    logo: '/images/logos/modern-dentistry-logo.svg',
    alt: 'Modern Dentistry Magazine Logo',
    size: 'small'
  },
  {
    name: 'Academy of General Dentistry',
    logo: '/images/logos/agd-logo.svg',
    alt: 'Academy of General Dentistry (AGD) Logo',
    size: 'small'
  }
]

export function FeaturedInCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % publications.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [isHovered])

  const getLogoSize = (size: string) => {
    switch (size) {
      case 'large':
        return 'h-16 w-auto max-w-[200px]'
      case 'medium':
        return 'h-12 w-auto max-w-[160px]'
      case 'small':
        return 'h-10 w-auto max-w-[140px]'
      default:
        return 'h-10 w-auto max-w-[140px]'
    }
  }

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900" style={{
              fontFamily: 'Inter, "Inter Placeholder", sans-serif'
            }}>
              Featured In
            </h2>
          </div>

          {/* Carousel Container */}
          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Carousel Track */}
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {publications.map((publication, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 flex items-center justify-center py-8"
                >
                  <div className="flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
                    {/* Actual logo images */}
                    <div className={`${getLogoSize(publication.size)} flex items-center justify-center`}>
                      <Image
                        src={publication.logo}
                        alt={publication.alt}
                        width={publication.size === 'large' ? 200 : publication.size === 'medium' ? 160 : 140}
                        height={publication.size === 'large' ? 80 : publication.size === 'medium' ? 60 : 50}
                        className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        priority={publication.size === 'large'}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {publications.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentIndex 
                      ? 'bg-gray-900' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Trust Message */}
          <div className="text-center mt-8">
            <p className="text-gray-600" style={{
              fontSize: '14px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '500'
            }}>
              Trusted by leading dental industry publications
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
