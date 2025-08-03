// Test utilities and helpers
// Provides common utilities for testing React components and hooks

import React from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { renderHook, RenderHookOptions, RenderHookResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppContextProvider } from '@/store/context'
import { ThemeProvider } from 'next-themes'
import type { AppState } from '@/store/types'

// Mock data generators
export const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'dentist' as const,
  status: 'active' as const,
  emailVerified: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

export const mockPractice = {
  id: 'practice-1',
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
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

export const mockBillingPeriod = {
  id: 'billing-1',
  practiceId: 'practice-1',
  month: 1,
  year: 2024,
  appointmentCount: 15,
  setupFee: 300,
  baseFee: 97,
  usageFee: 250,
  totalFee: 647,
  status: 'paid' as const,
  dueDate: new Date('2024-02-01'),
  paidDate: new Date('2024-01-15'),
  createdAt: new Date('2024-01-01'),
}

// Test wrapper component
interface TestWrapperProps {
  children: React.ReactNode
  initialState?: Partial<AppState>
  theme?: 'light' | 'dark' | 'system'
}

function TestWrapper({ children, initialState, theme = 'light' }: TestWrapperProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={theme} enableSystem>
      <AppContextProvider initialState={initialState}>
        {children}
      </AppContextProvider>
    </ThemeProvider>
  )
}

// Custom render function with providers
export function renderWithProviders(
  ui: React.ReactElement,
  options: RenderOptions & {
    initialState?: Partial<AppState>
    theme?: 'light' | 'dark' | 'system'
  } = {}
): RenderResult {
  const { initialState, theme, ...renderOptions } = options

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <TestWrapper initialState={initialState} theme={theme}>
      {children}
    </TestWrapper>
  )

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Custom render hook function with providers
export function renderHookWithProviders<TProps, TResult>(
  hook: (props: TProps) => TResult,
  options: RenderHookOptions<TProps> & {
    initialState?: Partial<AppState>
    theme?: 'light' | 'dark' | 'system'
  } = {}
): RenderHookResult<TResult, TProps> {
  const { initialState, theme, ...renderOptions } = options

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <TestWrapper initialState={initialState} theme={theme}>
      {children}
    </TestWrapper>
  )

  return renderHook(hook, { wrapper: Wrapper, ...renderOptions })
}

// User event setup
export const user = userEvent.setup()

// Mock API responses
export const mockApiResponse = <T>(data: T, delay = 0) => {
  return new Promise<{ data: T }>((resolve) => {
    setTimeout(() => {
      resolve({ data })
    }, delay)
  })
}

export const mockApiError = (message: string, code = '500', delay = 0) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject({
        error: {
          code,
          message,
        },
        timestamp: new Date().toISOString(),
        requestId: 'mock-request',
      })
    }, delay)
  })
}

// Mock localStorage
export const mockLocalStorage = () => {
  const store: Record<string, string> = {}

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key])
    }),
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
    get length() {
      return Object.keys(store).length
    },
  }
}

// Mock sessionStorage
export const mockSessionStorage = () => {
  const store: Record<string, string> = {}

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key])
    }),
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
    get length() {
      return Object.keys(store).length
    },
  }
}

// Mock fetch
export const mockFetch = (responses: Array<{ url: string; response: any; status?: number }>) => {
  const mockImplementation = jest.fn((url: string) => {
    const match = responses.find(r => url.includes(r.url))
    if (match) {
      return Promise.resolve({
        ok: (match.status || 200) < 400,
        status: match.status || 200,
        json: () => Promise.resolve(match.response),
        text: () => Promise.resolve(JSON.stringify(match.response)),
        clone: () => ({
          json: () => Promise.resolve(match.response),
        }),
        headers: new Headers({
          'content-type': 'application/json',
        }),
      })
    }
    return Promise.reject(new Error(`No mock response for ${url}`))
  })

  global.fetch = mockImplementation as any
  return mockImplementation
}

// Mock IntersectionObserver
export const mockIntersectionObserver = () => {
  const mockObserver = {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }

  global.IntersectionObserver = jest.fn(() => mockObserver) as any
  return mockObserver
}

// Mock ResizeObserver
export const mockResizeObserver = () => {
  const mockObserver = {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }

  global.ResizeObserver = jest.fn(() => mockObserver) as any
  return mockObserver
}

// Mock matchMedia
export const mockMatchMedia = (matches = false) => {
  const mockMediaQuery = {
    matches,
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }

  global.matchMedia = jest.fn(() => mockMediaQuery) as any
  return mockMediaQuery
}

// Test data factories
export const createMockUser = (overrides: Partial<typeof mockUser> = {}) => ({
  ...mockUser,
  ...overrides,
})

export const createMockPractice = (overrides: Partial<typeof mockPractice> = {}) => ({
  ...mockPractice,
  ...overrides,
})

export const createMockBillingPeriod = (overrides: Partial<typeof mockBillingPeriod> = {}) => ({
  ...mockBillingPeriod,
  ...overrides,
})

// Async test helpers
export const waitFor = (condition: () => boolean, timeout = 5000) => {
  return new Promise<void>((resolve, reject) => {
    const startTime = Date.now()
    
    const check = () => {
      if (condition()) {
        resolve()
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout waiting for condition'))
      } else {
        setTimeout(check, 10)
      }
    }
    
    check()
  })
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Component test helpers
export const getByTestId = (container: HTMLElement, testId: string) => {
  const element = container.querySelector(`[data-testid="${testId}"]`)
  if (!element) {
    throw new Error(`Element with data-testid="${testId}" not found`)
  }
  return element
}

export const queryByTestId = (container: HTMLElement, testId: string) => {
  return container.querySelector(`[data-testid="${testId}"]`)
}

export const getAllByTestId = (container: HTMLElement, testId: string) => {
  return Array.from(container.querySelectorAll(`[data-testid="${testId}"]`))
}

// Form test helpers
export const fillForm = async (form: HTMLFormElement, data: Record<string, string>) => {
  for (const [name, value] of Object.entries(data)) {
    const input = form.querySelector(`[name="${name}"]`) as HTMLInputElement
    if (input) {
      await user.clear(input)
      await user.type(input, value)
    }
  }
}

export const submitForm = async (form: HTMLFormElement) => {
  const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement
  if (submitButton) {
    await user.click(submitButton)
  } else {
    // Fallback to form submission
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  }
}

// Accessibility test helpers
export const checkAccessibility = async (container: HTMLElement) => {
  // This would integrate with axe-core or similar
  // For now, just basic checks
  const issues: string[] = []

  // Check for missing alt text on images
  const images = container.querySelectorAll('img')
  images.forEach((img, index) => {
    if (!img.alt && !img.getAttribute('aria-label')) {
      issues.push(`Image at index ${index} is missing alt text`)
    }
  })

  // Check for missing labels on form inputs
  const inputs = container.querySelectorAll('input, textarea, select')
  inputs.forEach((input, index) => {
    const hasLabel = input.getAttribute('aria-label') || 
                    input.getAttribute('aria-labelledby') ||
                    container.querySelector(`label[for="${input.id}"]`)
    
    if (!hasLabel) {
      issues.push(`Form input at index ${index} is missing a label`)
    }
  })

  return issues
}

// Performance test helpers
export const measureRenderTime = async (renderFn: () => void) => {
  const start = performance.now()
  renderFn()
  const end = performance.now()
  return end - start
}

// Export all utilities
export * from '@testing-library/react'
export { userEvent }
