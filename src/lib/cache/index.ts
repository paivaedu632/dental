// Cache module exports
// Central export point for all caching functionality

// Cache manager and storage
export {
  CacheManager,
  cacheManager,
  memoryCache,
  persistentCache,
  largeDataCache,
} from './manager'

export type {
  CacheEntry,
  CacheStorage,
} from './manager'

// Cache strategies
export class CacheStrategies {
  // Cache-first strategy: Check cache first, fallback to network
  static async cacheFirst<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: { ttl?: number; cache?: any } = {}
  ): Promise<T> {
    const { ttl = 300000, cache = cacheManager } = options

    // Try cache first
    const cached = await cache.get<T>(key)
    if (cached !== null) {
      return cached
    }

    // Fallback to network
    const data = await fetcher()
    await cache.set(key, data, { ttl })
    return data
  }

  // Network-first strategy: Try network first, fallback to cache
  static async networkFirst<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: { ttl?: number; cache?: any } = {}
  ): Promise<T> {
    const { ttl = 300000, cache = cacheManager } = options

    try {
      // Try network first
      const data = await fetcher()
      await cache.set(key, data, { ttl })
      return data
    } catch (error) {
      // Fallback to cache
      const cached = await cache.get<T>(key)
      if (cached !== null) {
        return cached
      }
      throw error
    }
  }

  // Stale-while-revalidate: Return cached data immediately, update in background
  static async staleWhileRevalidate<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: { ttl?: number; cache?: any; maxAge?: number } = {}
  ): Promise<T> {
    const { ttl = 300000, cache = cacheManager, maxAge = 60000 } = options

    const cached = await cache.get<T>(key)
    
    if (cached !== null) {
      // Check if data is stale
      const entry = await cache.storage.get(key)
      const isStale = entry && (Date.now() - entry.timestamp) > maxAge

      if (isStale) {
        // Update in background
        fetcher().then(data => {
          cache.set(key, data, { ttl })
        }).catch(error => {
          console.warn('Background revalidation failed:', error)
        })
      }

      return cached
    }

    // No cached data, fetch immediately
    const data = await fetcher()
    await cache.set(key, data, { ttl })
    return data
  }

  // Cache-only strategy: Only return cached data
  static async cacheOnly<T>(
    key: string,
    options: { cache?: any } = {}
  ): Promise<T | null> {
    const { cache = cacheManager } = options
    return cache.get<T>(key)
  }

  // Network-only strategy: Always fetch from network
  static async networkOnly<T>(
    fetcher: () => Promise<T>
  ): Promise<T> {
    return fetcher()
  }
}

// Cache invalidation patterns
export class CacheInvalidation {
  // Invalidate by pattern
  static async invalidateByPattern(
    pattern: RegExp,
    cache = cacheManager
  ): Promise<void> {
    const keys = await cache.storage.keys()
    const matchingKeys = keys.filter(key => pattern.test(key))
    
    await Promise.all(
      matchingKeys.map(key => cache.delete(key))
    )
  }

  // Invalidate by prefix
  static async invalidateByPrefix(
    prefix: string,
    cache = cacheManager
  ): Promise<void> {
    const keys = await cache.storage.keys()
    const matchingKeys = keys.filter(key => key.startsWith(prefix))
    
    await Promise.all(
      matchingKeys.map(key => cache.delete(key))
    )
  }

  // Invalidate by suffix
  static async invalidateBySuffix(
    suffix: string,
    cache = cacheManager
  ): Promise<void> {
    const keys = await cache.storage.keys()
    const matchingKeys = keys.filter(key => key.endsWith(suffix))
    
    await Promise.all(
      matchingKeys.map(key => cache.delete(key))
    )
  }

  // Cascade invalidation (invalidate related keys)
  static async cascadeInvalidation(
    key: string,
    relations: string[],
    cache = cacheManager
  ): Promise<void> {
    // Invalidate the main key
    await cache.delete(key)
    
    // Invalidate related keys
    await Promise.all(
      relations.map(relatedKey => cache.delete(relatedKey))
    )
  }

  // Time-based invalidation
  static async invalidateOlderThan(
    maxAge: number,
    cache = cacheManager
  ): Promise<void> {
    const keys = await cache.storage.keys()
    const now = Date.now()
    
    for (const key of keys) {
      const entry = await cache.storage.get(key)
      if (entry && (now - entry.timestamp) > maxAge) {
        await cache.delete(key)
      }
    }
  }
}

// Cache utilities
export class CacheUtils {
  // Generate cache key from object
  static generateKey(prefix: string, params: Record<string, any>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${JSON.stringify(params[key])}`)
      .join('|')
    
    return `${prefix}:${sortedParams}`
  }

  // Hash string for cache key
  static hashKey(input: string): string {
    let hash = 0
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36)
  }

  // Serialize data for caching
  static serialize(data: any): string {
    try {
      return JSON.stringify(data, (key, value) => {
        // Handle special types
        if (value instanceof Date) {
          return { __type: 'Date', value: value.toISOString() }
        }
        if (value instanceof Map) {
          return { __type: 'Map', value: Array.from(value.entries()) }
        }
        if (value instanceof Set) {
          return { __type: 'Set', value: Array.from(value) }
        }
        return value
      })
    } catch (error) {
      console.warn('Cache serialization error:', error)
      return JSON.stringify(null)
    }
  }

  // Deserialize data from cache
  static deserialize(serialized: string): any {
    try {
      return JSON.parse(serialized, (key, value) => {
        // Handle special types
        if (value && typeof value === 'object' && value.__type) {
          switch (value.__type) {
            case 'Date':
              return new Date(value.value)
            case 'Map':
              return new Map(value.value)
            case 'Set':
              return new Set(value.value)
          }
        }
        return value
      })
    } catch (error) {
      console.warn('Cache deserialization error:', error)
      return null
    }
  }

  // Calculate cache hit rate
  static calculateHitRate(hits: number, misses: number): number {
    const total = hits + misses
    return total > 0 ? (hits / total) * 100 : 0
  }

  // Estimate memory usage
  static estimateSize(data: any): number {
    const serialized = this.serialize(data)
    return new Blob([serialized]).size
  }

  // Compress data for storage
  static async compress(data: string): Promise<string> {
    if (typeof CompressionStream !== 'undefined') {
      try {
        const stream = new CompressionStream('gzip')
        const writer = stream.writable.getWriter()
        const reader = stream.readable.getReader()
        
        writer.write(new TextEncoder().encode(data))
        writer.close()
        
        const chunks: Uint8Array[] = []
        let done = false
        
        while (!done) {
          const { value, done: readerDone } = await reader.read()
          done = readerDone
          if (value) chunks.push(value)
        }
        
        const compressed = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0))
        let offset = 0
        for (const chunk of chunks) {
          compressed.set(chunk, offset)
          offset += chunk.length
        }
        
        return btoa(String.fromCharCode(...compressed))
      } catch (error) {
        console.warn('Compression failed:', error)
        return data
      }
    }
    return data
  }

  // Decompress data from storage
  static async decompress(compressed: string): Promise<string> {
    if (typeof DecompressionStream !== 'undefined') {
      try {
        const bytes = Uint8Array.from(atob(compressed), c => c.charCodeAt(0))
        const stream = new DecompressionStream('gzip')
        const writer = stream.writable.getWriter()
        const reader = stream.readable.getReader()
        
        writer.write(bytes)
        writer.close()
        
        const chunks: Uint8Array[] = []
        let done = false
        
        while (!done) {
          const { value, done: readerDone } = await reader.read()
          done = readerDone
          if (value) chunks.push(value)
        }
        
        const decompressed = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0))
        let offset = 0
        for (const chunk of chunks) {
          decompressed.set(chunk, offset)
          offset += chunk.length
        }
        
        return new TextDecoder().decode(decompressed)
      } catch (error) {
        console.warn('Decompression failed:', error)
        return compressed
      }
    }
    return compressed
  }
}

// Cache middleware for API calls
export class CacheMiddleware {
  static create(options: {
    defaultTTL?: number
    keyGenerator?: (url: string, options: any) => string
    shouldCache?: (response: any) => boolean
  } = {}) {
    const {
      defaultTTL = 300000,
      keyGenerator = (url, options) => `api:${url}:${JSON.stringify(options)}`,
      shouldCache = (response) => response.ok,
    } = options

    return {
      async request(url: string, options: any = {}) {
        const cacheKey = keyGenerator(url, options)
        
        // For GET requests, try cache first
        if (!options.method || options.method === 'GET') {
          const cached = await cacheManager.get(cacheKey)
          if (cached) return cached
        }

        // Make the request
        const response = await fetch(url, options)
        
        // Cache successful responses
        if (shouldCache(response)) {
          const data = await response.clone().json()
          await cacheManager.set(cacheKey, data, { ttl: defaultTTL })
        }

        return response
      }
    }
  }
}

// Export cache constants
export const CACHE_KEYS = {
  USER_PROFILE: 'user:profile',
  PRACTICE_INFO: 'practice:info',
  BILLING_USAGE: 'billing:usage',
  APPOINTMENTS: 'appointments',
  STAFF_LIST: 'staff:list',
  SETTINGS: 'settings',
} as const

export const CACHE_TAGS = {
  USER: 'user',
  PRACTICE: 'practice',
  BILLING: 'billing',
  APPOINTMENTS: 'appointments',
  STAFF: 'staff',
  SETTINGS: 'settings',
  API: 'api',
} as const

export const CACHE_TTL = {
  SHORT: 60000, // 1 minute
  MEDIUM: 300000, // 5 minutes
  LONG: 1800000, // 30 minutes
  VERY_LONG: 3600000, // 1 hour
} as const

// Initialize cache cleanup
if (typeof window !== 'undefined') {
  // Cleanup expired entries every 5 minutes
  setInterval(() => {
    cacheManager.cleanup()
    persistentCache.cleanup()
    largeDataCache.cleanup()
  }, 300000)
}
