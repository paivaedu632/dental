"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  CreditCard, 
  Edit, 
  Trash2, 
  Download 
} from "lucide-react"

export interface BillingSettingsProps {
  className?: string
}

export function BillingSettings({ className }: BillingSettingsProps) {
  // Mock current usage data
  const currentUsage = {
    currentMonth: {
      appointments: 12,
      projectedTotal: 22,
      daysRemaining: 18
    },
    lastMonth: {
      appointments: 18,
      totalCost: 497 // $97 base + (8 × $50)
    },
    setupComplete: false // First month
  }

  const projectedCost = currentUsage.setupComplete
    ? 97 + Math.max(0, currentUsage.currentMonth.projectedTotal - 10) * 50
    : 300 // Setup fee for first month

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-medium">Billing & Payments</h3>
        <p className="text-sm text-muted-foreground">
          Usage-based pricing that scales with your success
        </p>
      </div>

      {/* Current Usage & Billing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Usage & Billing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {currentUsage.currentMonth.appointments}
              </div>
              <div className="text-sm text-muted-foreground">
                Appointments This Month
              </div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {currentUsage.currentMonth.projectedTotal}
              </div>
              <div className="text-sm text-muted-foreground">
                Projected Monthly Total
              </div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                ${projectedCost}
              </div>
              <div className="text-sm text-muted-foreground">
                Projected Monthly Cost
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Usage-Based Plan</span>
              <Badge>Active</Badge>
            </div>
            <div className="space-y-2 text-sm">
              {!currentUsage.setupComplete && (
                <div className="flex justify-between">
                  <span>Setup Fee (First Month)</span>
                  <span className="font-medium">$300</span>
                </div>
              )}
              {currentUsage.setupComplete && (
                <div className="flex justify-between">
                  <span>Monthly Base Fee</span>
                  <span className="font-medium">$97</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Free Appointments</span>
                <span className="font-medium text-green-600">10 included</span>
              </div>
              <div className="flex justify-between">
                <span>Additional Appointments</span>
                <span className="font-medium">$50 each</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="gap-2">
              <TrendingUp className="h-4 w-4" />
              View Usage Details
            </Button>
            <Button variant="outline">Billing History</Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5" />
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/26</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Billing History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">January 2025</p>
                <p className="text-sm text-muted-foreground">
                  18 appointments • Base $97 + Usage $400
                </p>
                <p className="text-xs text-muted-foreground">Paid Jan 15, 2025</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">$497.00</span>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">December 2024</p>
                <p className="text-sm text-muted-foreground">
                  15 appointments • Base $97 + Usage $250
                </p>
                <p className="text-xs text-muted-foreground">Paid Dec 15, 2024</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">$347.00</span>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
          <Button variant="outline">View All Invoices</Button>
        </CardContent>
      </Card>
    </div>
  )
}
