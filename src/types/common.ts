// Common types and utilities used throughout the application

// Base component props that most components should extend
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// Common loading and error states
export interface LoadingState {
  isLoading: boolean
  error?: string | null
}

// Generic API response wrapper
export interface ApiResponse<T = unknown> {
  data: T
  success: boolean
  message?: string
  timestamp: string
}

// Pagination types
export interface PaginationParams {
  page: number
  limit: number
  offset?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Common form field types
export interface FormField<T = string> {
  value: T
  error?: string
  touched?: boolean
  required?: boolean
}

// Date range type
export interface DateRange {
  startDate: Date
  endDate: Date
}

// Common ID types
export type ID = string | number
export type UUID = string

// Status types
export type Status = 'active' | 'inactive' | 'pending' | 'archived'
export type Priority = 'low' | 'normal' | 'high' | 'urgent'

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>
export type Nullable<T> = T | null
export type Maybe<T> = T | undefined

// Event handler types
export type EventHandler<T = Event> = (event: T) => void
export type ChangeHandler<T = string> = (value: T) => void
export type SubmitHandler<T = Record<string, unknown>> = (data: T) => void | Promise<void>

// Theme and styling types
export type ThemeMode = 'light' | 'dark' | 'system'
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'default' | 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'

// User and authentication types (foundation for future auth system)
export interface User {
  id: UUID
  email: string
  name: string
  avatar?: string
  role: UserRole
  status: Status
  createdAt: Date
  updatedAt: Date
}

export type UserRole = 'admin' | 'dentist' | 'staff' | 'patient'

// Practice/Organization types
export interface Practice {
  id: UUID
  name: string
  address: Address
  phone: string
  email: string
  website?: string
  timezone: string
  settings: PracticeSettings
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface PracticeSettings {
  businessHours: BusinessHours[]
  appointmentDuration: number // in minutes
  bufferTime: number // in minutes
  maxAdvanceBooking: number // in days
  allowOnlineBooking: boolean
}

export interface BusinessHours {
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  openTime: string // HH:mm format
  closeTime: string // HH:mm format
  isOpen: boolean
}

// Notification types
export interface Notification {
  id: UUID
  type: NotificationType
  title: string
  message: string
  read: boolean
  createdAt: Date
  actionUrl?: string
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'appointment' | 'billing'

// File and media types
export interface FileUpload {
  id: UUID
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  uploadedAt: Date
  uploadedBy: UUID
}

// Search and filter types
export interface SearchParams {
  query?: string
  filters?: Record<string, unknown>
  sort?: SortParams
  pagination?: PaginationParams
}

export interface SortParams {
  field: string
  direction: 'asc' | 'desc'
}

// Validation types
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: unknown) => boolean | string
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

// Configuration types
export interface AppConfig {
  name: string
  version: string
  environment: 'development' | 'staging' | 'production'
  features: FeatureFlags
  limits: AppLimits
}

export interface FeatureFlags {
  enableBilling: boolean
  enableNotifications: boolean
  enableIntegrations: boolean
  enableAnalytics: boolean
}

export interface AppLimits {
  maxFileSize: number
  maxFilesPerUpload: number
  maxUsersPerPractice: number
  maxAppointmentsPerDay: number
}
