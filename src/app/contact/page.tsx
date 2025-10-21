"use client"

import { SupportContactForm } from "@/components/features/support"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  Headphones,
  CheckCircle
} from "lucide-react"

export default function ContactPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Contact Support</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get in touch with our dental analytics experts. We're here to help you maximize your practice's success.
        </p>
        <div className="flex justify-center">
          <Badge variant="secondary" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Average response time: 2 hours
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <SupportContactForm />
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@dentalanalytics.com</p>
                  <p className="text-xs text-muted-foreground">Response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">1-800-DENTAL-1</p>
                  <p className="text-xs text-muted-foreground">Mon-Fri 8AM-8PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-muted-foreground">Available on all pages</p>
                  <p className="text-xs text-muted-foreground">Instant responses</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Headphones className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium">Emergency Line</p>
                  <p className="text-sm text-muted-foreground">1-800-URGENT-1</p>
                  <p className="text-xs text-muted-foreground">24/7 critical issues</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Support Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Monday - Friday</span>
                  <span className="text-sm font-medium">8:00 AM - 8:00 PM EST</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Saturday</span>
                  <span className="text-sm font-medium">9:00 AM - 5:00 PM EST</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sunday</span>
                  <span className="text-sm font-medium">Closed</span>
                </div>
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">Currently Online</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Our support team is available to help you right now
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Office Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Our Office
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">Dental Analytics HQ</p>
                <p className="text-sm text-muted-foreground">
                  123 Healthcare Drive<br />
                  Suite 400<br />
                  Denver, CO 80202<br />
                  United States
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Response Time Guarantee */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Response Time Guarantee</p>
                  <p className="text-sm text-blue-700">
                    We guarantee a response to all support requests within 2 hours during business hours, 
                    or your next month is free.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Quick answers to common questions
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">How does billing work?</h4>
                <p className="text-sm text-muted-foreground">
                  We use usage-based pricing: $300 setup fee (includes 10 free appointments), 
                  then $97/month + $50 per appointment after the first 10.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Can I cancel anytime?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can cancel your subscription at any time. No long-term contracts required.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Do you offer training?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, we provide comprehensive onboarding and ongoing training to help you 
                  maximize your ROI.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">What integrations do you support?</h4>
                <p className="text-sm text-muted-foreground">
                  We integrate with major practice management systems like Dentrix, Eaglesoft, 
                  and Open Dental.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Is my data secure?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, we use enterprise-grade security with HIPAA compliance and encrypted 
                  data storage.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">How quickly can I get started?</h4>
                <p className="text-sm text-muted-foreground">
                  Most practices are up and running within 24 hours of signing up, 
                  including data integration.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
