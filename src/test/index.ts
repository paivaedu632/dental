// Test module exports
// Central export point for all testing utilities and helpers

// Test utilities
export * from './utils'

// Mock server
export { server, handlers } from './mocks/server'

// Test matchers and assertions
export const customMatchers = {
  // Custom matcher for testing loading states
  toBeLoading: (received: any) => {
    const pass = received.loading === true
    return {
      message: () => `expected element ${pass ? 'not ' : ''}to be loading`,
      pass,
    }
  },

  // Custom matcher for testing error states
  toHaveError: (received: any, expected?: string) => {
    const hasError = received.error !== null
    const errorMatches = expected ? received.error?.message === expected : true
    const pass = hasError && errorMatches
    
    return {
      message: () => `expected element ${pass ? 'not ' : ''}to have error${expected ? ` "${expected}"` : ''}`,
      pass,
    }
  },

  // Custom matcher for testing API responses
  toBeApiResponse: (received: any) => {
    const hasRequiredFields = 
      typeof received === 'object' &&
      received !== null &&
      'success' in received &&
      'timestamp' in received &&
      'requestId' in received

    return {
      message: () => `expected ${received} ${hasRequiredFields ? 'not ' : ''}to be a valid API response`,
      pass: hasRequiredFields,
    }
  },

  // Custom matcher for testing cache entries
  toBeCacheEntry: (received: any) => {
    const hasRequiredFields = 
      typeof received === 'object' &&
      received !== null &&
      'key' in received &&
      'data' in received &&
      'timestamp' in received &&
      'ttl' in received

    return {
      message: () => `expected ${received} ${hasRequiredFields ? 'not ' : ''}to be a valid cache entry`,
      pass: hasRequiredFields,
    }
  },

  // Custom matcher for testing form validation
  toHaveValidationError: (received: any, field: string) => {
    const hasError = received.errors && received.errors[field]
    return {
      message: () => `expected form ${hasError ? 'not ' : ''}to have validation error for field "${field}"`,
      pass: hasError,
    }
  },
}

// Test data builders
export class TestDataBuilder {
  // User builder
  static user(overrides: any = {}) {
    return {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      email: 'test@example.com',
      name: 'Test User',
      role: 'dentist',
      status: 'active',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides,
    }
  }

  // Practice builder
  static practice(overrides: any = {}) {
    return {
      id: 'practice-' + Math.random().toString(36).substr(2, 9),
      name: 'Test Dental Practice',
      address: {
        street: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zipCode: '12345',
        country: 'US',
      },
      phone: '+1234567890',
      email: 'practice@example.com',
      timezone: 'UTC',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides,
    }
  }

  // Appointment builder
  static appointment(overrides: any = {}) {
    return {
      id: 'apt-' + Math.random().toString(36).substr(2, 9),
      practiceId: 'practice-1',
      patientId: 'patient-1',
      providerId: 'staff-1',
      scheduledAt: new Date(),
      duration: 30,
      status: 'scheduled',
      type: 'consultation',
      notes: 'Test appointment',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides,
    }
  }

  // Billing period builder
  static billingPeriod(overrides: any = {}) {
    return {
      id: 'billing-' + Math.random().toString(36).substr(2, 9),
      practiceId: 'practice-1',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      appointmentCount: 15,
      setupFee: 300,
      baseFee: 97,
      usageFee: 250,
      totalFee: 647,
      status: 'paid',
      dueDate: new Date(),
      createdAt: new Date(),
      ...overrides,
    }
  }

  // API response builder
  static apiResponse(data: any, overrides: any = {}) {
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
      requestId: 'test-request-' + Math.random().toString(36).substr(2, 9),
      ...overrides,
    }
  }

  // API error builder
  static apiError(message: string, code = '500', overrides: any = {}) {
    return {
      success: false,
      error: {
        code,
        message,
      },
      timestamp: new Date().toISOString(),
      requestId: 'test-request-' + Math.random().toString(36).substr(2, 9),
      ...overrides,
    }
  }
}

// Test scenarios
export class TestScenarios {
  // Authentication scenarios
  static auth = {
    validLogin: {
      email: 'test@example.com',
      password: 'password123',
    },
    invalidLogin: {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    },
    expiredSession: {
      error: {
        code: '401',
        message: 'Session expired',
      },
    },
  }

  // Billing scenarios
  static billing = {
    underLimit: {
      appointmentCount: 8,
      setupFee: 300,
      baseFee: 97,
      usageFee: 0,
      totalFee: 397,
    },
    overLimit: {
      appointmentCount: 15,
      setupFee: 300,
      baseFee: 97,
      usageFee: 250,
      totalFee: 647,
    },
    firstMonth: {
      appointmentCount: 5,
      setupFee: 300,
      baseFee: 97,
      usageFee: 0,
      totalFee: 397,
    },
  }

  // Form validation scenarios
  static validation = {
    email: {
      valid: ['test@example.com', 'user+tag@domain.co.uk'],
      invalid: ['invalid-email', '@domain.com', 'user@'],
    },
    phone: {
      valid: ['+1234567890', '(555) 123-4567', '555-123-4567'],
      invalid: ['123', 'abc-def-ghij', ''],
    },
    password: {
      valid: ['Password123!', 'MySecureP@ss'],
      invalid: ['123', 'password', 'PASSWORD'],
    },
  }
}

// Test helpers
export class TestHelpers {
  // Wait for element to appear
  static async waitForElement(selector: string, timeout = 5000) {
    return new Promise<Element>((resolve, reject) => {
      const startTime = Date.now()
      
      const check = () => {
        const element = document.querySelector(selector)
        if (element) {
          resolve(element)
        } else if (Date.now() - startTime > timeout) {
          reject(new Error(`Element ${selector} not found within ${timeout}ms`))
        } else {
          setTimeout(check, 100)
        }
      }
      
      check()
    })
  }

  // Wait for element to disappear
  static async waitForElementToDisappear(selector: string, timeout = 5000) {
    return new Promise<void>((resolve, reject) => {
      const startTime = Date.now()
      
      const check = () => {
        const element = document.querySelector(selector)
        if (!element) {
          resolve()
        } else if (Date.now() - startTime > timeout) {
          reject(new Error(`Element ${selector} still present after ${timeout}ms`))
        } else {
          setTimeout(check, 100)
        }
      }
      
      check()
    })
  }

  // Simulate network delay
  static async networkDelay(ms = 100) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Generate random test data
  static randomString(length = 10) {
    return Math.random().toString(36).substring(2, length + 2)
  }

  static randomEmail() {
    return `test-${this.randomString()}@example.com`
  }

  static randomPhone() {
    return `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`
  }

  // Mock console methods
  static mockConsole() {
    const originalConsole = { ...console }
    
    console.log = jest.fn()
    console.warn = jest.fn()
    console.error = jest.fn()
    console.info = jest.fn()
    
    return {
      restore: () => {
        Object.assign(console, originalConsole)
      },
      getLogs: () => (console.log as jest.Mock).mock.calls,
      getWarnings: () => (console.warn as jest.Mock).mock.calls,
      getErrors: () => (console.error as jest.Mock).mock.calls,
    }
  }

  // Performance testing
  static async measurePerformance<T>(fn: () => Promise<T> | T): Promise<{ result: T; duration: number }> {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()
    
    return {
      result,
      duration: end - start,
    }
  }
}

// Test configuration
export const testConfig = {
  // Default timeouts
  timeouts: {
    short: 1000,
    medium: 5000,
    long: 10000,
  },
  
  // Test data limits
  limits: {
    maxStringLength: 1000,
    maxArrayLength: 100,
    maxObjectDepth: 10,
  },
  
  // Performance thresholds
  performance: {
    renderTime: 100, // ms
    apiResponseTime: 500, // ms
    cacheHitTime: 10, // ms
  },
}

// Export everything
export * from '@testing-library/react'
export * from '@testing-library/jest-dom'
export { userEvent } from '@testing-library/user-event'
