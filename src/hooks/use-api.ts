// API hooks for React components
// Provides convenient hooks for making API calls with state management

import { useState, useEffect, useCallback, useRef } from 'react'
import { apiClient } from '@/lib/api/client'
import { useCache } from '@/store'
import { performanceMonitor } from '@/lib/performance'
import type { ApiResponse, ApiError, ApiRequestConfig } from '@/types/api'

// Generic API hook state
interface ApiState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
  success: boolean
}

// API hook options
interface UseApiOptions {
  immediate?: boolean
  cache?: boolean
  cacheKey?: string
  cacheTTL?: number
  retries?: number
  onSuccess?: (data: any) => void
  onError?: (error: ApiError) => void
  dependencies?: any[]
}

// Generic API hook
export function useApi<T = unknown>(
  requestConfig: Partial<ApiRequestConfig>,
  options: UseApiOptions = {}
) {
  const {
    immediate = false,
    cache = false,
    cacheKey,
    cacheTTL = 300000, // 5 minutes
    retries = 3,
    onSuccess,
    onError,
    dependencies = [],
  } = options

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  })

  const { get: getCached, set: setCached } = useCache()
  const abortControllerRef = useRef<AbortController | null>(null)
  const mountedRef = useRef(true)

  // Generate cache key if not provided
  const finalCacheKey = cacheKey || `api_${JSON.stringify(requestConfig)}`

  // Execute API request
  const execute = useCallback(async (overrideConfig?: Partial<ApiRequestConfig>) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Check cache first
    if (cache) {
      const cachedData = getCached(finalCacheKey)
      if (cachedData) {
        setState({
          data: cachedData,
          loading: false,
          error: null,
          success: true,
        })
        return cachedData
      }
    }

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const config = { ...requestConfig, ...overrideConfig, retries }
      
      const response = await performanceMonitor.measureAsyncFunction(
        `api-${config.method}-${config.url}`,
        () => apiClient.request<T>(config)
      )

      if (!mountedRef.current) return

      const data = response.data

      setState({
        data,
        loading: false,
        error: null,
        success: true,
      })

      // Cache successful response
      if (cache && data) {
        setCached(finalCacheKey, data, cacheTTL)
      }

      // Call success callback
      if (onSuccess) {
        onSuccess(data)
      }

      return data
    } catch (error) {
      if (!mountedRef.current) return

      const apiError = error as ApiError

      setState({
        data: null,
        loading: false,
        error: apiError,
        success: false,
      })

      // Call error callback
      if (onError) {
        onError(apiError)
      }

      throw apiError
    }
  }, [requestConfig, retries, cache, finalCacheKey, cacheTTL, getCached, setCached, onSuccess, onError])

  // Execute on mount if immediate is true
  useEffect(() => {
    if (immediate) {
      execute()
    }

    return () => {
      mountedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [immediate, execute, ...dependencies])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  return {
    ...state,
    execute,
    refetch: execute,
    reset: () => setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    }),
  }
}

// Hook for GET requests
export function useGet<T = unknown>(
  url: string,
  options: UseApiOptions = {}
) {
  return useApi<T>({ method: 'GET', url }, options)
}

// Hook for POST requests
export function usePost<T = unknown>(
  url: string,
  options: UseApiOptions = {}
) {
  const apiHook = useApi<T>({ method: 'POST', url }, { ...options, immediate: false })

  const post = useCallback((data?: unknown) => {
    return apiHook.execute({ data })
  }, [apiHook.execute])

  return {
    ...apiHook,
    post,
  }
}

// Hook for PUT requests
export function usePut<T = unknown>(
  url: string,
  options: UseApiOptions = {}
) {
  const apiHook = useApi<T>({ method: 'PUT', url }, { ...options, immediate: false })

  const put = useCallback((data?: unknown) => {
    return apiHook.execute({ data })
  }, [apiHook.execute])

  return {
    ...apiHook,
    put,
  }
}

// Hook for PATCH requests
export function usePatch<T = unknown>(
  url: string,
  options: UseApiOptions = {}
) {
  const apiHook = useApi<T>({ method: 'PATCH', url }, { ...options, immediate: false })

  const patch = useCallback((data?: unknown) => {
    return apiHook.execute({ data })
  }, [apiHook.execute])

  return {
    ...apiHook,
    patch,
  }
}

// Hook for DELETE requests
export function useDelete<T = unknown>(
  url: string,
  options: UseApiOptions = {}
) {
  const apiHook = useApi<T>({ method: 'DELETE', url }, { ...options, immediate: false })

  const del = useCallback(() => {
    return apiHook.execute()
  }, [apiHook.execute])

  return {
    ...apiHook,
    delete: del,
  }
}

// Hook for multiple API calls
export function useMultipleApi<T extends Record<string, any>>(
  requests: Record<keyof T, { config: Partial<ApiRequestConfig>; options?: UseApiOptions }>,
  options: { immediate?: boolean } = {}
) {
  const [state, setState] = useState<{
    data: Partial<T>
    loading: boolean
    errors: Record<keyof T, ApiError | null>
    success: boolean
  }>({
    data: {},
    loading: false,
    errors: {} as Record<keyof T, ApiError | null>,
    success: false,
  })

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }))

    const results: Partial<T> = {}
    const errors: Record<keyof T, ApiError | null> = {} as Record<keyof T, ApiError | null>

    await Promise.allSettled(
      Object.entries(requests).map(async ([key, { config, options: requestOptions }]) => {
        try {
          const response = await apiClient.request(config)
          results[key as keyof T] = response.data
          errors[key as keyof T] = null
        } catch (error) {
          errors[key as keyof T] = error as ApiError
        }
      })
    )

    setState({
      data: results,
      loading: false,
      errors,
      success: Object.values(errors).every(error => error === null),
    })

    return results
  }, [requests])

  useEffect(() => {
    if (options.immediate) {
      execute()
    }
  }, [options.immediate, execute])

  return {
    ...state,
    execute,
    refetch: execute,
  }
}

// Hook for paginated API calls
export function usePagination<T = unknown>(
  baseUrl: string,
  options: UseApiOptions & {
    pageSize?: number
    initialPage?: number
  } = {}
) {
  const { pageSize = 20, initialPage = 1, ...apiOptions } = options
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [allData, setAllData] = useState<T[]>([])

  const { data, loading, error, execute } = useGet<{
    data: T[]
    pagination: {
      page: number
      pageSize: number
      total: number
      totalPages: number
    }
  }>(`${baseUrl}?page=${currentPage}&pageSize=${pageSize}`, {
    ...apiOptions,
    dependencies: [currentPage, pageSize],
  })

  const loadMore = useCallback(() => {
    if (data?.pagination && currentPage < data.pagination.totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }, [data?.pagination, currentPage])

  const reset = useCallback(() => {
    setCurrentPage(initialPage)
    setAllData([])
  }, [initialPage])

  // Accumulate data from all pages
  useEffect(() => {
    if (data?.data) {
      if (currentPage === 1) {
        setAllData(data.data)
      } else {
        setAllData(prev => [...prev, ...data.data])
      }
    }
  }, [data, currentPage])

  return {
    data: allData,
    pagination: data?.pagination,
    loading,
    error,
    currentPage,
    setPage: setCurrentPage,
    loadMore,
    hasMore: data?.pagination ? currentPage < data.pagination.totalPages : false,
    reset,
    refetch: execute,
  }
}

// Hook for optimistic updates
export function useOptimisticUpdate<T = unknown>(
  url: string,
  options: UseApiOptions = {}
) {
  const [optimisticData, setOptimisticData] = useState<T | null>(null)
  const { data, loading, error, execute } = useApi<T>({ method: 'POST', url }, { ...options, immediate: false })

  const updateOptimistically = useCallback(async (newData: T, requestData?: unknown) => {
    // Set optimistic data immediately
    setOptimisticData(newData)

    try {
      // Make the actual API call
      const result = await execute({ data: requestData })
      // Clear optimistic data on success
      setOptimisticData(null)
      return result
    } catch (error) {
      // Revert optimistic data on error
      setOptimisticData(null)
      throw error
    }
  }, [execute])

  return {
    data: optimisticData || data,
    loading,
    error,
    updateOptimistically,
    isOptimistic: optimisticData !== null,
  }
}

// Export types
export type { ApiState, UseApiOptions }
