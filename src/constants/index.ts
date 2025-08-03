// Central exports for all constants
export * from './routes'
export * from './navigation'
export * from './pricing'

// Application-wide constants
export const APP_CONFIG = {
  NAME: 'DentalFlow',
  DESCRIPTION: 'Comprehensive dental practice analytics and management platform for optimizing patient care and business performance.',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@dentalflow.com',
  COMPANY: 'DentalFlow Inc.'
} as const

// API configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3
} as const

// UI constants
export const UI_CONFIG = {
  SIDEBAR_WIDTH: 280,
  SIDEBAR_COLLAPSED_WIDTH: 64,
  HEADER_HEIGHT: 64,
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  DESKTOP_BREAKPOINT: 1280
} as const

// Date and time formats
export const DATE_FORMATS = {
  SHORT: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  TIME: 'HH:mm',
  DATETIME: 'MMM dd, yyyy HH:mm',
  ISO: 'yyyy-MM-dd',
  TIMESTAMP: 'yyyy-MM-dd HH:mm:ss'
} as const

// Validation constants
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50
} as const

// File upload constants
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
} as const

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
} as const

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'dentalflow_user_preferences',
  THEME: 'dentalflow_theme',
  SIDEBAR_STATE: 'dentalflow_sidebar_state',
  RECENT_SEARCHES: 'dentalflow_recent_searches'
} as const
