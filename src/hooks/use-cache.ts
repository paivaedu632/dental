// Cache hooks for React components
// Provides React hooks for caching data with automatic invalidation

import { useState, useEffect, useCallback, useRef } from 'react'
import { cacheManager, memoryCache, persistentCache, largeDataCache } from '@/lib/cache/manager'
import { config } from '@/config/environment'

// Cache hook options
interface UseCacheOptions {
  ttl?: number
  tags?: string[]
  version?: string
  persistent?: boolean
  largeData?: boolean
  enabled?: boolean
  onHit?: (data: any) => void
  onMiss?: () => void
  onError?: (error: Error) => void
}

// Generic cache hook
export function useCache<T>(
  key: string,
  fetcher: () => Promise<T> | T,
  options: UseCacheOptions = {}
) {
  const {
    ttl = config.performance.cacheTimeout,
    tags = [],
    version,
    persistent = false,
    largeData = false,
    enabled = config.performance.enableCaching,
    onHit,
    onMiss,
    onError,
  } = options

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [lastFetch, setLastFetch] = useState<Date | null>(null)

  const cache = largeData ? largeDataCache : persistent ? persistentCache : memoryCache
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  // Load data from cache or fetch
  const loadData = useCallback(async (force = false) => {
    if (!enabled) {
      setLoading(true)
      try {
        const result = await fetcherRef.current()
        setData(result)
        setError(null)
        setLastFetch(new Date())
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error')
        setError(error)
        onError?.(error)
      } finally {
        setLoading(false)
      }
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Try to get from cache first
      if (!force) {
        const cachedData = await cache.get<T>(key)
        if (cachedData !== null) {
          setData(cachedData)
          setLoading(false)
          setLastFetch(new Date())
          onHit?.(cachedData)
          return cachedData
        }
      }

      // Cache miss - fetch data
      onMiss?.()
      const result = await fetcherRef.current()
      
      // Store in cache
      await cache.set(key, result, { ttl, tags, version })
      
      setData(result)
      setLastFetch(new Date())
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error)
      onError?.(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [key, enabled, ttl, tags, version, cache, onHit, onMiss, onError])

  // Invalidate cache
  const invalidate = useCallback(async () => {
    await cache.delete(key)
    setData(null)
    setLastFetch(null)
  }, [key, cache])

  // Refresh data (force fetch)
  const refresh = useCallback(() => {
    return loadData(true)
  }, [loadData])

  // Update cached data
  const updateCache = useCallback(async (newData: T) => {
    await cache.set(key, newData, { ttl, tags, version })
    setData(newData)
    setLastFetch(new Date())
  }, [key, cache, ttl, tags, version])

  // Load data on mount
  useEffect(() => {
    loadData()
  }, [loadData])

  return {
    data,
    loading,
    error,
    lastFetch,
    refresh,
    invalidate,
    updateCache,
    isStale: lastFetch ? Date.now() - lastFetch.getTime() > ttl : true,
  }
}

// Hook for caching API responses
export function useApiCache<T>(
  endpoint: string,
  fetcher: () => Promise<T>,
  options: UseCacheOptions = {}
) {
  const cacheKey = `api:${endpoint}`
  return useCache(cacheKey, fetcher, {
    ...options,
    tags: ['api', ...(options.tags || [])],
  })
}

// Hook for caching user data
export function useUserCache<T>(
  userId: string,
  dataType: string,
  fetcher: () => Promise<T>,
  options: UseCacheOptions = {}
) {
  const cacheKey = `user:${userId}:${dataType}`
  return useCache(cacheKey, fetcher, {
    ...options,
    tags: ['user', `user:${userId}`, ...(options.tags || [])],
    persistent: true,
  })
}

// Hook for caching practice data
export function usePracticeCache<T>(
  practiceId: string,
  dataType: string,
  fetcher: () => Promise<T>,
  options: UseCacheOptions = {}
) {
  const cacheKey = `practice:${practiceId}:${dataType}`
  return useCache(cacheKey, fetcher, {
    ...options,
    tags: ['practice', `practice:${practiceId}`, ...(options.tags || [])],
    persistent: true,
  })
}

// Hook for caching query results
export function useQueryCache<T>(
  queryKey: string[],
  fetcher: () => Promise<T>,
  options: UseCacheOptions = {}
) {
  const cacheKey = queryKey.join(':')
  return useCache(cacheKey, fetcher, options)
}

// Hook for cache invalidation
export function useCacheInvalidation() {
  const invalidateByKey = useCallback(async (key: string) => {
    await Promise.all([
      memoryCache.delete(key),
      persistentCache.delete(key),
      largeDataCache.delete(key),
    ])
  }, [])

  const invalidateByTags = useCallback(async (tags: string[]) => {
    await Promise.all([
      memoryCache.invalidateByTags(tags),
      persistentCache.invalidateByTags(tags),
      largeDataCache.invalidateByTags(tags),
    ])
  }, [])

  const invalidateByVersion = useCallback(async (version: string) => {
    await Promise.all([
      memoryCache.invalidateByVersion(version),
      persistentCache.invalidateByVersion(version),
      largeDataCache.invalidateByVersion(version),
    ])
  }, [])

  const clearAll = useCallback(async () => {
    await Promise.all([
      memoryCache.clear(),
      persistentCache.clear(),
      largeDataCache.clear(),
    ])
  }, [])

  return {
    invalidateByKey,
    invalidateByTags,
    invalidateByVersion,
    clearAll,
  }
}

// Hook for cache statistics
export function useCacheStats() {
  const [stats, setStats] = useState<{
    memory: any
    persistent: any
    largeData: any
  } | null>(null)

  const refreshStats = useCallback(async () => {
    const [memoryStats, persistentStats, largeDataStats] = await Promise.all([
      memoryCache.getStats(),
      persistentCache.getStats(),
      largeDataCache.getStats(),
    ])

    setStats({
      memory: memoryStats,
      persistent: persistentStats,
      largeData: largeDataStats,
    })
  }, [])

  useEffect(() => {
    refreshStats()
    const interval = setInterval(refreshStats, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [refreshStats])

  return { stats, refreshStats }
}

// Hook for optimistic updates with cache
export function useOptimisticCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: UseCacheOptions = {}
) {
  const cacheHook = useCache(key, fetcher, options)
  const [optimisticData, setOptimisticData] = useState<T | null>(null)

  const updateOptimistically = useCallback(async (
    newData: T,
    updateFn: () => Promise<T>
  ) => {
    // Set optimistic data immediately
    setOptimisticData(newData)

    try {
      // Perform the actual update
      const result = await updateFn()
      
      // Update cache with real result
      await cacheHook.updateCache(result)
      
      // Clear optimistic data
      setOptimisticData(null)
      
      return result
    } catch (error) {
      // Revert optimistic data on error
      setOptimisticData(null)
      throw error
    }
  }, [cacheHook])

  return {
    ...cacheHook,
    data: optimisticData || cacheHook.data,
    updateOptimistically,
    isOptimistic: optimisticData !== null,
  }
}

// Hook for cache warming
export function useCacheWarming() {
  const warmCache = useCallback(async (
    entries: Array<{
      key: string
      fetcher: () => Promise<any>
      options?: UseCacheOptions
    }>
  ) => {
    const promises = entries.map(async ({ key, fetcher, options = {} }) => {
      const {
        ttl = config.performance.cacheTimeout,
        tags = [],
        version,
        persistent = false,
        largeData = false,
      } = options

      const cache = largeData ? largeDataCache : persistent ? persistentCache : memoryCache

      try {
        // Check if already cached
        const existing = await cache.get(key)
        if (existing) return

        // Fetch and cache
        const data = await fetcher()
        await cache.set(key, data, { ttl, tags, version })
      } catch (error) {
        console.warn(`Cache warming failed for key ${key}:`, error)
      }
    })

    await Promise.allSettled(promises)
  }, [])

  return { warmCache }
}

// Hook for cache synchronization across tabs
export function useCacheSync() {
  const [syncEnabled, setSyncEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key?.startsWith('dentalflow_cache_sync_')) {
        const key = event.key.replace('dentalflow_cache_sync_', '')
        if (event.newValue === null) {
          // Key was deleted in another tab
          memoryCache.delete(key)
        } else {
          // Key was updated in another tab
          try {
            const data = JSON.parse(event.newValue)
            memoryCache.set(key, data.data, {
              ttl: data.ttl,
              tags: data.tags,
              version: data.version,
            })
          } catch (error) {
            console.warn('Cache sync error:', error)
          }
        }
      }
    }

    if (syncEnabled) {
      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }
  }, [syncEnabled])

  return { syncEnabled, setSyncEnabled }
}
