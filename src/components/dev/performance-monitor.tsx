"use client"

// Development-only performance monitoring component
// Displays real-time performance metrics in development mode

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useMemoryMonitoring, usePagePerformance } from '@/hooks/use-performance'
import { performanceMonitor } from '@/lib/performance'

interface PerformanceMonitorProps {
  pageName: string
  showInProduction?: boolean
}

export function PerformanceMonitor({ 
  pageName, 
  showInProduction = false 
}: PerformanceMonitorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [metrics, setMetrics] = useState<Record<string, any>>({})
  const pageMetrics = usePagePerformance(pageName)
  const memoryUsage = useMemoryMonitoring(2000)

  // Only show in development unless explicitly enabled for production
  const shouldShow = showInProduction || process.env.NODE_ENV === 'development'

  useEffect(() => {
    if (!shouldShow) return

    const updateMetrics = () => {
      const allMetrics: Record<string, any> = {}
      
      // Get page-specific metrics
      const pageLoadStats = performanceMonitor.getStats(`page-load-${pageName}`)
      const renderStats = performanceMonitor.getStats(`render-${pageName}`)
      
      if (pageLoadStats) allMetrics.pageLoad = pageLoadStats
      if (renderStats) allMetrics.render = renderStats
      
      setMetrics(allMetrics)
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 1000)

    return () => clearInterval(interval)
  }, [pageName, shouldShow])

  if (!shouldShow) return null

  const formatTime = (ms: number) => `${ms.toFixed(2)}ms`
  const formatBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
  }

  const getPerformanceColor = (value: number, thresholds: { good: number; fair: number }) => {
    if (value <= thresholds.good) return 'bg-green-500'
    if (value <= thresholds.fair) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isVisible ? (
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-background/80 backdrop-blur-sm"
        >
          📊 Performance
        </Button>
      ) : (
        <Card className="w-80 bg-background/95 backdrop-blur-sm border shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Performance Monitor</CardTitle>
              <Button
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
              >
                ✕
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Page: {pageName}</p>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {/* Page Load Metrics */}
            {pageMetrics.loadTime && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>Load Time</span>
                  <Badge 
                    variant="outline" 
                    className={`text-white ${getPerformanceColor(pageMetrics.loadTime, { good: 1000, fair: 3000 })}`}
                  >
                    {formatTime(pageMetrics.loadTime)}
                  </Badge>
                </div>
              </div>
            )}

            {/* Render Metrics */}
            {metrics.render && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>Avg Render</span>
                  <Badge 
                    variant="outline"
                    className={`text-white ${getPerformanceColor(metrics.render.average, { good: 16, fair: 50 })}`}
                  >
                    {formatTime(metrics.render.average)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Renders</span>
                  <span>{metrics.render.count}</span>
                </div>
              </div>
            )}

            {/* Memory Usage */}
            {memoryUsage && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>Memory</span>
                  <Badge 
                    variant="outline"
                    className={`text-white ${getPerformanceColor(memoryUsage.percentage, { good: 50, fair: 80 })}`}
                  >
                    {memoryUsage.percentage.toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Used</span>
                  <span>{formatBytes(memoryUsage.used)}</span>
                </div>
              </div>
            )}

            {/* Interaction Time */}
            {pageMetrics.interactionTime && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>First Interaction</span>
                  <Badge 
                    variant="outline"
                    className={`text-white ${getPerformanceColor(pageMetrics.interactionTime, { good: 100, fair: 300 })}`}
                  >
                    {formatTime(pageMetrics.interactionTime)}
                  </Badge>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t">
              <Button
                onClick={() => {
                  performanceMonitor.clearMetrics()
                  setMetrics({})
                }}
                variant="outline"
                size="sm"
                className="flex-1 h-7 text-xs"
              >
                Clear
              </Button>
              <Button
                onClick={() => {
                  const allStats = Object.keys(metrics).reduce((acc, key) => {
                    acc[key] = performanceMonitor.getStats(key)
                    return acc
                  }, {} as Record<string, any>)
                  console.log('Performance Metrics:', {
                    page: pageName,
                    pageMetrics,
                    memoryUsage,
                    detailedStats: allStats
                  })
                }}
                variant="outline"
                size="sm"
                className="flex-1 h-7 text-xs"
              >
                Log
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// HOC to wrap pages with performance monitoring
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  pageName: string
) {
  const WrappedComponent: React.FC<P> = (props) => (
    <>
      <Component {...props} />
      <PerformanceMonitor pageName={pageName} />
    </>
  )

  WrappedComponent.displayName = `withPerformanceMonitoring(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

// Performance metrics summary component
export function PerformanceSummary() {
  const [summary, setSummary] = useState<{
    totalMetrics: number
    averagePageLoad: number
    averageRender: number
    memoryPeak: number
  }>({
    totalMetrics: 0,
    averagePageLoad: 0,
    averageRender: 0,
    memoryPeak: 0
  })

  useEffect(() => {
    // This would aggregate all performance data
    // Implementation would depend on how metrics are stored
    const updateSummary = () => {
      // Placeholder implementation
      setSummary({
        totalMetrics: 0,
        averagePageLoad: 0,
        averageRender: 0,
        memoryPeak: 0
      })
    }

    updateSummary()
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="w-64 bg-background/95 backdrop-blur-sm border shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Performance Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Total Metrics:</span>
            <span>{summary.totalMetrics}</span>
          </div>
          <div className="flex justify-between">
            <span>Avg Page Load:</span>
            <span>{summary.averagePageLoad.toFixed(2)}ms</span>
          </div>
          <div className="flex justify-between">
            <span>Avg Render:</span>
            <span>{summary.averageRender.toFixed(2)}ms</span>
          </div>
          <div className="flex justify-between">
            <span>Memory Peak:</span>
            <span>{(summary.memoryPeak / 1024 / 1024).toFixed(2)}MB</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
