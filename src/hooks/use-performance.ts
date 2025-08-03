// Performance monitoring hooks
// Custom hooks for tracking and optimizing application performance

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { performanceMonitor } from '@/lib/performance'

// Hook for monitoring page load performance
export function usePagePerformance(pageName: string) {
  const router = useRouter()
  const loadStartRef = useRef<number>()
  const [metrics, setMetrics] = useState<{
    loadTime?: number
    renderTime?: number
    interactionTime?: number
  }>({})

  useEffect(() => {
    loadStartRef.current = performance.now()

    // Record page load time
    const handleLoad = () => {
      if (loadStartRef.current) {
        const loadTime = performance.now() - loadStartRef.current
        performanceMonitor.recordMetric(`page-load-${pageName}`, loadTime)
        setMetrics(prev => ({ ...prev, loadTime }))
      }
    }

    // Record first interaction time
    const handleFirstInteraction = () => {
      if (loadStartRef.current) {
        const interactionTime = performance.now() - loadStartRef.current
        performanceMonitor.recordMetric(`first-interaction-${pageName}`, interactionTime)
        setMetrics(prev => ({ ...prev, interactionTime }))
      }
      
      // Remove listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
      document.removeEventListener('scroll', handleFirstInteraction)
    }

    // Set up listeners
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        handleLoad()
      } else {
        window.addEventListener('load', handleLoad)
      }

      document.addEventListener('click', handleFirstInteraction, { once: true })
      document.addEventListener('keydown', handleFirstInteraction, { once: true })
      document.addEventListener('scroll', handleFirstInteraction, { once: true })
    }

    return () => {
      window.removeEventListener('load', handleLoad)
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
      document.removeEventListener('scroll', handleFirstInteraction)
    }
  }, [pageName])

  return metrics
}

// Hook for monitoring component render performance
export function useRenderPerformance(componentName: string) {
  const renderCountRef = useRef(0)
  const lastRenderTimeRef = useRef<number>()
  const [renderStats, setRenderStats] = useState<{
    renderCount: number
    averageRenderTime: number
    lastRenderTime: number
  }>({
    renderCount: 0,
    averageRenderTime: 0,
    lastRenderTime: 0
  })

  useEffect(() => {
    const renderStart = performance.now()
    renderCountRef.current += 1

    // Measure render time after DOM update
    const measureRender = () => {
      const renderTime = performance.now() - renderStart
      lastRenderTimeRef.current = renderTime
      
      performanceMonitor.recordMetric(`render-${componentName}`, renderTime)
      
      const stats = performanceMonitor.getStats(`render-${componentName}`)
      if (stats) {
        setRenderStats({
          renderCount: stats.count,
          averageRenderTime: stats.average,
          lastRenderTime: renderTime
        })
      }
    }

    // Use setTimeout to measure after render
    setTimeout(measureRender, 0)
  })

  return renderStats
}

// Hook for monitoring API call performance
export function useApiPerformance() {
  const [apiMetrics, setApiMetrics] = useState<{
    totalCalls: number
    averageResponseTime: number
    errorRate: number
  }>({
    totalCalls: 0,
    averageResponseTime: 0,
    errorRate: 0
  })

  const trackApiCall = useCallback(async <T>(
    endpoint: string,
    apiCall: () => Promise<T>
  ): Promise<T> => {
    const startTime = performance.now()
    let success = true

    try {
      const result = await apiCall()
      return result
    } catch (error) {
      success = false
      throw error
    } finally {
      const endTime = performance.now()
      const responseTime = endTime - startTime

      // Record metrics
      performanceMonitor.recordMetric(`api-${endpoint}`, responseTime)
      performanceMonitor.recordMetric(`api-${endpoint}-${success ? 'success' : 'error'}`, 1)

      // Update state
      const responseStats = performanceMonitor.getStats(`api-${endpoint}`)
      const successStats = performanceMonitor.getStats(`api-${endpoint}-success`)
      const errorStats = performanceMonitor.getStats(`api-${endpoint}-error`)

      if (responseStats) {
        const totalCalls = (successStats?.count || 0) + (errorStats?.count || 0)
        const errorRate = totalCalls > 0 ? ((errorStats?.count || 0) / totalCalls) * 100 : 0

        setApiMetrics({
          totalCalls,
          averageResponseTime: responseStats.average,
          errorRate
        })
      }
    }
  }, [])

  return { apiMetrics, trackApiCall }
}

// Hook for monitoring memory usage
export function useMemoryMonitoring(interval = 5000) {
  const [memoryUsage, setMemoryUsage] = useState<{
    used: number
    total: number
    percentage: number
  } | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('memory' in performance)) {
      return
    }

    const updateMemoryUsage = () => {
      const memory = (performance as any).memory
      if (memory) {
        setMemoryUsage({
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100
        })
      }
    }

    updateMemoryUsage()
    const intervalId = setInterval(updateMemoryUsage, interval)

    return () => clearInterval(intervalId)
  }, [interval])

  return memoryUsage
}

// Hook for performance budget monitoring
export function usePerformanceBudget(budgets: {
  pageLoadTime?: number
  renderTime?: number
  memoryUsage?: number
  bundleSize?: number
}) {
  const [violations, setViolations] = useState<string[]>([])
  const [isWithinBudget, setIsWithinBudget] = useState(true)

  const checkBudget = useCallback((metricName: string, value: number, budget?: number) => {
    if (!budget) return

    const isViolation = value > budget
    const violationKey = `${metricName}-budget-violation`

    setViolations(prev => {
      const filtered = prev.filter(v => v !== violationKey)
      return isViolation ? [...filtered, violationKey] : filtered
    })
  }, [])

  useEffect(() => {
    setIsWithinBudget(violations.length === 0)
  }, [violations])

  return {
    violations,
    isWithinBudget,
    checkBudget
  }
}

// Hook for lazy loading optimization
export function useLazyLoading<T>(
  loadFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const loadedRef = useRef(false)

  const load = useCallback(async () => {
    if (loadedRef.current) return

    setLoading(true)
    setError(null)

    try {
      const result = await performanceMonitor.measureAsyncFunction(
        'lazy-load',
        loadFunction
      )
      setData(result)
      loadedRef.current = true
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }, dependencies)

  return { data, loading, error, load }
}

// Hook for intersection observer (for lazy loading components)
export function useIntersectionObserver(
  callback: (isIntersecting: boolean) => void,
  options: IntersectionObserverInit = {}
) {
  const targetRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => callback(entry.isIntersecting),
      options
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [callback, options])

  return targetRef
}

// Export performance monitoring utilities
export { performanceMonitor }
