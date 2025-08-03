'use client'

import { Button } from "@/components/ui/button"
import { CheckCircle, Play } from "lucide-react"

export default function MineaStyleLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simplified Hero Section - Video + Content Only */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Video + Content Layout - Optimized Spacing */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column - Video with Proper Spacing */}
              <div className="relative w-full">
                <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl w-full" style={{
                  aspectRatio: '16/9'
                }}>
                  {/* Video Placeholder with Play Button */}
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/20"></div>

                    {/* Mock Video Thumbnail */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-gray-800/20"></div>

                    {/* Play Button */}
                    <button className="relative z-10 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-200 group">
                      <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform duration-200 fill-current" />
                    </button>

                    {/* Video Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="text-white font-semibold text-sm">
                          Free Trial: How We Get You 10 Guaranteed Appointments
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-300">
                          <span className="flex items-center gap-1">
                            <Play className="w-3 h-3" />
                            Watch later
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Share
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* YouTube-style branding */}
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                        <span className="text-white text-xs font-medium">Watch on DentalFlow</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Content with Proper Spacing */}
              <div className="space-y-6 lg:space-y-8 mt-8 lg:mt-0">
                {/* Content - Minea Body Text Specifications */}
                <div className="max-w-none">
                  <p className="text-gray-700 mb-6" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    We invest <strong className="text-gray-900 font-semibold">$300 in targeted ads</strong> to guarantee your first 10 appointments
                    within 28 days. You only pay for the ad spend - no setup fees, no contracts, no hidden costs.
                    This practice management tool has been carefully designed to not just manage your practice,
                    but to actively grow it from day one with real patients booking real appointments.
                  </p>

                  <p className="text-gray-700 mb-6" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    DentalFlow stands out because we put our money where our mouth is.
                    Instead of charging setup fees like other software companies, we
                    <strong className="text-gray-900 font-semibold"> invest in your success</strong> by running professional ad campaigns
                    that bring qualified patients directly to your practice within the first month.
                  </p>

                  <p className="text-gray-700" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    The result? You get a <strong className="text-gray-900 font-semibold">powerful practice management system</strong> plus
                    10 guaranteed appointments within 28 days to start generating revenue immediately.
                    This combination of software and marketing makes DentalFlow the
                    <strong className="text-gray-900 font-semibold"> complete growth solution</strong> for dental practices.
                  </p>
                </div>

                {/* CTA Button - Clean Minea Style */}
                <div className="pt-6 lg:pt-8">
                  <Button
                    className="bg-black hover:bg-gray-800 text-white font-semibold transition-colors duration-200 w-full sm:w-auto"
                    style={{
                      fontSize: 'clamp(14px, 2vw, 16px)',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      paddingTop: 'clamp(12px, 2vw, 16px)',
                      paddingBottom: 'clamp(12px, 2vw, 16px)',
                      paddingLeft: 'clamp(24px, 4vw, 32px)',
                      paddingRight: 'clamp(24px, 4vw, 32px)',
                      borderRadius: '12px',
                      minHeight: 'clamp(48px, 8vw, 56px)',
                      lineHeight: '24px'
                    }}
                  >
                    Start My Free Trial
                  </Button>
                </div>

                {/* Trust Indicators - Minea Typography */}
                <div className="flex flex-wrap items-center gap-6 pt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600" style={{
                      fontSize: '14px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>Only pay $300 ad cost</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600" style={{
                      fontSize: '14px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>No setup fees ever</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600" style={{
                      fontSize: '14px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>28-day guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
