"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Package,
  Filter,
  Search,
  Calendar,
  TrendingUp,
  Star,
  Eye,
  Play,
  Users,
  BarChart3,
  ArrowUpDown,
  ChevronUp,
  ChevronDown
} from "lucide-react"

type SortField = 'name' | 'conversionRate' | 'leads' | 'conversions' | 'price'
type SortDirection = 'asc' | 'desc'

export default function LandingPagePage() {
  const [sortField, setSortField] = useState<SortField>('conversionRate')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [searchTerm, setSearchTerm] = useState('')

  const dentalLandingPages = [
    {
      id: 1,
      name: "Dr. Susan's $29 New Patient Special",
      price: "$29",
      originalPrice: "$299",
      discount: "90% OFF",
      category: "New Patient Offer",
      rating: 4.9,
      reviews: 247,
      conversions: "156",
      leads: "89",
      practice: "Dr. Susan's Dental Care",
      location: "Denver, CO",
      trending: true,
      lastUpdated: "2 hours ago",
      adSpend: "$1.2K",
      conversionRate: "12.3%",
      isActive: true,
      description: "X-Rays and free teeth cleaning for new patients"
    },
    {
      id: 2,
      name: "Emergency Dental Care - Same Day",
      price: "Free Consultation",
      originalPrice: "$150",
      discount: "100% OFF",
      category: "Emergency Care",
      rating: 4.7,
      reviews: 189,
      conversions: "78",
      leads: "134",
      practice: "24/7 Dental Emergency",
      location: "Multiple Locations",
      trending: false,
      lastUpdated: "1 hour ago",
      adSpend: "$890",
      conversionRate: "8.9%",
      isActive: true,
      description: "Immediate pain relief and emergency dental services"
    },
    {
      id: 3,
      name: "Invisalign Consultation Special",
      price: "$99",
      originalPrice: "$299",
      discount: "67% OFF",
      category: "Orthodontics",
      rating: 4.8,
      reviews: 312,
      conversions: "203",
      leads: "267",
      practice: "Smile Perfect Orthodontics",
      location: "Austin, TX",
      trending: true,
      lastUpdated: "30 minutes ago",
      adSpend: "$2.1K",
      conversionRate: "15.2%",
      isActive: true,
      description: "Complete Invisalign consultation with 3D imaging"
    },
    {
      id: 4,
      name: "Teeth Whitening Flash Sale",
      price: "$199",
      originalPrice: "$499",
      discount: "60% OFF",
      category: "Cosmetic Dentistry",
      rating: 4.6,
      reviews: 156,
      conversions: "89",
      leads: "145",
      practice: "Bright Smile Cosmetics",
      location: "Miami, FL",
      trending: false,
      lastUpdated: "4 hours ago",
      adSpend: "$1.5K",
      conversionRate: "11.7%",
      isActive: false,
      description: "Professional teeth whitening with guaranteed results"
    },
    {
      id: 5,
      name: "Family Dental Package Deal",
      price: "$149",
      originalPrice: "$399",
      discount: "63% OFF",
      category: "Family Dentistry",
      rating: 4.9,
      reviews: 423,
      conversions: "167",
      leads: "234",
      practice: "Family First Dental",
      location: "Phoenix, AZ",
      trending: true,
      lastUpdated: "1 hour ago",
      adSpend: "$1.8K",
      conversionRate: "13.8%",
      isActive: true,
      description: "Complete family dental checkup for up to 4 members"
    },
    {
      id: 6,
      name: "Dental Implant Consultation",
      price: "Free",
      originalPrice: "$200",
      discount: "100% OFF",
      category: "Oral Surgery",
      rating: 4.8,
      reviews: 198,
      conversions: "134",
      leads: "189",
      practice: "Advanced Oral Surgery",
      location: "Seattle, WA",
      trending: true,
      lastUpdated: "15 minutes ago",
      adSpend: "$2.3K",
      conversionRate: "16.4%",
      isActive: true,
      description: "Free consultation for dental implant procedures"
    },
  ]

  // Sorting function
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc') // Default to descending for metrics
    }
  }

  // Filter and sort landing pages
  const filteredAndSortedPages = dentalLandingPages
    .filter(page =>
      page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.practice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue: string | number = String(a[sortField as keyof typeof a])
      let bValue: string | number = String(b[sortField as keyof typeof b])

      // Handle numeric values
      if (sortField === 'leads' || sortField === 'conversions') {
        aValue = Number(aValue)
        bValue = Number(bValue)
      }

      // Handle conversion rate (remove % and convert to number)
      if (sortField === 'conversionRate') {
        aValue = parseFloat(String(aValue).replace('%', ''))
        bValue = parseFloat(String(bValue).replace('%', ''))
      }

      // Handle price (remove $ and convert to number)
      if (sortField === 'price') {
        aValue = parseFloat(String(aValue).replace('$', '').replace('Free', '0'))
        bValue = parseFloat(String(bValue).replace('$', '').replace('Free', '0'))
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

  // Sort icon component
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
    }
    return sortDirection === 'asc'
      ? <ChevronUp className="h-4 w-4" />
      : <ChevronDown className="h-4 w-4" />
  }

  // Function to open lead capture page in new tab
  const openLeadCaptureInNewTab = () => {
    // Create a new window/tab with the lead capture content
    const newWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes')
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Dr. Susan's $29 New Patient Special Offer</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; }
          </style>
        </head>
        <body class="bg-gradient-to-br from-blue-50 to-white">
          <!-- Urgency Banner -->
          <div class="bg-red-600 text-white text-center py-3 px-4">
            <div class="flex items-center justify-center gap-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
              <span class="font-bold text-lg">Offer Expires 08/31/25</span>
            </div>
          </div>

          <div class="p-6 lg:p-8">
            <!-- Main Content Grid -->
            <div class="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">

              <!-- Left Column - Offer Details -->
              <div class="space-y-6">
                <!-- Main Headline -->
                <div class="space-y-4">
                  <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    Get Dr. Susan's
                    <span class="text-blue-600">$29 NEW PATIENT</span>
                    <span class="text-green-600">SPECIAL OFFER</span>
                  </h1>

                  <!-- Service Description -->
                  <p class="text-xl text-gray-700 font-medium">
                    X-Rays and free teeth cleaning
                  </p>
                </div>

                <!-- Pricing -->
                <div class="bg-white rounded-lg p-6 border-2 border-blue-200 shadow-lg">
                  <div class="text-center space-y-2">
                    <div class="text-gray-500">
                      <span class="text-2xl line-through">$299</span>
                      <span class="ml-2 text-sm">Regular Price</span>
                    </div>
                    <div class="text-4xl lg:text-5xl font-bold text-green-600">
                      Only $29!
                    </div>
                    <div class="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                      Save $270 Today!
                    </div>
                  </div>
                </div>

                <!-- Benefits -->
                <div class="space-y-3">
                  <h3 class="font-semibold text-lg text-gray-900">What's Included:</h3>
                  <div class="space-y-2">
                    <div class="flex items-center gap-2">
                      <svg class="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="text-gray-700">Complete digital X-rays</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="text-gray-700">Professional teeth cleaning</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="text-gray-700">Comprehensive oral examination</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="text-gray-700">Personalized treatment plan</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column - Hero Image & Form -->
              <div class="space-y-6">
                <!-- Hero Image -->
                <div class="relative">
                  <img
                    src="https://assets.cdn.filesafe.space/TIGHsMRsRBTsdlSmWzuz/media/6606512570e7b62983dbc52a.png"
                    alt="Dr. Susan - Professional Dental Care"
                    class="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg"
                  />
                  <div class="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3">
                    <div class="flex items-center gap-2">
                      <div class="flex">
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                      <span class="text-sm font-medium">4.9/5 Rating</span>
                    </div>
                  </div>
                </div>

                <!-- Contact Form -->
                <div class="border-2 border-blue-200 rounded-lg p-6 bg-white">
                  <form class="space-y-4" onsubmit="handleSubmit(event)">
                    <div class="text-center mb-4">
                      <h3 class="text-xl font-bold text-gray-900">
                        Book Your $29 Appointment
                      </h3>
                      <p class="text-sm text-gray-600">
                        Limited time offer - Act now!
                      </p>
                    </div>

                    <div class="space-y-4">
                      <div>
                        <label class="text-sm font-medium block mb-1">Full Name *</label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label class="text-sm font-medium block mb-1">Email Address *</label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label class="text-sm font-medium block mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          placeholder="(555) 123-4567"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg rounded-md transition-colors"
                    >
                      📅 BOOK MY APPOINTMENT NOW!
                    </button>

                    <p class="text-xs text-gray-500 text-center">
                      By submitting, you agree to receive appointment reminders via text/email.
                    </p>
                  </form>
                </div>
              </div>
            </div>

            <!-- Customer Reviews Section -->
            <div class="mt-12 pt-8 border-t border-gray-200 max-w-6xl mx-auto">
              <h2 class="text-2xl font-bold text-center text-gray-900 mb-8">
                What Our Patients Say
              </h2>

              <div class="grid md:grid-cols-3 gap-6">
                <div class="border border-gray-200 rounded-lg p-6 bg-white">
                  <div class="space-y-4">
                    <div class="flex items-center gap-2">
                      <div class="flex">
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                      <span class="text-sm font-medium">5.0</span>
                    </div>

                    <p class="text-gray-700 text-sm leading-relaxed">
                      "Dr. Susan and her team are amazing! The $29 special was perfect for getting started. My teeth have never felt cleaner!"
                    </p>

                    <div class="pt-2 border-t border-gray-100">
                      <p class="font-medium text-gray-900 text-sm">
                        - Sarah Johnson
                      </p>
                    </div>
                  </div>
                </div>

                <div class="border border-gray-200 rounded-lg p-6 bg-white">
                  <div class="space-y-4">
                    <div class="flex items-center gap-2">
                      <div class="flex">
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                      <span class="text-sm font-medium">5.0</span>
                    </div>

                    <p class="text-gray-700 text-sm leading-relaxed">
                      "Great value and excellent service. The X-rays were thorough and the cleaning was gentle. Highly recommend!"
                    </p>

                    <div class="pt-2 border-t border-gray-100">
                      <p class="font-medium text-gray-900 text-sm">
                        - Michael Chen
                      </p>
                    </div>
                  </div>
                </div>

                <div class="border border-gray-200 rounded-lg p-6 bg-white">
                  <div class="space-y-4">
                    <div class="flex items-center gap-2">
                      <div class="flex">
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                      <span class="text-sm font-medium">5.0</span>
                    </div>

                    <p class="text-gray-700 text-sm leading-relaxed">
                      "I was nervous about finding a new dentist, but this special offer made it easy to try. Now I'm a regular patient!"
                    </p>

                    <div class="pt-2 border-t border-gray-100">
                      <p class="font-medium text-gray-900 text-sm">
                        - Lisa Rodriguez
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer CTA -->
            <div class="mt-8 text-center bg-blue-50 rounded-lg p-6 max-w-6xl mx-auto">
              <p class="text-lg font-medium text-gray-900 mb-2">
                Don't miss out on this limited-time offer!
              </p>
              <p class="text-sm text-gray-600">
                Call us directly at
                <a href="tel:555-123-4567" class="font-bold text-blue-600 hover:underline">
                  (555) 123-4567
                </a>
                or book online above.
              </p>
            </div>
          </div>

          <script>
            function handleSubmit(event) {
              event.preventDefault();
              alert('Thank you! We will contact you soon to schedule your appointment.');
            }
          </script>
        </body>
        </html>
      `)
      newWindow.document.close()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Landing Pages</h1>
        <p className="text-muted-foreground mt-2">
          Create and manage high-converting dental practice landing pages for lead generation.
        </p>
      </div>



      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Landing Pages</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              5 active campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,058</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.4% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search landing pages..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline">Category</Button>
          <Button variant="outline">Price Range</Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="gap-2"
          onClick={openLeadCaptureInNewTab}
        >
          <Play className="h-4 w-4" />
          Preview Lead Capture
        </Button>
        <Button className="gap-2">
          <Package className="h-4 w-4" />
          Create New Page
        </Button>
      </div>



      {/* Landing Pages Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Landing Page Name
                  <SortIcon field="name" />
                </div>
              </TableHead>
              <TableHead>Category/Service</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center gap-2">
                  Price & Discount
                  <SortIcon field="price" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('conversionRate')}
              >
                <div className="flex items-center gap-2">
                  Conversion Rate
                  <SortIcon field="conversionRate" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('leads')}
              >
                <div className="flex items-center gap-2">
                  Total Leads
                  <SortIcon field="leads" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('conversions')}
              >
                <div className="flex items-center gap-2">
                  Total Conversions
                  <SortIcon field="conversions" />
                </div>
              </TableHead>
              <TableHead>Practice/Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedPages.map((page) => (
              <TableRow key={page.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{page.name}</div>
                      <div className="text-sm text-muted-foreground">{page.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {page.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{page.price}</span>
                    {page.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {page.originalPrice}
                      </span>
                    )}
                  </div>
                  <Badge variant="destructive" className="text-xs mt-1">
                    {page.discount}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{page.conversionRate}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">{page.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{page.leads}</div>
                  <div className="text-xs text-muted-foreground">leads generated</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{page.conversions}</div>
                  <div className="text-xs text-muted-foreground">appointments</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-sm">{page.practice}</div>
                  <div className="text-xs text-muted-foreground">{page.location}</div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge
                      variant={page.isActive ? 'default' : 'secondary'}
                      className="text-xs w-fit"
                    >
                      {page.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    {page.trending && (
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800 w-fit">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => page.id === 1 ? openLeadCaptureInNewTab() : undefined}
                    >
                      <Eye className="h-3 w-3" />
                      {page.id === 1 ? "Preview" : "View"}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <BarChart3 className="h-3 w-3" />
                      Analytics
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Table Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Showing {filteredAndSortedPages.length} landing page{filteredAndSortedPages.length !== 1 ? 's' : ''}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
        <div className="flex items-center gap-4">
          <span>Total Leads: {filteredAndSortedPages.reduce((sum, page) => sum + Number(page.leads), 0)}</span>
          <span>Total Conversions: {filteredAndSortedPages.reduce((sum, page) => sum + Number(page.conversions), 0)}</span>
        </div>
      </div>


    </div>
  )
}
