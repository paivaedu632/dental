// Performance monitoring and optimization utilities
// Provides tools for measuring, monitoring, and optimizing application performance

import React, { useEffect, useRef, useState } from 'react'

// Performance measurement utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()
  private observers: PerformanceObserver[] = []

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // Measure function execution time
  measureFunction<T>(name: string, fn: () => T): T {
    const start = performance.now()
    const result = fn()
    const end = performance.now()
    this.recordMetric(name, end - start)
    return result
  }

  // Measure async function execution time
  async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()
    this.recordMetric(name, end - start)
    return result
  }

  // Record a performance metric
  recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }
    this.metrics.get(name)!.push(value)
  }

  // Get performance statistics
  getStats(name: string): {
    count: number
    average: number
    min: number
    max: number
    total: number
  } | null {
    const values = this.metrics.get(name)
    if (!values || values.length === 0) return null

    const total = values.reduce((sum, val) => sum + val, 0)
    return {
      count: values.length,
      average: total / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      total
    }
  }

  // Clear metrics
  clearMetrics(name?: string): void {
    if (name) {
      this.metrics.delete(name)
    } else {
      this.metrics.clear()
    }
  }

  // Initialize performance observers
  initializeObservers(): void {
    if (typeof window === 'undefined') return

    // Observe navigation timing
    if ('PerformanceObserver' in window) {
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming
            this.recordMetric('page-load', navEntry.loadEventEnd - navEntry.fetchStart)
            this.recordMetric('dom-content-loaded', navEntry.domContentLoadedEventEnd - navEntry.fetchStart)
          }
        }
      })

      try {
        navObserver.observe({ entryTypes: ['navigation'] })
        this.observers.push(navObserver)
      } catch (e) {
        console.warn('Navigation timing observer not supported')
      }

      // Observe largest contentful paint
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric('largest-contentful-paint', entry.startTime)
        }
      })

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        this.observers.push(lcpObserver)
      } catch (e) {
        console.warn('LCP observer not supported')
      }
    }
  }

  // Cleanup observers
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// React hook for performance monitoring
export function usePerformanceMonitor() {
  const monitor = PerformanceMonitor.getInstance()
  
  useEffect(() => {
    monitor.initializeObservers()
    return () => monitor.cleanup()
  }, [monitor])

  return {
    measureFunction: monitor.measureFunction.bind(monitor),
    measureAsyncFunction: monitor.measureAsyncFunction.bind(monitor),
    recordMetric: monitor.recordMetric.bind(monitor),
    getStats: monitor.getStats.bind(monitor),
    clearMetrics: monitor.clearMetrics.bind(monitor)
  }
}

// Hook for measuring component render time
export function useRenderTime(componentName: string) {
  const renderStartRef = useRef<number>()
  const monitor = PerformanceMonitor.getInstance()

  useEffect(() => {
    renderStartRef.current = performance.now()
  })

  useEffect(() => {
    if (renderStartRef.current) {
      const renderTime = performance.now() - renderStartRef.current
      monitor.recordMetric(`render-${componentName}`, renderTime)
    }
  })
}

// Debounce utility for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }

    const callNow = immediate && !timeout
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func(...args)
  }
}

// Throttle utility for performance optimization
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Lazy loading utility
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) {
  const LazyComponent = React.lazy(importFunc)
  
  return function LazyWrapper(props: React.ComponentProps<T>) {
    return (
      <React.Suspense fallback={fallback ? React.createElement(fallback) : <div>Loading...</div>}>
        <LazyComponent {...props} />
      </React.Suspense>
    )
  }
}

// Memory usage monitoring
export function getMemoryUsage(): {
  used: number
  total: number
  percentage: number
} | null {
  if (typeof window === 'undefined' || !('memory' in performance)) {
    return null
  }

  const memory = (performance as any).memory
  return {
    used: memory.usedJSHeapSize,
    total: memory.totalJSHeapSize,
    percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100
  }
}

// Bundle size analyzer (development only)
export function analyzeBundleSize(): void {
  if (process.env.NODE_ENV !== 'development') return

  const scripts = Array.from(document.querySelectorAll('script[src]'))
  const totalSize = scripts.reduce((total, script) => {
    const src = (script as HTMLScriptElement).src
    if (src.includes('/_next/static/')) {
      // Estimate size based on typical Next.js bundle patterns
      return total + 1 // This would need actual implementation
    }
    return total
  }, 0)

  console.log(`Estimated bundle size: ${totalSize} chunks`)
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance()
