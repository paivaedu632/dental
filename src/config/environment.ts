// Environment configuration
// Centralized configuration for different deployment environments

// Environment types
export type Environment = 'development' | 'staging' | 'production' | 'test'

// Configuration interface
export interface AppConfig {
  // Environment info
  environment: Environment
  isDevelopment: boolean
  isProduction: boolean
  isStaging: boolean
  isTest: boolean

  // API configuration
  api: {
    baseUrl: string
    timeout: number
    retries: number
    enableMocking: boolean
  }

  // Authentication
  auth: {
    sessionTimeout: number
    refreshThreshold: number
    enableRememberMe: boolean
  }

  // Features flags
  features: {
    enableAnalytics: boolean
    enablePerformanceMonitoring: boolean
    enableErrorReporting: boolean
    enableBetaFeatures: boolean
    enableDebugMode: boolean
    enableMockData: boolean
    enableOfflineMode: boolean
    enablePushNotifications: boolean
    enableRealTimeUpdates: boolean
    enableAdvancedBilling: boolean
  }

  // UI configuration
  ui: {
    enableAnimations: boolean
    enableTooltips: boolean
    enableKeyboardShortcuts: boolean
    defaultTheme: 'light' | 'dark' | 'system'
    enableThemeToggle: boolean
  }

  // Performance
  performance: {
    enableLazyLoading: boolean
    enableCodeSplitting: boolean
    enableServiceWorker: boolean
    enableCaching: boolean
    cacheTimeout: number
  }

  // Logging
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error'
    enableConsoleLogging: boolean
    enableRemoteLogging: boolean
    enablePerformanceLogging: boolean
  }

  // External services
  services: {
    analytics: {
      enabled: boolean
      trackingId?: string
    }
    errorReporting: {
      enabled: boolean
      dsn?: string
    }
    monitoring: {
      enabled: boolean
      endpoint?: string
    }
  }

  // Billing configuration
  billing: {
    setupFee: number
    baseFee: number
    perAppointmentFee: number
    freeAppointments: number
    currency: string
    enableUsageTracking: boolean
  }

  // Security
  security: {
    enableCSP: boolean
    enableHSTS: boolean
    enableXSSProtection: boolean
    enableFrameGuard: boolean
  }
}

// Get current environment
function getCurrentEnvironment(): Environment {
  const env = process.env.NODE_ENV
  const vercelEnv = process.env.VERCEL_ENV

  // Vercel-specific environment detection
  if (vercelEnv === 'production') return 'production'
  if (vercelEnv === 'preview') return 'staging'
  
  // Standard Node.js environment detection
  if (env === 'production') return 'production'
  if (env === 'test') return 'test'
  if (env === 'staging') return 'staging'
  
  return 'development'
}

// Environment-specific configurations
const configurations: Record<Environment, AppConfig> = {
  development: {
    environment: 'development',
    isDevelopment: true,
    isProduction: false,
    isStaging: false,
    isTest: false,

    api: {
      baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      timeout: 30000,
      retries: 1,
      enableMocking: true,
    },

    auth: {
      sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
      refreshThreshold: 5 * 60 * 1000, // 5 minutes
      enableRememberMe: true,
    },

    features: {
      enableAnalytics: false,
      enablePerformanceMonitoring: true,
      enableErrorReporting: false,
      enableBetaFeatures: true,
      enableDebugMode: true,
      enableMockData: true,
      enableOfflineMode: false,
      enablePushNotifications: false,
      enableRealTimeUpdates: false,
      enableAdvancedBilling: true,
    },

    ui: {
      enableAnimations: true,
      enableTooltips: true,
      enableKeyboardShortcuts: true,
      defaultTheme: 'system',
      enableThemeToggle: true,
    },

    performance: {
      enableLazyLoading: true,
      enableCodeSplitting: true,
      enableServiceWorker: false,
      enableCaching: true,
      cacheTimeout: 5 * 60 * 1000, // 5 minutes
    },

    logging: {
      level: 'debug',
      enableConsoleLogging: true,
      enableRemoteLogging: false,
      enablePerformanceLogging: true,
    },

    services: {
      analytics: {
        enabled: false,
      },
      errorReporting: {
        enabled: false,
      },
      monitoring: {
        enabled: false,
      },
    },

    billing: {
      setupFee: 300,
      baseFee: 97,
      perAppointmentFee: 50,
      freeAppointments: 10,
      currency: 'USD',
      enableUsageTracking: true,
    },

    security: {
      enableCSP: false,
      enableHSTS: false,
      enableXSSProtection: true,
      enableFrameGuard: true,
    },
  },

  staging: {
    environment: 'staging',
    isDevelopment: false,
    isProduction: false,
    isStaging: true,
    isTest: false,

    api: {
      baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api-staging.dentalflow.com',
      timeout: 15000,
      retries: 2,
      enableMocking: false,
    },

    auth: {
      sessionTimeout: 8 * 60 * 60 * 1000, // 8 hours
      refreshThreshold: 5 * 60 * 1000, // 5 minutes
      enableRememberMe: true,
    },

    features: {
      enableAnalytics: true,
      enablePerformanceMonitoring: true,
      enableErrorReporting: true,
      enableBetaFeatures: true,
      enableDebugMode: false,
      enableMockData: false,
      enableOfflineMode: false,
      enablePushNotifications: true,
      enableRealTimeUpdates: true,
      enableAdvancedBilling: true,
    },

    ui: {
      enableAnimations: true,
      enableTooltips: true,
      enableKeyboardShortcuts: true,
      defaultTheme: 'light',
      enableThemeToggle: true,
    },

    performance: {
      enableLazyLoading: true,
      enableCodeSplitting: true,
      enableServiceWorker: true,
      enableCaching: true,
      cacheTimeout: 15 * 60 * 1000, // 15 minutes
    },

    logging: {
      level: 'info',
      enableConsoleLogging: false,
      enableRemoteLogging: true,
      enablePerformanceLogging: true,
    },

    services: {
      analytics: {
        enabled: true,
        trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
      },
      errorReporting: {
        enabled: true,
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      },
      monitoring: {
        enabled: true,
        endpoint: process.env.NEXT_PUBLIC_MONITORING_ENDPOINT,
      },
    },

    billing: {
      setupFee: 300,
      baseFee: 97,
      perAppointmentFee: 50,
      freeAppointments: 10,
      currency: 'USD',
      enableUsageTracking: true,
    },

    security: {
      enableCSP: true,
      enableHSTS: true,
      enableXSSProtection: true,
      enableFrameGuard: true,
    },
  },

  production: {
    environment: 'production',
    isDevelopment: false,
    isProduction: true,
    isStaging: false,
    isTest: false,

    api: {
      baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.dentalflow.com',
      timeout: 10000,
      retries: 3,
      enableMocking: false,
    },

    auth: {
      sessionTimeout: 4 * 60 * 60 * 1000, // 4 hours
      refreshThreshold: 5 * 60 * 1000, // 5 minutes
      enableRememberMe: true,
    },

    features: {
      enableAnalytics: true,
      enablePerformanceMonitoring: true,
      enableErrorReporting: true,
      enableBetaFeatures: false,
      enableDebugMode: false,
      enableMockData: false,
      enableOfflineMode: true,
      enablePushNotifications: true,
      enableRealTimeUpdates: true,
      enableAdvancedBilling: true,
    },

    ui: {
      enableAnimations: true,
      enableTooltips: true,
      enableKeyboardShortcuts: true,
      defaultTheme: 'light',
      enableThemeToggle: true,
    },

    performance: {
      enableLazyLoading: true,
      enableCodeSplitting: true,
      enableServiceWorker: true,
      enableCaching: true,
      cacheTimeout: 30 * 60 * 1000, // 30 minutes
    },

    logging: {
      level: 'warn',
      enableConsoleLogging: false,
      enableRemoteLogging: true,
      enablePerformanceLogging: false,
    },

    services: {
      analytics: {
        enabled: true,
        trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
      },
      errorReporting: {
        enabled: true,
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      },
      monitoring: {
        enabled: true,
        endpoint: process.env.NEXT_PUBLIC_MONITORING_ENDPOINT,
      },
    },

    billing: {
      setupFee: 300,
      baseFee: 97,
      perAppointmentFee: 50,
      freeAppointments: 10,
      currency: 'USD',
      enableUsageTracking: true,
    },

    security: {
      enableCSP: true,
      enableHSTS: true,
      enableXSSProtection: true,
      enableFrameGuard: true,
    },
  },

  test: {
    environment: 'test',
    isDevelopment: false,
    isProduction: false,
    isStaging: false,
    isTest: true,

    api: {
      baseUrl: 'http://localhost:3002/api',
      timeout: 5000,
      retries: 0,
      enableMocking: true,
    },

    auth: {
      sessionTimeout: 60 * 60 * 1000, // 1 hour
      refreshThreshold: 5 * 60 * 1000, // 5 minutes
      enableRememberMe: false,
    },

    features: {
      enableAnalytics: false,
      enablePerformanceMonitoring: false,
      enableErrorReporting: false,
      enableBetaFeatures: false,
      enableDebugMode: false,
      enableMockData: true,
      enableOfflineMode: false,
      enablePushNotifications: false,
      enableRealTimeUpdates: false,
      enableAdvancedBilling: false,
    },

    ui: {
      enableAnimations: false,
      enableTooltips: false,
      enableKeyboardShortcuts: false,
      defaultTheme: 'light',
      enableThemeToggle: false,
    },

    performance: {
      enableLazyLoading: false,
      enableCodeSplitting: false,
      enableServiceWorker: false,
      enableCaching: false,
      cacheTimeout: 0,
    },

    logging: {
      level: 'error',
      enableConsoleLogging: false,
      enableRemoteLogging: false,
      enablePerformanceLogging: false,
    },

    services: {
      analytics: {
        enabled: false,
      },
      errorReporting: {
        enabled: false,
      },
      monitoring: {
        enabled: false,
      },
    },

    billing: {
      setupFee: 0,
      baseFee: 0,
      perAppointmentFee: 0,
      freeAppointments: 100,
      currency: 'USD',
      enableUsageTracking: false,
    },

    security: {
      enableCSP: false,
      enableHSTS: false,
      enableXSSProtection: false,
      enableFrameGuard: false,
    },
  },
}

// Get configuration for current environment
export function getConfig(): AppConfig {
  const env = getCurrentEnvironment()
  return configurations[env]
}

// Get specific feature flag
export function getFeatureFlag(flag: keyof AppConfig['features']): boolean {
  return getConfig().features[flag]
}

// Check if feature is enabled
export function isFeatureEnabled(flag: keyof AppConfig['features']): boolean {
  return getFeatureFlag(flag)
}

// Get environment info
export function getEnvironmentInfo() {
  const config = getConfig()
  return {
    environment: config.environment,
    isDevelopment: config.isDevelopment,
    isProduction: config.isProduction,
    isStaging: config.isStaging,
    isTest: config.isTest,
  }
}

// Export current configuration
export const config = getConfig()

// Export environment utilities
export const env = {
  current: getCurrentEnvironment(),
  is: (environment: Environment) => getCurrentEnvironment() === environment,
  isDev: getCurrentEnvironment() === 'development',
  isProd: getCurrentEnvironment() === 'production',
  isStaging: getCurrentEnvironment() === 'staging',
  isTest: getCurrentEnvironment() === 'test',
}

// Runtime configuration override (for testing)
let runtimeConfig: Partial<AppConfig> | null = null

export function setRuntimeConfig(overrides: Partial<AppConfig>) {
  runtimeConfig = overrides
}

export function getRuntimeConfig(): AppConfig {
  const baseConfig = getConfig()
  return runtimeConfig ? { ...baseConfig, ...runtimeConfig } : baseConfig
}

export function clearRuntimeConfig() {
  runtimeConfig = null
}
