"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { GoogleOAuthButton } from "@/components/features/auth"
import {
  BarChart3,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Shield
} from "lucide-react"

export default function SigninPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleEmailSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate signin process
      await new Promise(resolve => setTimeout(resolve, 2000))
      // Redirect to dashboard
      window.location.href = "/ads"
    } catch (error) {
      console.error("Signin error:", error)
    } finally {
      setIsLoading(false)
    }
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
            <span className="text-sm text-muted-foreground">New to Dental Analytics?</span>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <p className="text-muted-foreground">
                Sign in to your Dental Analytics account
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Google Signin */}
              <GoogleOAuthButton 
                mode="signin"
                onSuccess={(user) => {
                  console.log("Google signin successful:", user)
                  window.location.href = "/ads"
                }}
                onError={(error) => {
                  console.error("Google signin error:", error)
                }}
              />

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

              {/* Email Signin Form */}
              <form onSubmit={handleEmailSignin} className="space-y-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      href="/forgot-password" 
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Enter your password"
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

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                  />
                  <Label htmlFor="rememberMe" className="text-sm">
                    Remember me for 30 days
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span>Your data is secure and HIPAA compliant</span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline font-medium">
                    Sign up for free
                  </Link>
                </div>

                <div className="text-xs text-muted-foreground">
                  Need help?{" "}
                  <Link href="/support" className="text-primary hover:underline">
                    Contact Support
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center space-y-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-primary">2,500+</div>
                <div className="text-muted-foreground">Practices</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-primary">$12M+</div>
                <div className="text-muted-foreground">Revenue</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-primary">4.9/5</div>
                <div className="text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
