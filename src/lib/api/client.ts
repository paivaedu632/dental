// API client with interceptors and error handling
// Provides a centralized HTTP client for all API communications

import type { 
  ApiResponse, 
  ApiError, 
  ApiRequestConfig, 
  HttpMethod,
  AuthTokens 
} from '@/types/api'

// API client configuration
interface ApiClientConfig {
  baseURL: string
  timeout: number
  retries: number
  headers: Record<string, string>
}

// Request interceptor type
type RequestInterceptor = (config: ApiRequestConfig) => ApiRequestConfig | Promise<ApiRequestConfig>

// Response interceptor type
type ResponseInterceptor = (response: ApiResponse) => ApiResponse | Promise<ApiResponse>

// Error interceptor type
type ErrorInterceptor = (error: ApiError) => ApiError | Promise<ApiError>

// API client class
export class ApiClient {
  private config: ApiClientConfig
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []
  private errorInterceptors: ErrorInterceptor[] = []
  private authTokens: AuthTokens | null = null

  constructor(config: Partial<ApiClientConfig> = {}) {
    this.config = {
      baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
      timeout: 30000,
      retries: 3,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      ...config,
    }

    // Add default interceptors
    this.addDefaultInterceptors()
  }

  // Add request interceptor
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor)
  }

  // Add response interceptor
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor)
  }

  // Add error interceptor
  addErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.errorInterceptors.push(interceptor)
  }

  // Set authentication tokens
  setAuthTokens(tokens: AuthTokens | null): void {
    this.authTokens = tokens
  }

  // Get authentication tokens
  getAuthTokens(): AuthTokens | null {
    return this.authTokens
  }

  // Make HTTP request
  async request<T = unknown>(config: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    const requestConfig: ApiRequestConfig = {
      method: 'GET',
      url: '',
      headers: { ...this.config.headers },
      timeout: this.config.timeout,
      retries: this.config.retries,
      ...config,
    }

    // Apply request interceptors
    let processedConfig = requestConfig
    for (const interceptor of this.requestInterceptors) {
      processedConfig = await interceptor(processedConfig)
    }

    // Make the actual request
    let response: ApiResponse<T>
    let lastError: ApiError | null = null

    for (let attempt = 0; attempt <= processedConfig.retries!; attempt++) {
      try {
        response = await this.makeRequest<T>(processedConfig)
        
        // Apply response interceptors
        for (const interceptor of this.responseInterceptors) {
          response = await interceptor(response)
        }

        return response
      } catch (error) {
        lastError = error as ApiError

        // Apply error interceptors
        for (const interceptor of this.errorInterceptors) {
          lastError = await interceptor(lastError)
        }

        // Don't retry on client errors (4xx)
        if (lastError.error?.code?.startsWith('4')) {
          break
        }

        // Wait before retry (exponential backoff)
        if (attempt < processedConfig.retries!) {
          await this.delay(Math.pow(2, attempt) * 1000)
        }
      }
    }

    throw lastError
  }

  // Convenience methods
  async get<T = unknown>(url: string, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'GET', url })
  }

  async post<T = unknown>(url: string, data?: unknown, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'POST', url, data })
  }

  async put<T = unknown>(url: string, data?: unknown, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PUT', url, data })
  }

  async patch<T = unknown>(url: string, data?: unknown, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PATCH', url, data })
  }

  async delete<T = unknown>(url: string, config?: Partial<ApiRequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'DELETE', url })
  }

  // Make the actual HTTP request
  private async makeRequest<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    const url = config.url.startsWith('http') ? config.url : `${this.config.baseURL}${config.url}`
    
    const fetchConfig: RequestInit = {
      method: config.method,
      headers: config.headers,
      signal: AbortSignal.timeout(config.timeout || this.config.timeout),
    }

    // Add body for non-GET requests
    if (config.data && config.method !== 'GET') {
      if (config.data instanceof FormData) {
        fetchConfig.body = config.data
        // Remove Content-Type header for FormData (browser will set it)
        delete (fetchConfig.headers as Record<string, string>)['Content-Type']
      } else {
        fetchConfig.body = JSON.stringify(config.data)
      }
    }

    // Add query parameters for GET requests
    if (config.params && config.method === 'GET') {
      const searchParams = new URLSearchParams()
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      const separator = url.includes('?') ? '&' : '?'
      const finalUrl = `${url}${separator}${searchParams.toString()}`
      return this.fetchWithUrl<T>(finalUrl, fetchConfig)
    }

    return this.fetchWithUrl<T>(url, fetchConfig)
  }

  // Fetch with URL
  private async fetchWithUrl<T>(url: string, config: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const apiError: ApiError = {
        success: false,
        error: {
          code: response.status.toString(),
          message: errorData.message || response.statusText,
          details: errorData.details,
        },
        timestamp: new Date().toISOString(),
        requestId: response.headers.get('x-request-id') || 'unknown',
      }
      throw apiError
    }

    const data = await response.json()
    
    return {
      success: true,
      data,
      message: data.message,
      timestamp: new Date().toISOString(),
      requestId: response.headers.get('x-request-id') || 'unknown',
    }
  }

  // Add default interceptors
  private addDefaultInterceptors(): void {
    // Request interceptor for authentication
    this.addRequestInterceptor((config) => {
      if (this.authTokens?.accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `${this.authTokens.tokenType} ${this.authTokens.accessToken}`,
        }
      }
      return config
    })

    // Request interceptor for request ID
    this.addRequestInterceptor((config) => {
      config.headers = {
        ...config.headers,
        'X-Request-ID': this.generateRequestId(),
      }
      return config
    })

    // Error interceptor for token refresh
    this.addErrorInterceptor(async (error) => {
      if (error.error?.code === '401' && this.authTokens?.refreshToken) {
        try {
          const newTokens = await this.refreshTokens()
          this.setAuthTokens(newTokens)
          // The request will be retried automatically with new tokens
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          this.setAuthTokens(null)
          if (typeof window !== 'undefined') {
            window.location.href = '/signin'
          }
        }
      }
      return error
    })

    // Response interceptor for logging
    this.addResponseInterceptor((response) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('API Response:', response)
      }
      return response
    })
  }

  // Generate unique request ID
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Refresh authentication tokens
  private async refreshTokens(): Promise<AuthTokens> {
    if (!this.authTokens?.refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await fetch(`${this.config.baseURL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: this.authTokens.refreshToken,
      }),
    })

    if (!response.ok) {
      throw new Error('Token refresh failed')
    }

    const data = await response.json()
    return data.tokens
  }

  // Delay utility for retries
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Update configuration
  updateConfig(newConfig: Partial<ApiClientConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  // Get current configuration
  getConfig(): ApiClientConfig {
    return { ...this.config }
  }
}

// Create default API client instance
export const apiClient = new ApiClient()

// Export types
export type { ApiClientConfig, RequestInterceptor, ResponseInterceptor, ErrorInterceptor }
