// API module exports
// Central export point for all API-related functionality

// Client and configuration
export { ApiClient, apiClient } from './client'
export type { ApiClientConfig, RequestInterceptor, ResponseInterceptor, ErrorInterceptor } from './client'

// Services
export { apiServices } from './services'
export {
  authService,
  practiceService,
  billingService,
  appointmentService,
  fileService,
  searchService,
  analyticsService,
  notificationService,
} from './services'

// Error handling utilities
export class ApiErrorHandler {
  static handle(error: any): string {
    if (error?.error?.message) {
      return error.error.message
    }
    
    if (error?.message) {
      return error.message
    }
    
    return 'An unexpected error occurred'
  }

  static isNetworkError(error: any): boolean {
    return error?.code === 'NETWORK_ERROR' || error?.message?.includes('fetch')
  }

  static isAuthError(error: any): boolean {
    return error?.error?.code === '401' || error?.error?.code === '403'
  }

  static isValidationError(error: any): boolean {
    return error?.error?.code === '400' && error?.error?.details
  }

  static getValidationErrors(error: any): Record<string, string> {
    if (this.isValidationError(error)) {
      return error.error.details || {}
    }
    return {}
  }
}

// Request/Response interceptor utilities
export const interceptorUtils = {
  // Add authentication to requests
  addAuth: (token: string) => (config: any) => ({
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  }),

  // Add request timing
  addTiming: () => (config: any) => ({
    ...config,
    metadata: {
      ...config.metadata,
      startTime: Date.now(),
    },
  }),

  // Log requests in development
  logRequest: () => (config: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', config)
    }
    return config
  },

  // Log responses in development
  logResponse: () => (response: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', response)
    }
    return response
  },

  // Handle rate limiting
  handleRateLimit: () => async (error: any) => {
    if (error?.error?.code === '429') {
      const retryAfter = error?.error?.retryAfter || 1000
      await new Promise(resolve => setTimeout(resolve, retryAfter))
      // The request will be retried automatically
    }
    return error
  },

  // Transform response data
  transformResponse: <T>(transformer: (data: any) => T) => (response: any) => ({
    ...response,
    data: transformer(response.data),
  }),

  // Add request ID for tracking
  addRequestId: () => (config: any) => ({
    ...config,
    headers: {
      ...config.headers,
      'X-Request-ID': `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    },
  }),
}

// API configuration helpers
export const apiConfig = {
  // Development configuration
  development: {
    baseURL: 'http://localhost:3001/api',
    timeout: 30000,
    retries: 1,
    headers: {
      'Content-Type': 'application/json',
      'X-Environment': 'development',
    },
  },

  // Production configuration
  production: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 15000,
    retries: 3,
    headers: {
      'Content-Type': 'application/json',
      'X-Environment': 'production',
    },
  },

  // Test configuration
  test: {
    baseURL: 'http://localhost:3002/api',
    timeout: 5000,
    retries: 0,
    headers: {
      'Content-Type': 'application/json',
      'X-Environment': 'test',
    },
  },

  // Get configuration for current environment
  getCurrent: () => {
    const env = process.env.NODE_ENV || 'development'
    return apiConfig[env as keyof typeof apiConfig] || apiConfig.development
  },
}

// API status utilities
export const apiStatus = {
  // Check API health
  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await apiClient.get('/health')
      return response.data
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
      }
    }
  },

  // Get API version
  async getVersion(): Promise<{ version: string; build: string }> {
    try {
      const response = await apiClient.get('/version')
      return response.data
    } catch (error) {
      return {
        version: 'unknown',
        build: 'unknown',
      }
    }
  },

  // Check if API is available
  async isAvailable(): Promise<boolean> {
    try {
      await this.checkHealth()
      return true
    } catch (error) {
      return false
    }
  },
}

// Mock API utilities for development/testing
export const mockApi = {
  // Enable mock mode
  enable: () => {
    if (process.env.NODE_ENV === 'development') {
      // Add mock interceptors
      apiClient.addRequestInterceptor((config) => {
        console.log('Mock API Request:', config)
        return config
      })

      apiClient.addResponseInterceptor((response) => {
        console.log('Mock API Response:', response)
        return response
      })
    }
  },

  // Create mock response
  createResponse: <T>(data: T, delay = 500): Promise<{ data: T }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data })
      }, delay)
    })
  },

  // Create mock error
  createError: (message: string, code = '500', delay = 500): Promise<never> => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject({
          error: {
            code,
            message,
          },
          timestamp: new Date().toISOString(),
          requestId: 'mock_request',
        })
      }, delay)
    })
  },
}

// Initialize API client with environment-specific configuration
export const initializeApi = () => {
  const config = apiConfig.getCurrent()
  apiClient.updateConfig(config)

  // Add common interceptors
  apiClient.addRequestInterceptor(interceptorUtils.addRequestId())
  apiClient.addRequestInterceptor(interceptorUtils.addTiming())
  
  if (process.env.NODE_ENV === 'development') {
    apiClient.addRequestInterceptor(interceptorUtils.logRequest())
    apiClient.addResponseInterceptor(interceptorUtils.logResponse())
  }

  apiClient.addErrorInterceptor(interceptorUtils.handleRateLimit())

  console.log('API client initialized with config:', config)
}

// Auto-initialize on import
if (typeof window !== 'undefined') {
  initializeApi()
}

// Export everything
export * from './client'
export * from './services'
