// API related types and interfaces
// This file defines types for API requests, responses, and error handling

import { PaginationParams, PaginatedResponse, ID, UUID } from './common'

// Base API response structure
export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
  timestamp: string
  requestId: string
}

// Error response structure
export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    details?: Record<string, unknown>
    field?: string // For validation errors
  }
  timestamp: string
  requestId: string
}

// API request configuration
export interface ApiRequestConfig {
  method: HttpMethod
  url: string
  headers?: Record<string, string>
  params?: Record<string, unknown>
  data?: unknown
  timeout?: number
  retries?: number
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

// Authentication types
export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: Date
  tokenType: 'Bearer'
}

export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  user: ApiUser
  tokens: AuthTokens
  permissions: string[]
}

export interface RefreshTokenRequest {
  refreshToken: string
}

// User API types
export interface ApiUser {
  id: UUID
  email: string
  name: string
  avatar?: string
  role: UserRole
  status: UserStatus
  emailVerified: boolean
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
}

export type UserRole = 'admin' | 'dentist' | 'staff' | 'patient'
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending'

// Practice API types
export interface ApiPractice {
  id: UUID
  name: string
  address: ApiAddress
  phone: string
  email: string
  website?: string
  timezone: string
  settings: PracticeApiSettings
  subscription: ApiSubscription
  createdAt: Date
  updatedAt: Date
}

export interface ApiAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface PracticeApiSettings {
  businessHours: BusinessHoursApi[]
  appointmentDuration: number
  bufferTime: number
  maxAdvanceBooking: number
  allowOnlineBooking: boolean
}

export interface BusinessHoursApi {
  dayOfWeek: number
  openTime: string
  closeTime: string
  isOpen: boolean
}

// Subscription API types
export interface ApiSubscription {
  id: UUID
  practiceId: UUID
  planId: string
  status: SubscriptionStatus
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  trialEnd?: Date
  createdAt: Date
  updatedAt: Date
}

export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due' | 'unpaid' | 'trialing'

// Billing API types
export interface ApiBillingPeriod {
  id: UUID
  practiceId: UUID
  month: number
  year: number
  appointmentCount: number
  setupFee: number
  baseFee: number
  usageFee: number
  totalFee: number
  status: BillingStatus
  dueDate: Date
  paidDate?: Date
  createdAt: Date
}

export type BillingStatus = 'pending' | 'paid' | 'overdue' | 'cancelled'

// Appointment API types
export interface ApiAppointment {
  id: UUID
  practiceId: UUID
  patientId: UUID
  providerId: UUID
  scheduledAt: Date
  duration: number
  status: AppointmentStatus
  type: AppointmentType
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
export type AppointmentType = 'consultation' | 'cleaning' | 'procedure' | 'follow_up' | 'emergency'

// File upload API types
export interface FileUploadRequest {
  file: File
  category: FileCategory
  metadata?: Record<string, unknown>
}

export interface FileUploadResponse {
  id: UUID
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  category: FileCategory
  uploadedAt: Date
}

export type FileCategory = 'avatar' | 'document' | 'image' | 'report' | 'attachment'

// Search and filter API types
export interface SearchRequest {
  query?: string
  filters?: Record<string, unknown>
  sort?: SortParams
  pagination?: PaginationParams
}

export interface SortParams {
  field: string
  direction: 'asc' | 'desc'
}

// Webhook types
export interface WebhookPayload<T = unknown> {
  id: UUID
  event: WebhookEvent
  data: T
  timestamp: Date
  signature: string
}

export type WebhookEvent =
  | 'appointment.created'
  | 'appointment.updated'
  | 'appointment.cancelled'
  | 'billing.invoice_created'
  | 'billing.payment_succeeded'
  | 'billing.payment_failed'
  | 'user.created'
  | 'user.updated'

// Rate limiting types
export interface RateLimitInfo {
  limit: number
  remaining: number
  resetTime: Date
  retryAfter?: number
}

// API client configuration
export interface ApiClientConfig {
  baseURL: string
  timeout: number
  retries: number
  headers: Record<string, string>
  interceptors?: {
    request?: (config: ApiRequestConfig) => ApiRequestConfig
    response?: (response: ApiResponse) => ApiResponse
    error?: (error: ApiError) => ApiError
  }
}
