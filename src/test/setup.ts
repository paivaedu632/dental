// Test setup and configuration
// Global test setup for Jest and testing environment

import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'
import { server } from './mocks/server'
import { mockLocalStorage, mockSessionStorage, mockIntersectionObserver, mockResizeObserver, mockMatchMedia } from './utils'

// Configure testing library
configure({
  testIdAttribute: 'data-testid',
  asyncUtilTimeout: 5000,
})

// Setup MSW (Mock Service Worker)
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  })
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

// Mock global objects
beforeEach(() => {
  // Mock localStorage
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage(),
    writable: true,
  })

  // Mock sessionStorage
  Object.defineProperty(window, 'sessionStorage', {
    value: mockSessionStorage(),
    writable: true,
  })

  // Mock IntersectionObserver
  mockIntersectionObserver()

  // Mock ResizeObserver
  mockResizeObserver()

  // Mock matchMedia
  mockMatchMedia()

  // Mock window.location
  Object.defineProperty(window, 'location', {
    value: {
      href: 'http://localhost:3000',
      origin: 'http://localhost:3000',
      protocol: 'http:',
      host: 'localhost:3000',
      hostname: 'localhost',
      port: '3000',
      pathname: '/',
      search: '',
      hash: '',
      assign: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
    },
    writable: true,
  })

  // Mock window.history
  Object.defineProperty(window, 'history', {
    value: {
      length: 1,
      state: null,
      back: jest.fn(),
      forward: jest.fn(),
      go: jest.fn(),
      pushState: jest.fn(),
      replaceState: jest.fn(),
    },
    writable: true,
  })

  // Mock console methods to reduce noise in tests
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  jest.spyOn(console, 'error').mockImplementation(() => {})
  jest.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  // Restore console methods
  jest.restoreAllMocks()
  
  // Clear all timers
  jest.clearAllTimers()
  
  // Clear all mocks
  jest.clearAllMocks()
})

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  },
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>
  },
}))

jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: any) => children,
}))

// Mock environment variables
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3001/api'

// Mock performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByName: jest.fn(() => []),
    getEntriesByType: jest.fn(() => []),
    clearMarks: jest.fn(),
    clearMeasures: jest.fn(),
  },
  writable: true,
})

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 16))
global.cancelAnimationFrame = jest.fn((id) => clearTimeout(id))

// Mock requestIdleCallback
global.requestIdleCallback = jest.fn((cb) => setTimeout(cb, 0))
global.cancelIdleCallback = jest.fn((id) => clearTimeout(id))

// Mock crypto API
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: jest.fn(() => 'mock-uuid-' + Math.random().toString(36).substr(2, 9)),
    getRandomValues: jest.fn((arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256)
      }
      return arr
    }),
  },
})

// Mock File and FileReader
global.File = class MockFile {
  name: string
  size: number
  type: string
  lastModified: number

  constructor(bits: any[], filename: string, options: any = {}) {
    this.name = filename
    this.size = bits.reduce((acc, bit) => acc + (bit.length || 0), 0)
    this.type = options.type || ''
    this.lastModified = options.lastModified || Date.now()
  }
} as any

global.FileReader = class MockFileReader {
  result: any = null
  error: any = null
  readyState: number = 0
  onload: any = null
  onerror: any = null
  onloadend: any = null

  readAsText(file: any) {
    setTimeout(() => {
      this.result = 'mock file content'
      this.readyState = 2
      if (this.onload) this.onload({ target: this })
      if (this.onloadend) this.onloadend({ target: this })
    }, 0)
  }

  readAsDataURL(file: any) {
    setTimeout(() => {
      this.result = 'data:text/plain;base64,bW9jayBmaWxlIGNvbnRlbnQ='
      this.readyState = 2
      if (this.onload) this.onload({ target: this })
      if (this.onloadend) this.onloadend({ target: this })
    }, 0)
  }
} as any

// Mock Blob
global.Blob = class MockBlob {
  size: number
  type: string

  constructor(parts: any[] = [], options: any = {}) {
    this.size = parts.reduce((acc, part) => acc + (part.length || 0), 0)
    this.type = options.type || ''
  }

  text() {
    return Promise.resolve('mock blob content')
  }

  arrayBuffer() {
    return Promise.resolve(new ArrayBuffer(this.size))
  }
} as any

// Mock URL
global.URL = {
  createObjectURL: jest.fn(() => 'mock-object-url'),
  revokeObjectURL: jest.fn(),
} as any

// Mock WebSocket
global.WebSocket = class MockWebSocket {
  url: string
  readyState: number = 1
  onopen: any = null
  onclose: any = null
  onmessage: any = null
  onerror: any = null

  constructor(url: string) {
    this.url = url
    setTimeout(() => {
      if (this.onopen) this.onopen({})
    }, 0)
  }

  send(data: any) {
    // Mock send
  }

  close() {
    this.readyState = 3
    if (this.onclose) this.onclose({})
  }
} as any

// Mock IndexedDB
const mockIDBRequest = {
  result: null,
  error: null,
  onsuccess: null,
  onerror: null,
}

const mockIDBDatabase = {
  transaction: jest.fn(() => ({
    objectStore: jest.fn(() => ({
      get: jest.fn(() => mockIDBRequest),
      put: jest.fn(() => mockIDBRequest),
      delete: jest.fn(() => mockIDBRequest),
      clear: jest.fn(() => mockIDBRequest),
      getAllKeys: jest.fn(() => mockIDBRequest),
    })),
    oncomplete: null,
    onerror: null,
  })),
  close: jest.fn(),
}

global.indexedDB = {
  open: jest.fn(() => ({
    ...mockIDBRequest,
    result: mockIDBDatabase,
    onupgradeneeded: null,
  })),
  deleteDatabase: jest.fn(() => mockIDBRequest),
} as any

// Mock Notification API
global.Notification = class MockNotification {
  static permission = 'granted'
  static requestPermission = jest.fn(() => Promise.resolve('granted'))
  
  constructor(title: string, options: any = {}) {
    // Mock notification
  }
  
  close() {
    // Mock close
  }
} as any

// Global test utilities
global.testUtils = {
  // Add any global test utilities here
  mockDate: (date: string | Date) => {
    const mockDate = new Date(date)
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)
    return mockDate
  },
  
  restoreDate: () => {
    jest.restoreAllMocks()
  },
  
  mockTimers: () => {
    jest.useFakeTimers()
  },
  
  restoreTimers: () => {
    jest.useRealTimers()
  },
}

// Suppress specific warnings in tests
const originalError = console.error
console.error = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
     args[0].includes('Warning: An invalid form control'))
  ) {
    return
  }
  originalError.call(console, ...args)
}
