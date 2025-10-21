"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Clock,
  Star,
  Phone,
  Calendar,
  CheckCircle,
  X,
  User,
  Mail
} from "lucide-react"

export interface LeadCapturePageProps {
  isOpen: boolean
  onClose: () => void
}

export function LeadCapturePageComponent({ isOpen, onClose }: LeadCapturePageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // You can add actual form submission logic here
    alert('Thank you! We will contact you soon to schedule your appointment.')
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const customerReviews = [
    {
      name: "Sarah Johnson",
      review: "Dr. Susan and her team are amazing! The $29 special was perfect for getting started. My teeth have never felt cleaner!",
      rating: 5
    },
    {
      name: "Michael Chen",
      review: "Great value and excellent service. The X-rays were thorough and the cleaning was gentle. Highly recommend!",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      review: "I was nervous about finding a new dentist, but this special offer made it easy to try. Now I'm a regular patient!",
      rating: 5
    }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>New Patient Special Offer</DialogTitle>
        </DialogHeader>
        
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-4 z-10 h-8 w-8 p-0 bg-white/80 hover:bg-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="bg-gradient-to-br from-blue-50 to-white">
          {/* Urgency Banner */}
          <div className="bg-red-600 text-white text-center py-3 px-4">
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="font-bold text-lg">Offer Expires 08/31/25</span>
            </div>
          </div>

          <div className="p-6 lg:p-8">
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              
              {/* Left Column - Offer Details */}
              <div className="space-y-6">
                {/* Main Headline */}
                <div className="space-y-4">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    Get Dr. Susan&apos;s{" "}
                    <span className="text-blue-600">$29 NEW PATIENT</span>{" "}
                    <span className="text-green-600">SPECIAL OFFER</span>
                  </h1>
                  
                  {/* Service Description */}
                  <p className="text-xl text-gray-700 font-medium">
                    X-Rays and free teeth cleaning
                  </p>
                </div>

                {/* Pricing */}
                <div className="bg-white rounded-lg p-6 border-2 border-blue-200 shadow-lg">
                  <div className="text-center space-y-2">
                    <div className="text-gray-500">
                      <span className="text-2xl line-through">$299</span>
                      <span className="ml-2 text-sm">Regular Price</span>
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold text-green-600">
                      Only $29!
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      Save $270 Today!
                    </Badge>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-gray-900">What&apos;s Included:</h3>
                  <div className="space-y-2">
                    {[
                      "Complete digital X-rays",
                      "Professional teeth cleaning",
                      "Comprehensive oral examination",
                      "Personalized treatment plan"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Hero Image & Form */}
              <div className="space-y-6">
                {/* Hero Image */}
                <div className="relative">
                  <img
                    src="https://assets.cdn.filesafe.space/TIGHsMRsRBTsdlSmWzuz/media/6606512570e7b62983dbc52a.png"
                    alt="Dr. Susan - Professional Dental Care"
                    className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm font-medium">4.9/5 Rating</span>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <Card className="border-2 border-blue-200">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          Book Your $29 Appointment
                        </h3>
                        <p className="text-sm text-gray-600">
                          Limited time offer - Act now!
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-sm font-medium">
                            Full Name *
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="name"
                              type="text"
                              placeholder="Enter your full name"
                              className="pl-10"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email Address *
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              className="pl-10"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="phone" className="text-sm font-medium">
                            Phone Number *
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="(555) 123-4567"
                              className="pl-10"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg"
                        size="lg"
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        BOOK MY APPOINTMENT NOW!
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        By submitting, you agree to receive appointment reminders via text/email.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
