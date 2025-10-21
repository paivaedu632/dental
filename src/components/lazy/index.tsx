// Lazy-loaded components for better performance and code splitting
// These components are loaded on-demand to reduce initial bundle size

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

// Loading fallback components
const ComponentSkeleton = () => (
  <div className="space-y-4 p-6">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
)

const FormSkeleton = () => (
  <div className="space-y-4 p-6">
    <Skeleton className="h-8 w-48" />
    <div className="space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-20 w-full" />
    </div>
    <Skeleton className="h-10 w-32" />
  </div>
)

const DashboardSkeleton = () => (
  <div className="space-y-6 p-6">
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-32" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
)

// Lazy-loaded feature components
export const LazySettingsContainer = React.lazy(() => 
  import('@/components/features/settings/settings-container').then(module => ({
    default: module.SettingsContainer
  }))
)

export const LazyPricingCalculator = React.lazy(() => 
  import('@/components/features/billing/pricing-calculator').then(module => ({
    default: module.PricingCalculator
  }))
)

export const LazyUsageDashboard = React.lazy(() => 
  import('@/components/features/billing/usage-dashboard').then(module => ({
    default: module.UsageDashboard
  }))
)

export const LazySupportContactForm = React.lazy(() => 
  import('@/components/features/support/support-contact-form').then(module => ({
    default: module.SupportContactForm
  }))
)



// Wrapped components with suspense and appropriate fallbacks
export const SettingsContainerLazy: React.FC<React.ComponentProps<typeof LazySettingsContainer>> = (props) => (
  <React.Suspense fallback={<ComponentSkeleton />}>
    <LazySettingsContainer {...props} />
  </React.Suspense>
)

export const PricingCalculatorLazy: React.FC<React.ComponentProps<typeof LazyPricingCalculator>> = (props) => (
  <React.Suspense fallback={<FormSkeleton />}>
    <LazyPricingCalculator {...props} />
  </React.Suspense>
)

export const UsageDashboardLazy: React.FC<React.ComponentProps<typeof LazyUsageDashboard>> = (props) => (
  <React.Suspense fallback={<DashboardSkeleton />}>
    <LazyUsageDashboard {...props} />
  </React.Suspense>
)

export const SupportContactFormLazy: React.FC<React.ComponentProps<typeof LazySupportContactForm>> = (props) => (
  <React.Suspense fallback={<FormSkeleton />}>
    <LazySupportContactForm {...props} />
  </React.Suspense>
)

export const FacebookAdCardLazy: React.FC<React.ComponentProps<typeof LazyFacebookAdCard>> = (props) => (
  <React.Suspense fallback={<ComponentSkeleton />}>
    <LazyFacebookAdCard {...props} />
  </React.Suspense>
)

// Higher-order component for lazy loading any component
export function withLazyLoading<P extends object>(
  importFunc: () => Promise<{ default: React.ComponentType<P> }>,
  fallback?: React.ComponentType,
  displayName?: string
) {
  const LazyComponent = React.lazy(importFunc)
  
  const WrappedComponent: React.FC<P> = (props) => (
    <React.Suspense fallback={fallback ? <fallback /> : <ComponentSkeleton />}>
      <LazyComponent {...props} />
    </React.Suspense>
  )

  if (displayName) {
    WrappedComponent.displayName = `LazyLoaded(${displayName})`
  }

  return WrappedComponent
}

// Preload utility for critical components
export const preloadComponent = (importFunc: () => Promise<any>) => {
  // Preload on idle or after a delay
  if (typeof window !== 'undefined') {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => importFunc())
    } else {
      setTimeout(() => importFunc(), 100)
    }
  }
}

// Preload critical components
export const preloadCriticalComponents = () => {
  preloadComponent(() => import('@/components/features/settings/settings-container'))
  preloadComponent(() => import('@/components/features/billing/pricing-calculator'))
  preloadComponent(() => import('@/components/features/billing/usage-dashboard'))
}

// Component registry for dynamic loading
export const componentRegistry = {
  'settings-container': LazySettingsContainer,
  'pricing-calculator': LazyPricingCalculator,
  'usage-dashboard': LazyUsageDashboard,
  'support-contact-form': LazySupportContactForm,
} as const

export type ComponentRegistryKey = keyof typeof componentRegistry

// Dynamic component loader
export function loadComponent(key: ComponentRegistryKey) {
  return componentRegistry[key]
}

// Export all lazy components
export {
  LazySettingsContainer,
  LazyPricingCalculator,
  LazyUsageDashboard,
  LazySupportContactForm,
}
