"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Users,
  Target,
  AlertCircle,
  CheckCircle,
  Download,
  Eye,
  Calculator
} from "lucide-react"
import {
  getUsageStats,
  getBillingHistory,
  calculateMonthlyBilling,
  formatCurrency,
  PRICING_CONFIG
} from "@/lib/billing"
import { PricingCalculator } from "@/components/features/billing"

export default function UsagePage() {
  const usageStats = getUsageStats()
  const billingHistory = getBillingHistory()
  
  // Calculate current month progress
  const currentDate = new Date()
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const dayOfMonth = currentDate.getDate()
  const monthProgress = (dayOfMonth / daysInMonth) * 100

  // Current month billing calculation
  const currentBilling = calculateMonthlyBilling(usageStats.currentMonth.appointments, false)
  const projectedBilling = calculateMonthlyBilling(usageStats.currentMonth.projectedTotal, false)

  // Chart data for billing history
  const chartData = billingHistory.map(period => ({
    month: `${period.month}/${period.year.toString().slice(-2)}`,
    appointments: period.appointmentCount,
    cost: period.totalFee,
    revenue: period.appointmentCount * 300 // Assuming $300 average
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Usage & Billing</h1>
        <p className="text-muted-foreground mt-2">
          Track your appointment generation and billing with transparent usage-based pricing.
        </p>
      </div>

      {/* Current Month Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Month</p>
                <p className="text-2xl font-bold">{usageStats.currentMonth.appointments}</p>
                <p className="text-xs text-muted-foreground">appointments generated</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Projected Total</p>
                <p className="text-2xl font-bold">{usageStats.currentMonth.projectedTotal}</p>
                <p className="text-xs text-muted-foreground">end of month</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Cost</p>
                <p className="text-2xl font-bold">{formatCurrency(currentBilling.totalFee)}</p>
                <p className="text-xs text-muted-foreground">this month so far</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Projected Cost</p>
                <p className="text-2xl font-bold">{formatCurrency(projectedBilling.totalFee)}</p>
                <p className="text-xs text-muted-foreground">end of month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Month Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Month Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Days elapsed: {dayOfMonth} of {daysInMonth}</span>
              <span>{usageStats.currentMonth.daysRemaining} days remaining</span>
            </div>
            <Progress value={monthProgress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium">Free Appointments Used</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">
                  {Math.min(usageStats.currentMonth.appointments, PRICING_CONFIG.freeAppointments)}
                </span>
                <span className="text-sm text-muted-foreground">
                  of {PRICING_CONFIG.freeAppointments} free
                </span>
              </div>
              <Progress 
                value={(Math.min(usageStats.currentMonth.appointments, PRICING_CONFIG.freeAppointments) / PRICING_CONFIG.freeAppointments) * 100} 
                className="h-2 mt-2" 
              />
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <span className="font-medium">Billable Appointments</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">
                  {Math.max(0, usageStats.currentMonth.appointments - PRICING_CONFIG.freeAppointments)}
                </span>
                <span className="text-sm text-muted-foreground">
                  × ${PRICING_CONFIG.perAppointmentFee} each
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Cost: {formatCurrency(Math.max(0, usageStats.currentMonth.appointments - PRICING_CONFIG.freeAppointments) * PRICING_CONFIG.perAppointmentFee)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <p className="text-sm text-muted-foreground">
            Track your appointment generation and costs over time
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'appointments' ? `${value} appointments` : formatCurrency(Number(value)),
                    name === 'appointments' ? 'Appointments' : name === 'cost' ? 'Cost' : 'Revenue'
                  ]}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="appointments"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cost"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Billing History</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {billingHistory.slice(0, 6).map((period, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {new Date(period.year, period.month - 1).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                    {period.isFirstMonth && (
                      <Badge variant="secondary">Setup Month</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {period.appointmentCount} appointments • 
                    {period.isFirstMonth ? ' Setup fee' : ` Base $${period.baseFee} + Usage $${period.usageFee}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(period.totalFee)}</p>
                  <p className="text-sm text-muted-foreground">
                    ROI: {((period.appointmentCount * 300 / period.totalFee) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ROI Calculator */}
      <PricingCalculator />
    </div>
  )
}
