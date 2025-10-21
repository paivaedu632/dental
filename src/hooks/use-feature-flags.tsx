// Feature flags hook
// Provides React hooks for accessing and managing feature flags

import { useState, useEffect, useCallback } from 'react'
import { config, getFeatureFlag, isFeatureEnabled, type AppConfig } from '@/config/environment'

// Feature flag context type
type FeatureFlags = AppConfig['features']

// Hook for accessing feature flags
export function useFeatureFlags() {
  const [flags, setFlags] = useState<FeatureFlags>(config.features)

  // Check if a specific feature is enabled
  const isEnabled = useCallback((flag: keyof FeatureFlags): boolean => {
    return flags[flag]
  }, [flags])

  // Get all feature flags
  const getAllFlags = useCallback((): FeatureFlags => {
    return flags
  }, [flags])

  // Update feature flags (for testing/development)
  const updateFlags = useCallback((newFlags: Partial<FeatureFlags>) => {
    if (config.isDevelopment || config.isTest) {
      setFlags(prev => ({ ...prev, ...newFlags }))
    }
  }, [])

  // Reset to default flags
  const resetFlags = useCallback(() => {
    setFlags(config.features)
  }, [])

  return {
    flags,
    isEnabled,
    getAllFlags,
    updateFlags,
    resetFlags,
  }
}

// Hook for a specific feature flag
export function useFeatureFlag(flag: keyof FeatureFlags): boolean {
  const [isEnabled, setIsEnabled] = useState(() => getFeatureFlag(flag))

  useEffect(() => {
    setIsEnabled(getFeatureFlag(flag))
  }, [flag])

  return isEnabled
}

// Hook for multiple feature flags
export function useFeatureFlags_Multiple(flags: (keyof FeatureFlags)[]): Record<string, boolean> {
  const [flagStates, setFlagStates] = useState(() => {
    return flags.reduce((acc, flag) => {
      acc[flag] = getFeatureFlag(flag)
      return acc
    }, {} as Record<string, boolean>)
  })

  useEffect(() => {
    const newStates = flags.reduce((acc, flag) => {
      acc[flag] = getFeatureFlag(flag)
      return acc
    }, {} as Record<string, boolean>)
    setFlagStates(newStates)
  }, [flags])

  return flagStates
}

// Hook for conditional rendering based on feature flags
export function useConditionalRender() {
  const { isEnabled } = useFeatureFlags()

  const renderIf = useCallback((flag: keyof FeatureFlags, component: React.ReactNode) => {
    return isEnabled(flag) ? component : null
  }, [isEnabled])

  const renderUnless = useCallback((flag: keyof FeatureFlags, component: React.ReactNode) => {
    return !isEnabled(flag) ? component : null
  }, [isEnabled])

  return { renderIf, renderUnless }
}

// Hook for feature flag analytics
export function useFeatureFlagAnalytics() {
  const { flags } = useFeatureFlags()

  const trackFeatureUsage = useCallback((flag: keyof FeatureFlags, action: string) => {
    if (config.features.enableAnalytics && flags[flag]) {
      // Track feature usage
      console.log(`Feature ${flag} used: ${action}`)
      
      // In a real implementation, this would send to analytics service
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'feature_usage', {
          feature_name: flag,
          action: action,
          enabled: flags[flag],
        })
      }
    }
  }, [flags])

  const getFeatureUsageStats = useCallback(() => {
    // Return feature usage statistics
    return Object.entries(flags).map(([flag, enabled]) => ({
      flag,
      enabled,
      usageCount: 0, // This would come from analytics
    }))
  }, [flags])

  return {
    trackFeatureUsage,
    getFeatureUsageStats,
  }
}

// Higher-order component for feature flag gating
export function withFeatureFlag<P extends object>(
  flag: keyof FeatureFlags,
  Component: React.ComponentType<P>,
  FallbackComponent?: React.ComponentType<P>
) {
  const WrappedComponent: React.FC<P> = (props) => {
    const isEnabled = useFeatureFlag(flag)

    if (isEnabled) {
      return <Component {...props} />
    }

    if (FallbackComponent) {
      return <FallbackComponent {...props} />
    }

    return null
  }

  WrappedComponent.displayName = `withFeatureFlag(${flag})(${Component.displayName || Component.name})`

  return WrappedComponent
}

// Component for conditional rendering
interface FeatureGateProps {
  flag: keyof FeatureFlags
  children: React.ReactNode
  fallback?: React.ReactNode
  invert?: boolean
}

export function FeatureGate({ flag, children, fallback = null, invert = false }: FeatureGateProps) {
  const isEnabled = useFeatureFlag(flag)
  const shouldRender = invert ? !isEnabled : isEnabled

  return shouldRender ? <>{children}</> : <>{fallback}</>
}

// Hook for A/B testing with feature flags
export function useABTest(testName: string, variants: string[]) {
  const [variant, setVariant] = useState<string>(() => {
    // Simple hash-based variant selection
    const hash = hashString(testName + (typeof window !== 'undefined' ? window.navigator.userAgent : ''))
    return variants[hash % variants.length]
  })

  const trackConversion = useCallback((conversionType: string) => {
    if (config.features.enableAnalytics) {
      console.log(`A/B Test ${testName} - Variant ${variant} - Conversion: ${conversionType}`)
      
      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'ab_test_conversion', {
          test_name: testName,
          variant: variant,
          conversion_type: conversionType,
        })
      }
    }
  }, [testName, variant])

  return { variant, trackConversion }
}

// Utility function for hashing strings
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

// Hook for environment-specific behavior
export function useEnvironment() {
  return {
    isDevelopment: config.isDevelopment,
    isProduction: config.isProduction,
    isStaging: config.isStaging,
    isTest: config.isTest,
    environment: config.environment,
  }
}

// Hook for configuration values
export function useConfig() {
  return {
    config,
    api: config.api,
    auth: config.auth,
    ui: config.ui,
    performance: config.performance,
    logging: config.logging,
    services: config.services,
    billing: config.billing,
    security: config.security,
  }
}

// Development-only feature flag override
export function useDevFeatureOverride() {
  const { updateFlags, resetFlags } = useFeatureFlags()

  const enableFeature = useCallback((flag: keyof FeatureFlags) => {
    if (config.isDevelopment) {
      updateFlags({ [flag]: true })
    }
  }, [updateFlags])

  const disableFeature = useCallback((flag: keyof FeatureFlags) => {
    if (config.isDevelopment) {
      updateFlags({ [flag]: false })
    }
  }, [updateFlags])

  const toggleFeature = useCallback((flag: keyof FeatureFlags) => {
    if (config.isDevelopment) {
      const currentValue = getFeatureFlag(flag)
      updateFlags({ [flag]: !currentValue })
    }
  }, [updateFlags])

  return {
    enableFeature,
    disableFeature,
    toggleFeature,
    resetFlags,
    isDevMode: config.isDevelopment,
  }
}

// Export feature flag constants for easy access
export const FEATURE_FLAGS = {
  ANALYTICS: 'enableAnalytics' as const,
  PERFORMANCE_MONITORING: 'enablePerformanceMonitoring' as const,
  ERROR_REPORTING: 'enableErrorReporting' as const,
  BETA_FEATURES: 'enableBetaFeatures' as const,
  DEBUG_MODE: 'enableDebugMode' as const,
  MOCK_DATA: 'enableMockData' as const,
  OFFLINE_MODE: 'enableOfflineMode' as const,
  PUSH_NOTIFICATIONS: 'enablePushNotifications' as const,
  REAL_TIME_UPDATES: 'enableRealTimeUpdates' as const,
  ADVANCED_BILLING: 'enableAdvancedBilling' as const,
} as const

// Type for feature flag keys
export type FeatureFlagKey = keyof typeof FEATURE_FLAGS
