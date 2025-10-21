'use client'

import { Button } from "@/components/ui/button"
import { CheckCircle, Play } from "lucide-react"
import { FeaturedInCarousel } from "@/components/landing/featured-in-carousel"
import { TikTokCampaignCard } from "@/components/features/campaigns/tiktok-campaign-card"
import { campaignData } from "@/data/campaign-data"

export default function MineaStyleLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Headline + Video + Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Headline Section - Exact Minea Specifications */}
            <div className="text-center mb-16 lg:mb-20">
              {/* Attention Banner - Dark Rounded Style */}
              <div className="bg-gray-700 text-white px-8 py-4 rounded-full inline-block mb-8 lg:mb-12">
                <span className="text-sm md:text-base font-semibold tracking-wide">
                  👨‍⚕️ ATTENTION DENTISTS & DENTAL PRACTICE OWNERS 🦷
                </span>
              </div>

              {/* Main Headline - Landing-v2 Typography: text-3xl sm:text-4xl font-bold */}
              <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
                We Guarantee 100+ Appointments per month
              </h1>

              {/* Trust Indicators - Positioned directly below headline */}
              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600 font-semibold" style={{
                    fontSize: 'clamp(16px, 2vw, 18px)',
                    lineHeight: 'clamp(24px, 3vw, 28px)',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>Only pay $50 per patient we send you.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600 font-semibold" style={{
                    fontSize: 'clamp(16px, 2vw, 18px)',
                    lineHeight: 'clamp(24px, 3vw, 28px)',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600 font-semibold" style={{
                    fontSize: 'clamp(16px, 2vw, 18px)',
                    lineHeight: 'clamp(24px, 3vw, 28px)',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>30-day guarantee</span>
                </div>
              </div>
            </div>

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
                {/* Content - TikTok Copy */}
                <div className="max-w-none">
                  <h2 className="text-gray-900 font-bold mb-6" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>
                    If you're not using TikTok ads to grow your dental practice, you're losing at least $50K–$100K/month.
                  </h2>

                  <div className="mb-6 space-y-2">
                    <p className="text-gray-900 font-semibold flex items-center" style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                    }}>
                      <span className="mr-2">🚫</span> That's your kid's college fund.
                    </p>
                    <p className="text-gray-900 font-semibold flex items-center" style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                    }}>
                      <span className="mr-2">🚫</span> That's your dream vacation.
                    </p>
                    <p className="text-gray-900 font-semibold flex items-center" style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                    }}>
                      <span className="mr-2">🚫</span> That's your early retirement.
                    </p>
                    <p className="text-gray-900 font-semibold flex items-center" style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                    }}>
                      <span className="mr-2">🚫</span> That's your wife finally quitting her job.
                    </p>
                  </div>

                  <p className="text-gray-900 font-bold mb-8" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>
                    All going straight into your competitors' pockets.
                  </p>

                  <h2 className="text-gray-900 font-bold mb-4" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>
                    TikTok is a billion-dollar patient acquisition machine.
                  </h2>

                  <p className="text-gray-700 mb-4" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    <strong className="text-gray-900 font-bold">1.7 billion users</strong> scrolling mindlessly, most with ADHD, just waiting for someone to solve their dental shame.
                  </p>

                  <p className="text-gray-700 mb-4" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    And it's embarrassingly easy to dominate.
                  </p>

                  <p className="text-gray-700 mb-4" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    We're helping dentists book <strong className="text-gray-900 font-bold">100+ appointments a day.</strong>
                  </p>

                  <p className="text-gray-900 font-bold mb-4" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>
                    That's not a typo. 100+ NEW APPOINTMENTS. DAILY. We had to stop!
                  </p>

                  <p className="text-gray-700 mb-6" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    While their competitors are still running "gentle dentistry" ads in 2025 like it's 1995.
                  </p>

                  <p className="text-gray-700" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    If you're tired of getting the same chicken feed, month after month, sign up for a free trial. We'll send you <strong className="text-gray-900 font-bold">10 patients to prove TikTok ads work</strong> — just cover the ad cost.
                  </p>
                </div>

                {/* CTA Button - Clean Minea Style */}
                <div className="pt-4 lg:pt-6">
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
                    GET YOUR FREE TRIAL - BOOK 10 NEW APPOINTMENTS NOW
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured In Carousel */}
      <div className="-mt-16 lg:-mt-20">
        <FeaturedInCarousel />
      </div>

      {/* New Video Section - Centered Headers with Two Column Layout */}
      <section className="-mt-16 lg:-mt-20 py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Centered Title - Minea Typography */}
            <div className="text-center mb-6">
              <h2 className="text-gray-900" style={{
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontSize: 'clamp(24px, 4vw, 32px)',
                fontWeight: '700',
                lineHeight: '1.25',
                letterSpacing: '-0.025em'
              }}>
                The Dentist Who Went from Bankruptcy to $98K/Month... Using "Simple" TikTok Ads
              </h2>
            </div>

            {/* Centered Subtitle - Minea Typography */}
            <div className="text-center mb-12">
              <p className="text-gray-600 max-w-3xl mx-auto" style={{
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontSize: 'clamp(16px, 2.5vw, 18px)',
                fontWeight: '600',
                lineHeight: '1.6',
                letterSpacing: '0'
              }}>
                "Six months ago, I was considering closing my practice. Today, I'm booked solid through next year and just bought my dream house. TikTok saved my career."
              </p>
            </div>

            {/* Two Column Grid Layout */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Video */}
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
                          The TikTok Dental Marketing System That's Breaking the Internet
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-300">
                          <span className="flex items-center gap-1">
                            <Play className="w-3 h-3" />
                            12:34
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Case Study
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

              {/* Right Column - Content */}
              <div className="space-y-6 lg:space-y-8">

                {/* Testimonial Case Studies */}
                <div className="space-y-6">
                  <p className="text-gray-700" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    While his competitors were complaining about the economy, Dr. Marcus Thompson was booking <strong className="text-gray-900 font-bold">100+ appointments per day</strong> from <strong className="text-gray-900 font-bold">15-second videos.</strong>
                  </p>

                  <p className="text-gray-700" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    And it's not just one success story...
                  </p>

                  {/* Dr. Sarah Martinez Case Study */}
                  <div className="space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      👩‍⚕️ <strong className="text-gray-900 font-bold">Dr. Sarah Martinez (Miami):</strong>
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                       Before: 15 new patients/month, struggling to pay rent
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                       Now: 847 appointments in 30 days, hired 3 new staff members
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                       Revenue: $127,000/month
                    </p>
                  </div>

                  {/* Dr. James Chen Case Study */}
                  <div className="space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      👩‍⚕️ <strong className="text-gray-900 font-bold">Dr. James Chen (Seattle):</strong>
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                     Before: Competing with 12 dental practices in 2-mile radius
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      Now: 6-month waiting list, patients driving 50+ miles to see him
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      Revenue: $89,000/month
                    </p>
                  </div>

                  {/* Dr. Jennifer Rodriguez Case Study */}
                  <div className="space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      👩‍⚕️ <strong className="text-gray-900 font-bold">Dr. Jennifer Rodriguez (Austin):</strong>
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      Before: Accepting any insurance to survive
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      Now: Cash-only practice, choosing her ideal patients
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      Revenue: $156,000/month
                    </p>
                  </div>

                  {/* The Brutal Truth Section */}
                  <div className="space-y-4 mt-8">
                    <h3 className="text-gray-900 font-bold" style={{
                      fontSize: '18px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                    }}>
                      The Brutal Truth About TikTok Dental Marketing
                    </h3>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      Most "marketing experts" will tell you TikTok is just for dancing teenagers.
                    </p>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">They're idiots.</strong>
                    </p>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">Here's what they don't understand:</strong>
                    </p>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      TikTok users have the <strong className="text-gray-900 font-bold">highest purchase intent</strong>  of any social platform.<br />
                      They make buying decisions in <strong className="text-gray-900 font-bold">under 15 seconds.</strong>
                    </p>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      They're actively looking for solutions to problems they're embarrassed to talk about.
                    </p>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">Like</strong> <strong className="text-gray-900 font-bold">dental anxiety. Yellow teeth. Bad breath. Crooked smiles.</strong>
                    </p>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      We've cracked the code on turning <strong className="text-gray-900 font-bold">15-second videos into $3,000+ treatment plans.</strong>
                    </p>

                    <p className="text-gray-700 mt-6" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      If you finished reading our success stories...
                    </p>
                  </div>
                </div>

                {/* Button */}
                <div className="pt-1">
                  <Button
                    className="bg-black hover:bg-gray-800 text-white font-semibold transition-colors duration-200 w-full sm:w-auto"
                    style={{
                      fontSize: 'clamp(14px, 2vw, 16px)',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      paddingTop: 'clamp(12px, 2vw, 16px)',
                      paddingBottom: 'clamp(12px, 2vw, 16px)',
                      paddingLeft: 'clamp(32px, 4vw, 40px)',
                      paddingRight: 'clamp(32px, 4vw, 40px)',
                      borderRadius: '12px',
                      minHeight: 'clamp(48px, 8vw, 56px)',
                      lineHeight: '24px'
                    }}
                  >
                    Sign Up for a Free Trial and Get 10 New Appointments!
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="pt-0 pb-16 lg:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-gray-900" style={{
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: '700',
              lineHeight: '1.25',
              letterSpacing: '-0.025em'
            }}>
              Why 99% of Dental Practices Fail Miserably with TikTok Ads?
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Video */}
            <div className="order-2 lg:order-1">
              <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">Video Placeholder</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                <div className="space-y-6">
                  {/* Mistake #1 */}
                  <div className="space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">❌ Mistake #1: They sell dentistry instead of transformation</strong>
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <em>"Professional cleaning with modern equipment"</em> — Nobody gives a shit about your equipment.
                    </p>
                  </div>

                  {/* Mistake #2 */}
                  <div className="space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">❌ Mistake #2: They target "people who need dental work"</strong>
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <em>Everyone</em> needs dental work. You're competing with 50,000 other dentists for the same boring audience.
                    </p>
                  </div>

                  {/* Mistake #3 */}
                  <div className="space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">❌ Mistake #3: They make ads that look like ads</strong>
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      TikTok users have ADHD. The second they smell "advertisement," they scroll. You have 0.3 seconds to hook them or you're dead.
                    </p>
                  </div>

                  {/* Cost Impact Statement */}
                  <p className="text-gray-700 mt-6" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    <strong className="text-gray-900 font-bold">Each mistake costs you 50-100 potential patients per month.</strong>
                  </p>
                </div>

                {/* How We Murder the Competition Section */}
                <div className="space-y-6 mt-8">
                  <h3 className="text-gray-900 font-bold" style={{
                    fontSize: '18px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>
                    🩸Here's How We Murder the Competition Psychologically 💀
                  </h3>

                  <p className="text-gray-700" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    <strong className="text-gray-900 font-bold">We don't create dental ads. We create emotional transformation stories.</strong>
                  </p>

                  <p className="text-gray-700" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    <strong className="text-gray-900 font-bold">Our proven 4-step system:</strong>
                  </p>

                  {/* Step 1 */}
                  <div className="space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">👉 Step 1: The Pain Hook</strong>
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      We identify the specific emotional pain your ideal patients feel every day<br />
                      <em>(Shame about their smile, fear of judgment, avoiding social situations)</em>
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">👉 Step 2: The Relatability Bridge</strong>
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      We create content that makes them think "This person gets me"<br />
                      <em>(Real patient stories, authentic vulnerability, zero clinical jargon)</em>
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">👉 Step 3: The Trust Sequence</strong>
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      We position you as the dentist who understands their fear<br />
                      <em>(Not just another practitioner, but someone who truly cares)</em>
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">👉 Step 4: The Irresistible Offer</strong>
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      We make it impossible to say no<br />
                      <em>(Risk-free consultations, payment plans, anxiety-friendly environment)</em>
                    </p>
                  </div>

                  {/* Result Statement */}
                  <p className="text-gray-700 mt-6" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    <strong className="text-gray-900 font-bold">Result: Patients who are pre-sold before they even call.</strong>
                  </p>
                </div>

                {/* The Numbers Don't Lie Section */}
                <div className="space-y-6 mt-8">
                  <h3 className="text-gray-900 font-bold" style={{
                    fontSize: '18px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>
                    The Numbers Don't Lie
                  </h3>

                  {/* TikTok-Style Campaign Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
                    {campaignData.map((campaign) => (
                      <TikTokCampaignCard
                        key={campaign.id}
                        campaign={campaign}
                      />
                    ))}
                  </div>
                </div>

                {/* Transition Text */}
                <div className="pt-6">
                  <p className="text-gray-700 mb-4" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    Finished reading?
                  </p>
                </div>

                {/* Button */}
                <div className="pt-1">
                  <Button
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold transition-colors duration-200"
                    style={{
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontSize: 'clamp(14px, 2.5vw, 16px)',
                      paddingTop: 'clamp(16px, 3vw, 20px)',
                      paddingBottom: 'clamp(16px, 3vw, 20px)',
                      paddingLeft: 'clamp(32px, 4vw, 40px)',
                      paddingRight: 'clamp(32px, 4vw, 40px)',
                      borderRadius: '12px',
                      minHeight: 'clamp(48px, 8vw, 56px)',
                      lineHeight: '24px'
                    }}
                  >
                    YES, I'M READY TO DESTROY MY COMPETITION
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Section - The Dentist Who Went from Bankruptcy */}
      <section className="-mt-16 lg:-mt-20 py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Centered Title - Minea Typography */}
            <div className="text-center mb-6">
              <h2 className="text-gray-900" style={{
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontSize: 'clamp(24px, 4vw, 32px)',
                fontWeight: '700',
                lineHeight: '1.25',
                letterSpacing: '-0.025em'
              }}>
                How You Can Fill Your Calendar for the Year
              </h2>
            </div>

            {/* Centered Subtitle - Minea Typography */}
            <div className="text-center mb-12">
              <p className="text-gray-600 max-w-3xl mx-auto" style={{
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontSize: 'clamp(16px, 2.5vw, 18px)',
                fontWeight: '600',
                lineHeight: '1.6',
                letterSpacing: '0'
              }}>
                While Everyone Else Complains About "Slow Seasons"
              </p>
            </div>

            {/* Two Column Grid Layout */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Video */}
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
                          The TikTok Dental Marketing System That's Breaking the Internet
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-300">
                          <span className="flex items-center gap-1">
                            <Play className="w-3 h-3" />
                            12:34
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Case Study
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

              {/* Right Column - Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  {/* Notification Messages */}
                  <div className="space-y-3">
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">Imagine waking up to notifications like these:</strong>
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500',
                      fontStyle: 'italic'
                    }}>
                      "You have 12 new appointment requests"
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500',
                      fontStyle: 'italic'
                    }}>
                      "Your calendar is booking into next month"
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500',
                      fontStyle: 'italic'
                    }}>
                      "Patient referral: 'Best dentist I've ever been to'"
                    </p>
                  </div>

                  {/* In just 90 days section */}
                  <div className="space-y-4">
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">In just 90 days, you could be:</strong>
                    </p>

                    <ul className="space-y-2 ml-4">
                      <li className="text-gray-700" style={{
                        fontSize: '16px',
                        lineHeight: '28px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                        fontWeight: '500'
                      }}>
                        👉 Booked solid for 6+ months in advance
                      </li>
                      <li className="text-gray-700" style={{
                        fontSize: '16px',
                        lineHeight: '28px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                        fontWeight: '500'
                      }}>
                        👉 Choosing your ideal patients (instead of taking whoever calls)
                      </li>
                      <li className="text-gray-700" style={{
                        fontSize: '16px',
                        lineHeight: '28px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                        fontWeight: '500'
                      }}>
                        👉 Charging premium prices (because you're in demand)
                      </li>
                      <li className="text-gray-700" style={{
                        fontSize: '16px',
                        lineHeight: '28px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                        fontWeight: '500'
                      }}>
                        👉 Working fewer hours while making more money
                      </li>
                      <li className="text-gray-700" style={{
                        fontSize: '16px',
                        lineHeight: '28px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                        fontWeight: '500'
                      }}>
                        👉 Finally feeling secure about your practice's future
                      </li>
                    </ul>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">Your only problem? Having more patients than you can handle.</strong>
                    </p>
                  </div>
                </div>

                {/* But This Isn't for Everyone Section */}
                <div className="space-y-6 mt-8">
                  <h3 className="text-gray-900 font-bold" style={{
                    fontSize: '18px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>
                    But This Isn't for Everyone...
                  </h3>

                  <p className="text-gray-700" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    <strong className="text-gray-900 font-bold">You must meet these requirements:</strong>
                  </p>

                  <ul className="space-y-2 ml-4">
                    <li className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      ✅ Currently generating <strong className="text-gray-900 font-bold">$50K+</strong> monthly revenue
                    </li>
                    <li className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      ✅ Willing to invest <strong className="text-gray-900 font-bold">$5K+</strong> monthly in growth
                    </li>
                    <li className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      ✅ Can handle <strong className="text-gray-900 font-bold">100+</strong> new patients monthly
                    </li>
                    <li className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      ✅ Serious about <strong className="text-gray-900 font-bold">dominating your local market</strong>
                    </li>
                  </ul>

                  <p className="text-gray-700" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    <strong className="text-gray-900 font-bold">If you don't qualify, stop reading now.</strong>
                  </p>
                </div>

                {/* If You DO Qualify Section */}
                <div className="space-y-6 mt-8">
                  <h3 className="text-gray-900 font-bold" style={{
                    fontSize: '18px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>
                    If You DO Qualify, Here's How We Obliterate Your Competition:
                  </h3>

                  {/* Day 1 */}
                  <div className="space-y-4">
                    <h4 className="text-gray-900 font-bold" style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                    }}>
                      Day 1: We Launch Your "Nuclear" TikTok Ads
                    </h4>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      We deploy our <strong className="text-gray-900 font-bold">"unfair advantage" ad campaigns</strong> — the same ones generating 100+ appointments monthly for our elite clients.
                    </p>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">These ads are so effective, our existing clients made us swear we'd limit who gets access.</strong>
                    </p>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500',
                      fontStyle: 'italic'
                    }}>
                      (We can only work with 3 practices per city to avoid market saturation)
                    </p>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      Your phone starts ringing within hours. Guaranteed.
                    </p>
                  </div>

                  {/* Day 2 */}
                  <div className="space-y-4">
                    <h4 className="text-gray-900 font-bold" style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                    }}>
                      Day 2: AI Books Your Appointments (While You Sleep)
                    </h4>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      Our AI handles everything you hate:
                    </p>

                    <ul className="space-y-2 ml-4">
                      <li className="text-gray-700" style={{
                        fontSize: '16px',
                        lineHeight: '28px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                        fontWeight: '500'
                      }}>
                        • Books appointments automatically
                      </li>
                      <li className="text-gray-700" style={{
                        fontSize: '16px',
                        lineHeight: '28px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                        fontWeight: '500'
                      }}>
                        • Sends reminders and follow-ups
                      </li>
                      <li className="text-gray-700" style={{
                        fontSize: '16px',
                        lineHeight: '28px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                        fontWeight: '500'
                      }}>
                        • Qualifies patients before they waste your time
                      </li>
                      <li className="text-gray-700" style={{
                        fontSize: '16px',
                        lineHeight: '28px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                        fontWeight: '500'
                      }}>
                        • Handles cancellations and reschedules
                      </li>
                    </ul>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">Real example:</strong> Dr. Thompson booked 47 new patients last month without touching his phone once.
                    </p>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">You wake up to texts like:</strong> <em>"AI booked 3 premium consultations for next week. Total value: $8,400."</em>
                    </p>
                  </div>

                  {/* Day 3 */}
                  <div className="space-y-4">
                    <h4 className="text-gray-900 font-bold" style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                    }}>
                      Day 3: Pay Only Per Patient
                    </h4>

                    <div className="space-y-2">
                      <p className="text-gray-700" style={{
                        fontSize: '16px',
                        lineHeight: '28px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                        fontWeight: '500'
                      }}>
                        No contracts<br />
                        No hidden fees<br />
                        Cancel anytime
                      </p>
                    </div>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">Why pay other agencies thousands per month when we're giving you premium appointments for free?</strong>
                    </p>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">You tried amateurs — now switch to pros.</strong>
                    </p>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">Log in to our easy-to-use app.</strong>
                    </p>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      See exactly what each appointment costs — zero surprises.
                    </p>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500',
                      fontStyle: 'italic'
                    }}>
                      "I love not having to juggle five different tools anymore..."<br />
                      -Dr. Emily Rivera
                    </p>

                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong className="text-gray-900 font-bold">Timeline: 3 days to launch, 7 days to see results, 60 days to dominate your market</strong>
                    </p>
                  </div>
                </div>

                {/* Transition Text */}
                <div className="pt-6">
                  <p className="text-gray-700 mb-4" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    Finished reading?
                  </p>
                </div>

                {/* Button */}
                <div className="pt-1">
                  <Button
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold transition-colors duration-200"
                    style={{
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontSize: 'clamp(14px, 2.5vw, 16px)',
                      paddingTop: 'clamp(16px, 3vw, 20px)',
                      paddingBottom: 'clamp(16px, 3vw, 20px)',
                      paddingLeft: 'clamp(32px, 4vw, 40px)',
                      paddingRight: 'clamp(32px, 4vw, 40px)',
                      borderRadius: '12px',
                      minHeight: 'clamp(48px, 8vw, 56px)',
                      lineHeight: '24px'
                    }}
                  >
                    YES, I'M READY TO DESTROY MY COMPETITION
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* New Competitor-Focused Hero Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Centered Title - Minea Typography */}
            <div className="text-center mb-12">
              <h2 className="text-gray-900" style={{
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontSize: 'clamp(24px, 4vw, 32px)',
                fontWeight: '700',
                lineHeight: '1.25',
                letterSpacing: '-0.025em'
              }}>
                Your Competitor is Reading This Page
              </h2>
            </div>

            {/* Two Column Grid Layout */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column - Video */}
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
                          Don't Let Your Competitors Beat You to Success
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-300">
                          <span className="flex items-center gap-1">
                            <Play className="w-3 h-3" />
                            Watch now
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Urgent
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

              {/* Right Column - Content */}
              <div className="space-y-6 lg:space-y-8">
                <div className="space-y-6">
                  <p className="text-gray-700" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    Right now, another dentist in your area is:
                  </p>

                  <div className="space-y-2 ml-4">
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      • Reading these same success stories
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      • Seeing these insane ROI numbers
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      • Realizing they're losing $50K+ per month by waiting
                    </p>
                  </div>

                  <p className="text-gray-900 font-bold" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>
                    The difference?
                  </p>

                  <p className="text-gray-700" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    They're going to act. You're going to "think about it."
                  </p>

                  <p className="text-gray-900 font-bold" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>
                    Guess who gets the patients?
                  </p>

                  {/* Your 2 Choices Section */}
                  <div className="mt-8">
                    <h3 className="text-gray-900 font-bold mb-6" style={{
                      fontSize: '18px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                    }}>
                      Your 2 Choices
                    </h3>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-gray-900 font-bold" style={{
                          fontSize: '16px',
                          lineHeight: '28px',
                          fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                        }}>
                          Choice #1: Keep doing what you're doing.
                        </p>
                        <div className="ml-4 space-y-1">
                          <p className="text-gray-700" style={{
                            fontSize: '16px',
                            lineHeight: '28px',
                            fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                            fontWeight: '500'
                          }}>
                            • Hope referrals increase
                          </p>
                          <p className="text-gray-700" style={{
                            fontSize: '16px',
                            lineHeight: '28px',
                            fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                            fontWeight: '500'
                          }}>
                            • Watch competitors steal your potential patients
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-gray-900 font-bold" style={{
                          fontSize: '16px',
                          lineHeight: '28px',
                          fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                        }}>
                          Choice #2: Become the dentist everyone in your area is talking about.
                        </p>
                        <div className="ml-4 space-y-1">
                          <p className="text-gray-700" style={{
                            fontSize: '16px',
                            lineHeight: '28px',
                            fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                            fontWeight: '500'
                          }}>
                            • Book your calendar full
                          </p>
                          <p className="text-gray-700" style={{
                            fontSize: '16px',
                            lineHeight: '28px',
                            fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                            fontWeight: '500'
                          }}>
                            • Build the practice you always dreamed of
                          </p>
                          <p className="text-gray-700" style={{
                            fontSize: '16px',
                            lineHeight: '28px',
                            fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                            fontWeight: '500'
                          }}>
                            • Finally dominate your market
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-900 font-bold mt-6" style={{
                      fontSize: '16px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                    }}>
                      The difference between these futures is the decision you make right now.
                    </p>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <div className="pt-4 lg:pt-6">
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
                    GET YOUR FREE TRIAL - BEFORE YOUR COMPETITORS DO
                  </Button>
                </div>
              </div>
            </div>

            {/* P.S. Section */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-gray-900 font-bold" style={{
                  fontSize: '18px',
                  lineHeight: '24px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                }}>
                  P.S. Remember Dr. Thompson from the beginning?
                </h3>

                <p className="text-gray-700" style={{
                  fontSize: '16px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  He waited 6 months to take action. Those 6 months cost him $180,000 in lost revenue. Don't be Dr. Thompson from 6 months ago. Be Dr. Thompson from today - booked solid, financially secure, living the dream. Your transformation starts with one click.
                </p>

                {/* Secondary CTA Button */}
                <div className="pt-4">
                  <Button
                    className="bg-black hover:bg-gray-800 text-white font-semibold transition-colors duration-200 w-full sm:w-auto"
                    style={{
                      fontSize: 'clamp(14px, 2vw, 16px)',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      paddingTop: 'clamp(12px, 2vw, 16px)',
                      paddingBottom: 'clamp(12px, 2vw, 16px)',
                      paddingLeft: 'clamp(32px, 4vw, 40px)',
                      paddingRight: 'clamp(32px, 4vw, 40px)',
                      borderRadius: '12px',
                      minHeight: 'clamp(48px, 8vw, 56px)',
                      lineHeight: '24px'
                    }}
                  >
                    APPLY NOW - 1 SPOT REMAINING
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Card Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Centered Title - Minea Typography */}
            <div className="text-center mb-12">
              <h2 className="text-gray-900" style={{
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontSize: 'clamp(24px, 4vw, 32px)',
                fontWeight: '700',
                lineHeight: '1.25',
                letterSpacing: '-0.025em'
              }}>
                Real Results from Real Practices
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto mt-6" style={{
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontSize: 'clamp(16px, 2.5vw, 18px)',
                fontWeight: '600',
                lineHeight: '1.6',
                letterSpacing: '0'
              }}>
                Don't just take our word for it. Here's what dental professionals are saying about DentalFlow.
              </p>
            </div>

            {/* Main Transformation Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12 border border-blue-100 relative overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Column - Testimonial */}
                <div className="space-y-6 lg:space-y-8">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 text-yellow-400 fill-current">★</div>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-900" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    "DentalFlow transformed our practice. We've increased revenue by 45% and cut no-shows in half. The automated billing alone saves us 10 hours per week."
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
                      <span className="text-blue-800 font-semibold text-lg">SM</span>
                    </div>
                    <div>
                      <div className="text-gray-900 font-bold" style={{
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                      }}>Dr. Sarah Mitchell</div>
                      <div className="text-gray-700" style={{
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                        fontWeight: '500'
                      }}>Owner, Bright Smiles Dental</div>
                      <div className="text-gray-600" style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                        fontWeight: '500'
                      }}>Austin, TX</div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Results */}
                <div className="space-y-6 lg:space-y-8">
                  <h3 className="text-gray-900 font-bold" style={{
                    fontSize: '18px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>Results Achieved:</h3>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200">
                      <div className="text-2xl font-bold text-blue-600 mb-1">+45%</div>
                      <div className="text-xs text-gray-600">Revenue</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200">
                      <div className="text-2xl font-bold text-blue-600 mb-1">-60%</div>
                      <div className="text-xs text-gray-600">No Shows</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200">
                      <div className="text-2xl font-bold text-blue-600 mb-1">10 hrs</div>
                      <div className="text-xs text-gray-600">Time Saved</div>
                    </div>
                  </div>

                  {/* Before/After */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h4 className="text-gray-900 font-bold mb-4" style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                    }}>Transformation:</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <div className="text-gray-900 font-bold" style={{
                            fontSize: '14px',
                            lineHeight: '20px',
                            fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                          }}>Before:</div>
                          <div className="text-gray-700" style={{
                            fontSize: '14px',
                            lineHeight: '20px',
                            fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                            fontWeight: '500'
                          }}>Struggling with manual scheduling and billing</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <div className="text-gray-900 font-bold" style={{
                            fontSize: '14px',
                            lineHeight: '20px',
                            fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                          }}>After:</div>
                          <div className="text-gray-700" style={{
                            fontSize: '14px',
                            lineHeight: '20px',
                            fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                            fontWeight: '500'
                          }}>Streamlined operations and 45% revenue growth</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Cards Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Additional Testimonials Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Review Card 1 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 text-yellow-400 fill-current">★</div>
                  ))}
                </div>

                <p className="text-gray-700 mb-4" style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  "The setup was incredibly easy - we were up and running in 20 minutes. The guaranteed appointments started flowing immediately, and we love getting paid faster."
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-800 font-semibold text-sm">MC</span>
                  </div>
                  <div>
                    <div className="text-gray-900 font-bold" style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                    }}>Dr. Michael Chen</div>
                    <div className="text-gray-600" style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>Denver, CO</div>
                  </div>
                </div>
              </div>

              {/* Review Card 2 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 text-yellow-400 fill-current">★</div>
                  ))}
                </div>

                <p className="text-gray-700 mb-4" style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  "Best investment we've made. The guaranteed appointments got us started, and now the patient communication features keep them coming back."
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-800 font-semibold text-sm">ER</span>
                  </div>
                  <div>
                    <div className="text-gray-900 font-bold" style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                    }}>Dr. Emily Rodriguez</div>
                    <div className="text-gray-600" style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>Seattle, WA</div>
                  </div>
                </div>
              </div>

              {/* Review Card 3 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 text-yellow-400 fill-current">★</div>
                  ))}
                </div>

                <p className="text-gray-700 mb-4" style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  "DentalFlow transformed our practice. We've increased revenue by 45% and cut no-shows in half. The automated billing alone saves us 10 hours per week."
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-800 font-semibold text-sm">SM</span>
                  </div>
                  <div>
                    <div className="text-gray-900 font-bold" style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                    }}>Dr. Sarah Mitchell</div>
                    <div className="text-gray-600" style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>Austin, TX</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <h3 className="text-gray-900 font-bold mb-4" style={{
                fontSize: '18px',
                lineHeight: '24px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif'
              }}>
                Ready to join these successful practices?
              </h3>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto" style={{
                fontSize: '16px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                Start your free 14-day trial today and see why 2,500+ practices trust DentalFlow.
              </p>
              <Button
                className="bg-black hover:bg-gray-800 text-white font-semibold transition-colors duration-200"
                style={{
                  fontSize: 'clamp(14px, 2vw, 16px)',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  paddingTop: 'clamp(12px, 2vw, 16px)',
                  paddingBottom: 'clamp(12px, 2vw, 16px)',
                  paddingLeft: 'clamp(32px, 4vw, 40px)',
                  paddingRight: 'clamp(32px, 4vw, 40px)',
                  borderRadius: '12px',
                  minHeight: 'clamp(48px, 8vw, 56px)',
                  lineHeight: '24px'
                }}
              >
                Start Your Success Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section Table */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-gray-900 mb-4" style={{
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontSize: 'clamp(24px, 4vw, 32px)',
                fontWeight: '700',
                lineHeight: '1.25',
                letterSpacing: '-0.025em'
              }}>
                Compare with Traditional Software
              </h2>
              <p className="text-gray-700" style={{
                fontSize: '16px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                See how DentalFlow stacks up against expensive legacy systems
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-900 font-bold" style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                      }}>
                        Software
                      </th>
                      <th className="px-6 py-4 text-center text-gray-900 font-bold" style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                      }}>
                        Monthly Cost
                      </th>
                      <th className="px-6 py-4 text-center text-gray-900 font-bold" style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                      }}>
                        Setup Fee
                      </th>
                      <th className="px-6 py-4 text-center text-gray-900 font-bold" style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                      }}>
                        Setup Time
                      </th>
                      <th className="px-6 py-4 text-center text-gray-900 font-bold" style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                      }}>
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
                            <div className="text-gray-900 font-bold" style={{
                              fontSize: '16px',
                              lineHeight: '24px',
                              fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                            }}>DentalFlow</div>
                            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              Recommended
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-bold text-blue-600">$597</div>
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
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-gray-900 font-bold" style={{
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                        }}>Dentrix</div>
                        <div className="text-xs text-gray-500">Complex setup, expensive training</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-semibold text-gray-900">$599/month</div>
                        <div className="text-xs text-gray-500">Fixed cost</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-semibold text-red-600">$2,500</div>
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

                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-gray-900 font-bold" style={{
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                        }}>Eaglesoft</div>
                        <div className="text-xs text-gray-500">Outdated interface, poor support</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-semibold text-gray-900">$449/month</div>
                        <div className="text-xs text-gray-500">Fixed cost</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-semibold text-red-600">$1,800</div>
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

                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-gray-900 font-bold" style={{
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                        }}>Open Dental</div>
                        <div className="text-xs text-gray-500">Limited features, manual processes</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-semibold text-gray-900">$349/month</div>
                        <div className="text-xs text-gray-500">Fixed cost</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-semibold text-red-600">$1,200</div>
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-gray-900 mb-4" style={{
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontSize: 'clamp(24px, 4vw, 32px)',
                fontWeight: '700',
                lineHeight: '1.25',
                letterSpacing: '-0.025em'
              }}>
                Frequently Asked Questions
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto" style={{
                fontSize: '16px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                Got questions? We've got answers. Here are the most common questions dental practices ask about DentalFlow.
              </p>
            </div>

            {/* FAQ List */}
            <div className="space-y-4 mb-12">
              {/* FAQ 1 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow duration-200">
                <div className="px-6 py-5">
                  <div className="text-gray-900 font-bold mb-3" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>
                    How quickly can we get started and see appointments?
                  </div>
                  <div className="text-gray-700" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    Most practices are up and running in 15-20 minutes. Our setup wizard guides you through the process, and we'll migrate your existing data for free. We immediately launch your TikTok ad campaign to start generating your guaranteed 10 appointments.
                  </div>
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow duration-200">
                <div className="px-6 py-5">
                  <div className="text-gray-900 font-bold mb-3" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>
                    How does the guaranteed appointment model work?
                  </div>
                  <div className="text-gray-700" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    We invest $300 in TikTok ads to guarantee your first 10 appointments - this isn't a setup fee, it's 100% ad spend for your practice. You pay $97/month for the platform plus $50 for each appointment beyond the guaranteed 10.
                  </div>
                </div>
              </div>

              {/* FAQ 3 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow duration-200">
                <div className="px-6 py-5">
                  <div className="text-gray-900 font-bold mb-3" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>
                    Can we cancel anytime?
                  </div>
                  <div className="text-gray-700" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    Yes, absolutely. There are no long-term contracts or cancellation fees. You can cancel your subscription at any time, and you'll retain access until the end of your current billing period.
                  </div>
                </div>
              </div>

              {/* FAQ 4 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow duration-200">
                <div className="px-6 py-5">
                  <div className="text-gray-900 font-bold mb-3" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif'
                  }}>
                    Is DentalFlow HIPAA compliant?
                  </div>
                  <div className="text-gray-700" style={{
                    fontSize: '16px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    Yes, DentalFlow is fully HIPAA compliant. We use bank-level encryption, secure data centers, and regular security audits. We also provide Business Associate Agreements (BAA) and maintain SOC 2 Type II certification.
                  </div>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center">
              <h3 className="text-gray-900 font-bold mb-4" style={{
                fontSize: '18px',
                lineHeight: '24px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif'
              }}>
                Ready to get started?
              </h3>
              <p className="text-gray-700 mb-6" style={{
                fontSize: '16px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                Most questions are answered once you see DentalFlow in action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-black hover:bg-gray-800 text-white font-semibold transition-colors duration-200"
                  style={{
                    fontSize: 'clamp(14px, 2vw, 16px)',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    paddingTop: 'clamp(12px, 2vw, 16px)',
                    paddingBottom: 'clamp(12px, 2vw, 16px)',
                    paddingLeft: 'clamp(32px, 4vw, 40px)',
                    paddingRight: 'clamp(32px, 4vw, 40px)',
                    borderRadius: '12px',
                    minHeight: 'clamp(48px, 8vw, 56px)',
                    lineHeight: '24px'
                  }}
                >
                  Start Free Trial
                </Button>
                <Button
                  className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-semibold transition-colors duration-200"
                  style={{
                    fontSize: 'clamp(14px, 2vw, 16px)',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    paddingTop: 'clamp(12px, 2vw, 16px)',
                    paddingBottom: 'clamp(12px, 2vw, 16px)',
                    paddingLeft: 'clamp(32px, 4vw, 40px)',
                    paddingRight: 'clamp(32px, 4vw, 40px)',
                    borderRadius: '12px',
                    minHeight: 'clamp(48px, 8vw, 56px)',
                    lineHeight: '24px'
                  }}
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
