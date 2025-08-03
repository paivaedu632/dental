"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Target,
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react"
import {
  calculateMonthlyBilling,
  calculateROI,
  formatCurrency,
  PRICING_CONFIG
} from "@/lib/billing"

interface PricingCalculatorProps {
  className?: string
}

export function PricingCalculator({ className }: PricingCalculatorProps) {
  const [appointments, setAppointments] = useState(20)
  const [appointmentValue, setAppointmentValue] = useState(300)
  const [isFirstMonth, setIsFirstMonth] = useState(false)

  const billing = calculateMonthlyBilling(appointments, isFirstMonth)
  const roi = calculateROI(appointments, appointmentValue, isFirstMonth)

  const handleAppointmentChange = (value: string) => {
    const num = parseInt(value) || 0
    setAppointments(Math.max(0, Math.min(100, num)))
  }

  const handleValueChange = (value: string) => {
    const num = parseInt(value) || 0
    setAppointmentValue(Math.max(0, Math.min(2000, num)))
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            ROI Calculator
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Calculate your return on investment with our usage-based pricing
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appointments">Monthly Appointments</Label>
              <Input
                id="appointments"
                type="number"
                min="0"
                max="100"
                value={appointments}
                onChange={(e) => handleAppointmentChange(e.target.value)}
                className="text-center font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointmentValue">Average Appointment Value</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="appointmentValue"
                  type="number"
                  min="0"
                  max="2000"
                  value={appointmentValue}
                  onChange={(e) => handleValueChange(e.target.value)}
                  className="pl-8 text-center font-medium"
                />
              </div>
            </div>
          </div>

          {/* Month Type Toggle */}
          <div className="flex items-center gap-4">
            <Label>Billing Period:</Label>
            <div className="flex gap-2">
              <Button
                variant={isFirstMonth ? "default" : "outline"}
                size="sm"
                onClick={() => setIsFirstMonth(true)}
              >
                First Month
              </Button>
              <Button
                variant={!isFirstMonth ? "default" : "outline"}
                size="sm"
                onClick={() => setIsFirstMonth(false)}
              >
                Ongoing Months
              </Button>
            </div>
          </div>

          <Separator />

          {/* Cost Breakdown */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Cost Breakdown
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                {isFirstMonth && (
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Setup Fee</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(billing.setupFee)}
                    </span>
                  </div>
                )}
                
                {!isFirstMonth && (
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Monthly Base</span>
                    <span className="font-semibold">
                      {formatCurrency(billing.baseFee)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium">Free Appointments</span>
                    <p className="text-xs text-muted-foreground">First {PRICING_CONFIG.freeAppointments} included</p>
                  </div>
                  <span className="font-semibold text-green-600">
                    {Math.min(appointments, PRICING_CONFIG.freeAppointments)} × $0
                  </span>
                </div>

                {appointments > PRICING_CONFIG.freeAppointments && (
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <span className="text-sm font-medium">Additional Appointments</span>
                      <p className="text-xs text-muted-foreground">
                        {appointments - PRICING_CONFIG.freeAppointments} × ${PRICING_CONFIG.perAppointmentFee}
                      </p>
                    </div>
                    <span className="font-semibold text-orange-600">
                      {formatCurrency(billing.usageFee)}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Total Monthly Cost</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(billing.totalFee)}
                    </p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-green-50">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(roi.revenue)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* ROI Results */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Return on Investment
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Monthly Profit</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(roi.profit)}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <Zap className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">ROI Percentage</p>
                  <p className="text-xl font-bold text-blue-600">
                    {roi.roiPercentage.toFixed(0)}%
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">ROI Ratio</p>
                  <p className="text-xl font-bold text-purple-600">
                    {roi.roiRatio}
                  </p>
                </CardContent>
              </Card>
            </div>

            {roi.roiPercentage > 500 && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="font-semibold text-green-800">Excellent ROI!</p>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Your return on investment is outstanding. For every $1 you spend, you generate ${(roi.revenue / roi.cost).toFixed(2)} in revenue.
                </p>
              </div>
            )}
          </div>

          <Separator />

          {/* Pricing Highlights */}
          <div className="space-y-3">
            <h4 className="font-semibold">Why Usage-Based Pricing Works</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Pay for Performance</p>
                  <p className="text-xs text-muted-foreground">Only pay when you generate appointments</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Scalable Costs</p>
                  <p className="text-xs text-muted-foreground">Costs grow with your success</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">No Waste</p>
                  <p className="text-xs text-muted-foreground">Don't pay for unused capacity</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Predictable ROI</p>
                  <p className="text-xs text-muted-foreground">Clear cost per appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <Button className="w-full" size="lg">
              Get Started with Usage-Based Pricing
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
