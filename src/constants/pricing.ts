// Pricing constants for DentalFlow dashboard

// Usage-based pricing model
export const PRICING = {
  SETUP_FEE: 300,
  MONTHLY_BASE: 97,
  COST_PER_APPOINTMENT: 50,
  FREE_APPOINTMENTS_PER_MONTH: 10,
  CURRENCY: 'USD'
} as const

// Pricing tiers and features
export const PRICING_TIERS = {
  STARTER: {
    name: 'Starter',
    setupFee: PRICING.SETUP_FEE,
    monthlyFee: PRICING.MONTHLY_BASE,
    freeAppointments: PRICING.FREE_APPOINTMENTS_PER_MONTH,
    costPerExtraAppointment: PRICING.COST_PER_APPOINTMENT,
    features: [
      'Up to 10 appointments/month included',
      'Basic analytics dashboard',
      'Email support',
      'Standard integrations'
    ]
  },
  PROFESSIONAL: {
    name: 'Professional',
    setupFee: PRICING.SETUP_FEE,
    monthlyFee: PRICING.MONTHLY_BASE,
    freeAppointments: 25,
    costPerExtraAppointment: 45,
    features: [
      'Up to 25 appointments/month included',
      'Advanced analytics dashboard',
      'Priority email support',
      'All integrations',
      'Custom reporting'
    ]
  },
  ENTERPRISE: {
    name: 'Enterprise',
    setupFee: 0,
    monthlyFee: 297,
    freeAppointments: 100,
    costPerExtraAppointment: 35,
    features: [
      'Up to 100 appointments/month included',
      'Full analytics suite',
      'Phone & email support',
      'All integrations',
      'Custom reporting',
      'Dedicated account manager',
      'API access'
    ]
  }
} as const

// Billing cycles
export const BILLING_CYCLES = {
  MONTHLY: {
    label: 'Monthly',
    value: 'monthly',
    discount: 0
  },
  YEARLY: {
    label: 'Yearly',
    value: 'yearly',
    discount: 0.15 // 15% discount
  }
} as const

// Usage calculation helpers
export const USAGE_CALCULATIONS = {
  calculateMonthlyTotal: (appointments: number, tier: keyof typeof PRICING_TIERS = 'STARTER') => {
    const tierConfig = PRICING_TIERS[tier]
    const extraAppointments = Math.max(0, appointments - tierConfig.freeAppointments)
    const extraCost = extraAppointments * tierConfig.costPerExtraAppointment
    return tierConfig.monthlyFee + extraCost
  },
  
  calculateYearlyTotal: (monthlyAppointments: number, tier: keyof typeof PRICING_TIERS = 'STARTER') => {
    const monthlyTotal = USAGE_CALCULATIONS.calculateMonthlyTotal(monthlyAppointments, tier)
    const yearlyTotal = monthlyTotal * 12
    const discount = yearlyTotal * BILLING_CYCLES.YEARLY.discount
    return yearlyTotal - discount
  },
  
  calculateSetupCost: (tier: keyof typeof PRICING_TIERS = 'STARTER') => {
    return PRICING_TIERS[tier].setupFee
  }
} as const

// Feature limits by tier
export const FEATURE_LIMITS = {
  STARTER: {
    maxUsers: 3,
    maxIntegrations: 5,
    maxReports: 10,
    dataRetention: 90, // days
    apiCalls: 1000 // per month
  },
  PROFESSIONAL: {
    maxUsers: 10,
    maxIntegrations: 15,
    maxReports: 50,
    dataRetention: 365, // days
    apiCalls: 5000 // per month
  },
  ENTERPRISE: {
    maxUsers: -1, // unlimited
    maxIntegrations: -1, // unlimited
    maxReports: -1, // unlimited
    dataRetention: -1, // unlimited
    apiCalls: 25000 // per month
  }
} as const

// Payment methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  BANK_TRANSFER: 'bank_transfer',
  PAYPAL: 'paypal'
} as const

// Discount codes (for future use)
export const DISCOUNT_CODES = {
  NEW_CUSTOMER: {
    code: 'WELCOME20',
    discount: 0.20,
    type: 'percentage',
    validFor: 'first_month'
  },
  YEARLY_SPECIAL: {
    code: 'YEARLY25',
    discount: 0.25,
    type: 'percentage',
    validFor: 'yearly_plans'
  }
} as const
