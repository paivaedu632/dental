// Billing and pricing related types
// Centralized billing types for the usage-based pricing model

import { ID, UUID, Status } from './common'

// Core billing types
export interface PricingTier {
  name: string
  setupFee: number // Always 0 - no setup fees
  adSpendInvestment?: number // Investment in TikTok ads
  monthlyBase: number
  guaranteedAppointments: number // Appointments guaranteed from ad spend
  freeAppointments?: number // Legacy field for compatibility
  perAppointmentFee: number
  description: string
}

export interface BillingPeriod {
  month: number
  year: number
  appointmentCount: number
  setupFee: number // Always 0
  adSpendInvestment?: number // First month ad investment
  baseFee: number
  usageFee: number
  totalFee: number
  isFirstMonth: boolean
}

export interface UsageStats {
  currentMonth: {
    appointments: number
    projectedTotal: number
    daysRemaining: number
  }
  lastMonth: {
    appointments: number
    totalCost: number
  }
  yearToDate: {
    appointments: number
    totalCost: number
    averageMonthly: number
  }
}

// ROI calculation types
export interface ROICalculation {
  revenue: number
  cost: number
  profit: number
  roiPercentage: number
  roiRatio: string
}

// Payment and billing history types
export interface PaymentMethod {
  id: UUID
  type: PaymentMethodType
  last4: string
  expiryMonth: number
  expiryYear: number
  brand: string
  isDefault: boolean
  createdAt: Date
}

export type PaymentMethodType = 'credit_card' | 'debit_card' | 'bank_account' | 'paypal'

export interface Invoice {
  id: UUID
  invoiceNumber: string
  billingPeriod: BillingPeriod
  status: InvoiceStatus
  dueDate: Date
  paidDate?: Date
  paymentMethod?: PaymentMethod
  lineItems: InvoiceLineItem[]
  subtotal: number
  tax: number
  total: number
  createdAt: Date
}

export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled'

export interface InvoiceLineItem {
  id: UUID
  description: string
  quantity: number
  unitPrice: number
  total: number
  type: LineItemType
}

export type LineItemType = 'setup_fee' | 'monthly_base' | 'appointment_fee' | 'tax' | 'discount'

// Subscription and plan types
export interface Subscription {
  id: UUID
  practiceId: UUID
  plan: PricingTier
  status: SubscriptionStatus
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  cancelledAt?: Date
  createdAt: Date
  updatedAt: Date
}

export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due' | 'unpaid' | 'trialing'

// Billing settings and preferences
export interface BillingSettings {
  practiceId: UUID
  paymentMethod?: PaymentMethod
  billingEmail: string
  invoiceDelivery: InvoiceDeliveryMethod
  autoPayEnabled: boolean
  billingAddress: BillingAddress
  taxSettings: TaxSettings
}

export type InvoiceDeliveryMethod = 'email' | 'postal' | 'both'

export interface BillingAddress {
  name: string
  company?: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface TaxSettings {
  taxId?: string
  taxExempt: boolean
  taxRate: number
  taxRegion: string
}

// Usage tracking types
export interface UsageRecord {
  id: UUID
  practiceId: UUID
  date: Date
  appointmentCount: number
  billingPeriodId: UUID
  createdAt: Date
}

// Billing component props
export interface BillingComponentProps {
  className?: string
}

export interface PricingCalculatorProps extends BillingComponentProps {
  defaultAppointments?: number
  defaultAppointmentValue?: number
  onCalculationChange?: (calculation: ROICalculation) => void
}
