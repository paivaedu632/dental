"use client"

import { PricingCalculator } from "@/components/features/billing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, TrendingUp, DollarSign, Target } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Usage-Based Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Pay only for the appointments you generate. No waste, no risk, just results.
        </p>
        <div className="flex justify-center gap-4">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <CheckCircle className="h-4 w-4 mr-1" />
            No Long-term Contracts
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <TrendingUp className="h-4 w-4 mr-1" />
            Scales with Success
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <DollarSign className="h-4 w-4 mr-1" />
            Transparent Pricing
          </Badge>
        </div>
      </div>

      {/* Pricing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              First Month
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">$300</div>
              <div className="text-sm text-muted-foreground">Setup Fee</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Includes:</span>
                <span className="font-medium text-green-600">10 free appointments</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Additional appointments:</span>
                <span className="font-medium">$50 each</span>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <div className="text-sm text-muted-foreground">Example: 20 appointments</div>
              <div className="font-semibold">$300 total</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Ongoing Months
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold">$97</div>
              <div className="text-sm text-muted-foreground">Monthly Base</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Includes:</span>
                <span className="font-medium text-green-600">10 free appointments</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Additional appointments:</span>
                <span className="font-medium">$50 each</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <div className="text-sm text-muted-foreground">Example: 20 appointments</div>
              <div className="font-semibold">$597/month</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROI Calculator */}
      <PricingCalculator />

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Why Usage-Based Pricing Works for Dental Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Pay for Performance</h4>
                  <p className="text-sm text-muted-foreground">
                    Only pay when you actually generate appointments. No wasted spend on unused capacity.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Predictable ROI</h4>
                  <p className="text-sm text-muted-foreground">
                    Know exactly what each appointment costs and calculate your return on investment.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Scales with Success</h4>
                  <p className="text-sm text-muted-foreground">
                    As your practice grows, costs scale proportionally with your increased revenue.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">No Risk</h4>
                  <p className="text-sm text-muted-foreground">
                    If you don't generate appointments, you don't pay extra. Your investment is protected.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Transparent Billing</h4>
                  <p className="text-sm text-muted-foreground">
                    Clear, itemized billing with detailed usage tracking. No hidden fees or surprises.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Flexible & Fair</h4>
                  <p className="text-sm text-muted-foreground">
                    Perfect for practices of all sizes. Small practices pay less, growing practices invest more as they earn more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
