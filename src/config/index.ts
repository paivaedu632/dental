// Configuration module exports
// Central export point for all configuration-related functionality

// Environment configuration
export {
  config,
  env,
  getConfig,
  getFeatureFlag,
  isFeatureEnabled,
  getEnvironmentInfo,
  setRuntimeConfig,
  getRuntimeConfig,
  clearRuntimeConfig,
} from './environment'

export type {
  Environment,
  AppConfig,
} from './environment'

// Application constants
export const APP_CONFIG = {
  // Application info
  name: 'DentalFlow',
  version: '1.0.0',
  description: 'Modern dental practice management system',
  
  // URLs and endpoints
  urls: {
    website: 'https://dentalflow.com',
    support: 'https://support.dentalflow.com',
    docs: 'https://docs.dentalflow.com',
    status: 'https://status.dentalflow.com',
  },

  // Contact information
  contact: {
    email: 'support@dentalflow.com',
    phone: '+1 (555) 123-4567',
    address: '123 Dental Street, Suite 100, City, State 12345',
  },

  // Social media
  social: {
    twitter: 'https://twitter.com/dentalflow',
    linkedin: 'https://linkedin.com/company/dentalflow',
    facebook: 'https://facebook.com/dentalflow',
  },

  // Legal
  legal: {
    termsUrl: '/terms',
    privacyUrl: '/privacy',
    cookieUrl: '/cookies',
  },

  // Limits and constraints
  limits: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxFilesPerUpload: 5,
    maxAppointmentsPerDay: 50,
    maxStaffMembers: 20,
    sessionTimeout: 4 * 60 * 60 * 1000, // 4 hours
  },

  // Default values
  defaults: {
    appointmentDuration: 30, // minutes
    bufferTime: 15, // minutes
    workingHours: {
      start: '09:00',
      end: '17:00',
    },
    pagination: {
      pageSize: 20,
      maxPageSize: 100,
    },
    theme: 'system' as const,
    language: 'en',
    timezone: 'UTC',
  },

  // Feature rollout percentages (for gradual rollouts)
  rollout: {
    betaFeatures: 10, // 10% of users
    newBillingSystem: 25, // 25% of users
    advancedAnalytics: 50, // 50% of users
  },
} as const

// API endpoints configuration
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
    changePassword: '/auth/change-password',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },

  // Practice management
  practice: {
    base: '/practice',
    staff: '/practice/staff',
    settings: '/practice/settings',
    locations: '/practice/locations',
  },

  // Appointments
  appointments: {
    base: '/appointments',
    availableSlots: '/appointments/available-slots',
    cancel: (id: string) => `/appointments/${id}/cancel`,
    reschedule: (id: string) => `/appointments/${id}/reschedule`,
  },

  // Billing
  billing: {
    current: '/billing/current',
    history: '/billing/history',
    usage: '/billing/usage',
    paymentMethods: '/billing/payment-methods',
    invoices: '/billing/invoices',
    downloadInvoice: (id: string) => `/billing/invoices/${id}/download`,
  },

  // Files
  files: {
    upload: '/files/upload',
    download: (id: string) => `/files/${id}/download`,
    info: (id: string) => `/files/${id}`,
    delete: (id: string) => `/files/${id}`,
  },

  // Search
  search: {
    global: '/search',
    appointments: '/search/appointments',
    patients: '/search/patients',
    staff: '/search/staff',
  },

  // Analytics
  analytics: {
    dashboard: '/analytics/dashboard',
    appointments: '/analytics/appointments',
    billing: '/analytics/billing',
    events: '/analytics/events',
  },

  // Notifications
  notifications: {
    base: '/notifications',
    preferences: '/notifications/preferences',
    markRead: (id: string) => `/notifications/${id}/read`,
    markAllRead: '/notifications/read-all',
  },

  // System
  system: {
    health: '/health',
    version: '/version',
    status: '/status',
  },
} as const

// UI configuration
export const UI_CONFIG = {
  // Breakpoints (matching Tailwind CSS)
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },

  // Animation durations
  animations: {
    fast: 150,
    normal: 300,
    slow: 500,
  },

  // Z-index layers
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
  },

  // Component sizes
  sizes: {
    sidebar: {
      collapsed: 64,
      expanded: 256,
    },
    header: 64,
    footer: 80,
  },

  // Color palette (semantic colors)
  colors: {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    success: 'hsl(142, 76%, 36%)',
    warning: 'hsl(38, 92%, 50%)',
    error: 'hsl(0, 84%, 60%)',
    info: 'hsl(217, 91%, 60%)',
  },
} as const

// Validation rules
export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]+$/,
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  },
  name: {
    minLength: 2,
    maxLength: 50,
  },
  practice: {
    name: {
      minLength: 2,
      maxLength: 100,
    },
  },
} as const

// Error messages
export const ERROR_MESSAGES = {
  // Generic errors
  generic: 'An unexpected error occurred. Please try again.',
  network: 'Network error. Please check your connection and try again.',
  timeout: 'Request timed out. Please try again.',
  unauthorized: 'You are not authorized to perform this action.',
  forbidden: 'Access denied.',
  notFound: 'The requested resource was not found.',
  serverError: 'Server error. Please try again later.',

  // Validation errors
  validation: {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    phone: 'Please enter a valid phone number.',
    password: 'Password must be at least 8 characters long.',
    passwordMatch: 'Passwords do not match.',
    minLength: (min: number) => `Must be at least ${min} characters long.`,
    maxLength: (max: number) => `Must be no more than ${max} characters long.`,
  },

  // Authentication errors
  auth: {
    invalidCredentials: 'Invalid email or password.',
    sessionExpired: 'Your session has expired. Please sign in again.',
    accountLocked: 'Your account has been locked. Please contact support.',
    emailNotVerified: 'Please verify your email address before signing in.',
  },

  // Billing errors
  billing: {
    paymentFailed: 'Payment failed. Please check your payment method.',
    insufficientFunds: 'Insufficient funds. Please update your payment method.',
    cardExpired: 'Your card has expired. Please update your payment method.',
    subscriptionCancelled: 'Your subscription has been cancelled.',
  },
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  // Generic success
  saved: 'Changes saved successfully.',
  deleted: 'Item deleted successfully.',
  created: 'Item created successfully.',
  updated: 'Item updated successfully.',

  // Authentication
  auth: {
    signedIn: 'Signed in successfully.',
    signedOut: 'Signed out successfully.',
    passwordChanged: 'Password changed successfully.',
    passwordReset: 'Password reset email sent.',
  },

  // Billing
  billing: {
    paymentSuccessful: 'Payment processed successfully.',
    subscriptionUpdated: 'Subscription updated successfully.',
    paymentMethodAdded: 'Payment method added successfully.',
  },

  // Appointments
  appointments: {
    scheduled: 'Appointment scheduled successfully.',
    cancelled: 'Appointment cancelled successfully.',
    rescheduled: 'Appointment rescheduled successfully.',
  },
} as const

// Cache keys
export const CACHE_KEYS = {
  user: 'user',
  practice: 'practice',
  staff: 'staff',
  appointments: 'appointments',
  billing: 'billing',
  notifications: 'notifications',
  settings: 'settings',
} as const

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'dentalflow-theme',
  sidebarCollapsed: 'dentalflow-sidebar-collapsed',
  userPreferences: 'dentalflow-user-preferences',
  authTokens: 'dentalflow-auth-tokens',
  lastRoute: 'dentalflow-last-route',
} as const

// Export all configurations
export const configurations = {
  app: APP_CONFIG,
  api: API_ENDPOINTS,
  ui: UI_CONFIG,
  validation: VALIDATION_RULES,
  errors: ERROR_MESSAGES,
  success: SUCCESS_MESSAGES,
  cache: CACHE_KEYS,
  storage: STORAGE_KEYS,
} as const
