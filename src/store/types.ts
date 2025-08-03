// Global state management types
// Defines the structure and types for application-wide state

import type { User, Practice, BillingPeriod, PricingTier } from '@/types'

// Application state structure
export interface AppState {
  // User and authentication state
  user: UserState
  
  // Practice and business state
  practice: PracticeState
  
  // Billing and usage state
  billing: BillingState
  
  // UI and application state
  ui: UIState
  
  // Settings and preferences
  settings: SettingsState
  
  // Cache and performance state
  cache: CacheState
}

// User authentication and profile state
export interface UserState {
  currentUser: User | null
  isAuthenticated: boolean
  isLoading: boolean
  permissions: string[]
  preferences: UserPreferences
  lastActivity: Date | null
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  dashboard: {
    defaultView: string
    compactMode: boolean
  }
}

// Practice and business state
export interface PracticeState {
  currentPractice: Practice | null
  isLoading: boolean
  settings: PracticeSettings
  staff: StaffMember[]
  locations: PracticeLocation[]
}

export interface PracticeSettings {
  businessHours: BusinessHours[]
  appointmentSettings: {
    defaultDuration: number
    bufferTime: number
    maxAdvanceBooking: number
    allowOnlineBooking: boolean
  }
  billing: {
    currency: string
    taxRate: number
    paymentMethods: string[]
  }
}

export interface StaffMember {
  id: string
  name: string
  role: 'dentist' | 'hygienist' | 'assistant' | 'admin'
  email: string
  permissions: string[]
  isActive: boolean
}

export interface PracticeLocation {
  id: string
  name: string
  address: string
  phone: string
  isMain: boolean
}

export interface BusinessHours {
  dayOfWeek: number
  openTime: string
  closeTime: string
  isOpen: boolean
}

// Billing and usage state
export interface BillingState {
  currentPeriod: BillingPeriod | null
  usage: UsageMetrics
  pricing: PricingTier | null
  paymentMethods: PaymentMethod[]
  invoices: Invoice[]
  isLoading: boolean
}

export interface UsageMetrics {
  currentMonth: {
    appointmentCount: number
    setupFee: number
    baseFee: number
    usageFee: number
    totalFee: number
  }
  previousMonth: {
    appointmentCount: number
    totalFee: number
  }
  yearToDate: {
    totalAppointments: number
    totalFees: number
    averageMonthlyFee: number
  }
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'bank' | 'paypal'
  last4: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface Invoice {
  id: string
  periodStart: Date
  periodEnd: Date
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  dueDate: Date
  paidDate?: Date
}

// UI and application state
export interface UIState {
  // Navigation state
  sidebarCollapsed: boolean
  currentPage: string
  breadcrumbs: Breadcrumb[]
  
  // Modal and dialog state
  modals: ModalState[]
  
  // Loading and error state
  globalLoading: boolean
  errors: ErrorState[]
  notifications: NotificationState[]
  
  // Theme and layout
  theme: 'light' | 'dark' | 'system'
  layout: 'default' | 'compact' | 'wide'
}

export interface Breadcrumb {
  label: string
  href?: string
  isActive: boolean
}

export interface ModalState {
  id: string
  type: string
  isOpen: boolean
  data?: any
}

export interface ErrorState {
  id: string
  message: string
  type: 'error' | 'warning' | 'info'
  timestamp: Date
  dismissed: boolean
}

export interface NotificationState {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  timestamp: Date
  read: boolean
  actions?: NotificationAction[]
}

export interface NotificationAction {
  label: string
  action: () => void
  variant?: 'default' | 'destructive'
}

// Settings and preferences state
export interface SettingsState {
  activeTab: string
  isDirty: boolean
  savedSettings: Record<string, any>
  pendingChanges: Record<string, any>
}

// Cache and performance state
export interface CacheState {
  // API response cache
  apiCache: Map<string, CacheEntry>
  
  // Component state cache
  componentCache: Map<string, any>
  
  // Performance metrics
  performance: PerformanceMetrics
}

export interface CacheEntry {
  data: any
  timestamp: Date
  ttl: number
  key: string
}

export interface PerformanceMetrics {
  pageLoadTimes: Record<string, number[]>
  renderTimes: Record<string, number[]>
  apiResponseTimes: Record<string, number[]>
  memoryUsage: number[]
}

// Action types for state updates
export type AppAction =
  | UserAction
  | PracticeAction
  | BillingAction
  | UIAction
  | SettingsAction
  | CacheAction

// User actions
export type UserAction =
  | { type: 'USER_LOGIN'; payload: User }
  | { type: 'USER_LOGOUT' }
  | { type: 'USER_UPDATE'; payload: Partial<User> }
  | { type: 'USER_SET_LOADING'; payload: boolean }
  | { type: 'USER_SET_PREFERENCES'; payload: Partial<UserPreferences> }

// Practice actions
export type PracticeAction =
  | { type: 'PRACTICE_SET'; payload: Practice }
  | { type: 'PRACTICE_UPDATE'; payload: Partial<Practice> }
  | { type: 'PRACTICE_SET_LOADING'; payload: boolean }
  | { type: 'PRACTICE_ADD_STAFF'; payload: StaffMember }
  | { type: 'PRACTICE_UPDATE_STAFF'; payload: { id: string; updates: Partial<StaffMember> } }

// Billing actions
export type BillingAction =
  | { type: 'BILLING_SET_PERIOD'; payload: BillingPeriod }
  | { type: 'BILLING_UPDATE_USAGE'; payload: Partial<UsageMetrics> }
  | { type: 'BILLING_SET_LOADING'; payload: boolean }
  | { type: 'BILLING_ADD_PAYMENT_METHOD'; payload: PaymentMethod }
  | { type: 'BILLING_ADD_INVOICE'; payload: Invoice }

// UI actions
export type UIAction =
  | { type: 'UI_TOGGLE_SIDEBAR' }
  | { type: 'UI_SET_SIDEBAR'; payload: boolean }
  | { type: 'UI_SET_PAGE'; payload: string }
  | { type: 'UI_SET_BREADCRUMBS'; payload: Breadcrumb[] }
  | { type: 'UI_OPEN_MODAL'; payload: { id: string; type: string; data?: any } }
  | { type: 'UI_CLOSE_MODAL'; payload: string }
  | { type: 'UI_ADD_ERROR'; payload: Omit<ErrorState, 'id' | 'timestamp' | 'dismissed'> }
  | { type: 'UI_DISMISS_ERROR'; payload: string }
  | { type: 'UI_ADD_NOTIFICATION'; payload: Omit<NotificationState, 'id' | 'timestamp' | 'read'> }
  | { type: 'UI_MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'UI_SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'UI_SET_LOADING'; payload: boolean }

// Settings actions
export type SettingsAction =
  | { type: 'SETTINGS_SET_TAB'; payload: string }
  | { type: 'SETTINGS_SET_DIRTY'; payload: boolean }
  | { type: 'SETTINGS_UPDATE_PENDING'; payload: Record<string, any> }
  | { type: 'SETTINGS_SAVE'; payload: Record<string, any> }
  | { type: 'SETTINGS_RESET' }

// Cache actions
export type CacheAction =
  | { type: 'CACHE_SET'; payload: { key: string; data: any; ttl?: number } }
  | { type: 'CACHE_INVALIDATE'; payload: string }
  | { type: 'CACHE_CLEAR' }
  | { type: 'CACHE_UPDATE_PERFORMANCE'; payload: Partial<PerformanceMetrics> }

// State selectors type
export interface StateSelectors {
  // User selectors
  isAuthenticated: (state: AppState) => boolean
  getCurrentUser: (state: AppState) => User | null
  getUserPermissions: (state: AppState) => string[]
  
  // Practice selectors
  getCurrentPractice: (state: AppState) => Practice | null
  getPracticeStaff: (state: AppState) => StaffMember[]
  
  // Billing selectors
  getCurrentUsage: (state: AppState) => UsageMetrics
  getUnpaidInvoices: (state: AppState) => Invoice[]
  
  // UI selectors
  isSidebarCollapsed: (state: AppState) => boolean
  getActiveModals: (state: AppState) => ModalState[]
  getUnreadNotifications: (state: AppState) => NotificationState[]
}

// Context provider props
export interface AppContextProviderProps {
  children: React.ReactNode
  initialState?: Partial<AppState>
}
