'use client'

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

  const getLogoSize = (size: string) => {
    switch (size) {
      case 'large':
        return 'h-16 w-auto max-w-[170px]'
      case 'medium':
        return 'h-12 w-auto max-w-[160px]'
      case 'small':
        return 'h-10 w-auto max-w-[140px]'
      default:
        return 'h-10 w-auto max-w-[140px]'
    }
  }

  const getCardPadding = (size: string) => {
    switch (size) {
      case 'large':
        return 'p-6'
      case 'medium':
        return 'p-6'
      case 'small':
        return 'p-6'
      default:
        return 'p-6'
    }
  }

  // Duplicate publications array for seamless infinite scroll
  const duplicatedPublications = [...publications, ...publications]

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header - Premium Divider Style */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="px-4 text-sm text-gray-500 font-medium">
              Featured
            </div>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Scrolling Marquee Container */}
          <div className="relative overflow-hidden">
            {/* Scrolling Track */}
            <div
              className="flex items-center space-x-16 animate-scroll"
              style={{
                width: 'calc(200% + 4rem)', // Account for duplicated content and spacing
              }}
            >
              {duplicatedPublications.map((publication, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                >
                  <div className={`flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200 ${getCardPadding(publication.size)} hover:shadow-md transition-shadow duration-300`}>
                    <div className={`${getLogoSize(publication.size)} flex items-center justify-center`}>
                      <Image
                        src={publication.logo}
                        alt={publication.alt}
                        width={publication.size === 'large' ? 170 : publication.size === 'medium' ? 160 : 140}
                        height={publication.size === 'large' ? 65 : publication.size === 'medium' ? 60 : 50}
                        className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        priority={publication.size === 'large'}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  )
}
