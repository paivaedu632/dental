// Billing utilities for usage-based pricing model
// Types are now centralized in src/types/billing.ts

import type {
  PricingTier,
  BillingPeriod,
  UsageStats,
  ROICalculation
} from '@/types/billing'

// Pricing configuration
export const PRICING_CONFIG: PricingTier = {
  name: "Guaranteed Appointment Plan",
  setupFee: 0, // No setup fees - we invest in ads instead
  adSpendInvestment: 300, // 100% goes to TikTok ads
  monthlyBase: 97,
  guaranteedAppointments: 10,
  perAppointmentFee: 50,
  description: "We guarantee your first 10 appointments through our ad investment"
}

// Calculate billing for a specific month
export function calculateMonthlyBilling(
  appointmentCount: number,
  isFirstMonth: boolean = false
): BillingPeriod {
  const config = PRICING_CONFIG
  const currentDate = new Date()

  const adSpendInvestment = isFirstMonth ? config.adSpendInvestment : 0
  const baseFee = config.monthlyBase

  // Calculate usage fee (appointments over the guaranteed limit)
  const billableAppointments = Math.max(0, appointmentCount - config.guaranteedAppointments)
  const usageFee = billableAppointments * config.perAppointmentFee

  const totalFee = adSpendInvestment + baseFee + usageFee

  return {
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
    appointmentCount,
    setupFee: 0, // No setup fees
    adSpendInvestment,
    baseFee,
    usageFee,
    totalFee,
    isFirstMonth
  }
}

// Calculate ROI for a given appointment count and average appointment value
export function calculateROI(
  appointmentCount: number,
  averageAppointmentValue: number,
  isFirstMonth: boolean = false
): ROICalculation {
  const billing = calculateMonthlyBilling(appointmentCount, isFirstMonth)
  const revenue = appointmentCount * averageAppointmentValue
  const cost = billing.totalFee
  const profit = revenue - cost
  const roiPercentage = cost > 0 ? ((profit / cost) * 100) : 0
  const roiRatio = cost > 0 ? `${(revenue / cost).toFixed(1)}:1` : "∞:1"
  
  return {
    revenue,
    cost,
    profit,
    roiPercentage,
    roiRatio
  }
}

// Generate pricing breakdown for different appointment volumes
export function generatePricingBreakdown(isFirstMonth: boolean = false): Array<{
  appointments: number
  cost: number
  revenue: number
  profit: number
  roiRatio: string
}> {
  const appointmentVolumes = [5, 10, 15, 20, 25, 30, 40, 50]
  const averageAppointmentValue = 300 // Default average appointment value
  
  return appointmentVolumes.map(appointments => {
    const roi = calculateROI(appointments, averageAppointmentValue, isFirstMonth)
    return {
      appointments,
      cost: roi.cost,
      revenue: roi.revenue,
      profit: roi.profit,
      roiRatio: roi.roiRatio
    }
  })
}

// Format currency values
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Calculate projected monthly cost based on current usage
export function calculateProjectedCost(
  currentAppointments: number,
  daysElapsed: number,
  daysInMonth: number,
  isFirstMonth: boolean = false
): {
  projectedAppointments: number
  projectedCost: number
  currentCost: number
} {
  const dailyRate = currentAppointments / daysElapsed
  const projectedAppointments = Math.round(dailyRate * daysInMonth)
  
  const projectedBilling = calculateMonthlyBilling(projectedAppointments, isFirstMonth)
  const currentBilling = calculateMonthlyBilling(currentAppointments, isFirstMonth)
  
  return {
    projectedAppointments,
    projectedCost: projectedBilling.totalFee,
    currentCost: currentBilling.totalFee
  }
}

// Get usage statistics (mock data for now)
export function getUsageStats(): UsageStats {
  const currentDate = new Date()
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const dayOfMonth = currentDate.getDate()
  const daysRemaining = daysInMonth - dayOfMonth
  
  // Mock current month data
  const currentAppointments = 12 // Current appointments this month
  const projectedTotal = Math.round((currentAppointments / dayOfMonth) * daysInMonth)
  
  return {
    currentMonth: {
      appointments: currentAppointments,
      projectedTotal,
      daysRemaining
    },
    lastMonth: {
      appointments: 18,
      totalCost: calculateMonthlyBilling(18, false).totalFee
    },
    yearToDate: {
      appointments: 156,
      totalCost: 4250,
      averageMonthly: 19.5
    }
  }
}

// Get billing history (mock data)
export function getBillingHistory(): BillingPeriod[] {
  const history: BillingPeriod[] = []
  const currentDate = new Date()
  
  // Generate last 6 months of billing history
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
    const isFirst = i === 5 // First month in history
    const appointments = Math.floor(Math.random() * 20) + 10 // Random 10-30 appointments
    
    const billing = calculateMonthlyBilling(appointments, isFirst)
    billing.month = date.getMonth() + 1
    billing.year = date.getFullYear()
    
    history.push(billing)
  }
  
  return history
}

// Calculate savings compared to traditional fixed pricing
export function calculateSavingsVsFixed(
  appointmentCount: number,
  fixedPlanCost: number = 299,
  isFirstMonth: boolean = false
): {
  usageCost: number
  fixedCost: number
  savings: number
  savingsPercentage: number
} {
  const usageBilling = calculateMonthlyBilling(appointmentCount, isFirstMonth)
  const usageCost = usageBilling.totalFee
  const fixedCost = isFirstMonth ? fixedPlanCost + 300 : fixedPlanCost // Add setup fee for first month
  const savings = fixedCost - usageCost
  const savingsPercentage = fixedCost > 0 ? ((savings / fixedCost) * 100) : 0
  
  return {
    usageCost,
    fixedCost,
    savings,
    savingsPercentage
  }
}
