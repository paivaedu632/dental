"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Mail,
  Lock,
  User,
  Building2,
  Phone,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Users,
  Shield,
  ArrowRight,
  Chrome,
  Eye,
  EyeOff
} from "lucide-react"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    practiceName: "",
    phone: "",
    agreeToTerms: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGoogleSignup = async () => {
    setIsLoading(true)
    // Simulate Google OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000))
    // Redirect to onboarding or dashboard
    window.location.href = "/onboarding"
  }

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate signup process
    await new Promise(resolve => setTimeout(resolve, 2000))
    // Redirect to onboarding or dashboard
    window.location.href = "/onboarding"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BarChart3 className="size-4" />
            </div>
            <span className="font-semibold text-lg">Dental Analytics</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Already have an account?</span>
            <Button variant="outline" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side - Value Proposition */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                Grow Your Dental Practice with Data-Driven Insights
              </h1>
              <p className="text-xl text-muted-foreground">
                Join thousands of dental professionals using our analytics platform to generate more appointments and increase revenue.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Why Dental Analytics?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Usage-Based Pricing</p>
                    <p className="text-sm text-muted-foreground">
                      Pay only for results: $300 setup + $97/month + $50 per appointment
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Proven ROI</p>
                    <p className="text-sm text-muted-foreground">
                      Average 905% return on investment for practices generating 20+ appointments
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Complete Analytics Suite</p>
                    <p className="text-sm text-muted-foreground">
                      Track appointments, analyze competitors, manage campaigns, and optimize ROI
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Expert Support</p>
                    <p className="text-sm text-muted-foreground">
                      24/7 support with 2-hour response guarantee during business hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Highlight */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Transparent Pricing</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Setup Fee (First Month)</span>
                    <span className="font-semibold">$300</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly Base (Ongoing)</span>
                    <span className="font-semibold">$97</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Per Appointment (After 10 free)</span>
                    <span className="font-semibold">$50</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center text-green-700">
                    <span className="text-sm font-medium">Example: 20 appointments</span>
                    <span className="font-bold">$597/month</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Revenue: $6,000 • ROI: 905%
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Proof */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2,500+</div>
                  <div className="text-sm text-muted-foreground">Dental Practices</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$12M+</div>
                  <div className="text-sm text-muted-foreground">Revenue Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="space-y-6">
            <Card className="shadow-xl">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl">Create Your Account</CardTitle>
                <p className="text-muted-foreground">
                  Start your free trial and see results in 24 hours
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Google Signup */}
                <Button
                  onClick={handleGoogleSignup}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full h-12 gap-3"
                >
                  <Chrome className="h-5 w-5" />
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with email
                    </span>
                  </div>
                </div>

                {/* Email Signup Form */}
                <form onSubmit={handleEmailSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Dr. Sarah"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Johnson"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="sarah@dentalcare.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Create a secure password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="practiceName">Practice Name</Label>
                    <Input
                      id="practiceName"
                      value={formData.practiceName}
                      onChange={(e) => handleInputChange("practiceName", e.target.value)}
                      placeholder="Denver Family Dentistry"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                      className="mt-1"
                      required
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !formData.agreeToTerms}
                    className="w-full h-12 gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Need help getting started?{" "}
                    <Link href="/support" className="text-primary hover:underline">
                      Contact Support
                    </Link>
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3" />
                    <span>Your data is secure and HIPAA compliant</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
