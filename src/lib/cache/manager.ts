// Cache manager
// Provides centralized caching functionality with multiple storage backends

import { config } from '@/config/environment'

// Cache entry interface
export interface CacheEntry<T = any> {
  key: string
  data: T
  timestamp: number
  ttl: number
  version?: string
  tags?: string[]
  metadata?: Record<string, any>
}

// Cache storage interface
export interface CacheStorage {
  get<T>(key: string): Promise<CacheEntry<T> | null>
  set<T>(key: string, entry: CacheEntry<T>): Promise<void>
  delete(key: string): Promise<void>
  clear(): Promise<void>
  keys(): Promise<string[]>
  size(): Promise<number>
}

// Memory storage implementation
class MemoryStorage implements CacheStorage {
  private cache = new Map<string, CacheEntry>()

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    const entry = this.cache.get(key)
    if (!entry) return null

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry as CacheEntry<T>
  }

  async set<T>(key: string, entry: CacheEntry<T>): Promise<void> {
    this.cache.set(key, entry)
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key)
  }

  async clear(): Promise<void> {
    this.cache.clear()
  }

  async keys(): Promise<string[]> {
    return Array.from(this.cache.keys())
  }

  async size(): Promise<number> {
    return this.cache.size
  }
}

// LocalStorage implementation
class LocalStorageStorage implements CacheStorage {
  private prefix = 'dentalflow_cache_'

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    if (typeof window === 'undefined') return null

    try {
      const item = localStorage.getItem(this.prefix + key)
      if (!item) return null

      const entry: CacheEntry<T> = JSON.parse(item)

      // Check if expired
      if (Date.now() - entry.timestamp > entry.ttl) {
        localStorage.removeItem(this.prefix + key)
        return null
      }

      return entry
    } catch (error) {
      console.warn('LocalStorage cache get error:', error)
      return null
    }
  }

  async set<T>(key: string, entry: CacheEntry<T>): Promise<void> {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(entry))
    } catch (error) {
      console.warn('LocalStorage cache set error:', error)
      // Handle quota exceeded by clearing old entries
      if (error instanceof DOMException && error.code === 22) {
        await this.clearExpired()
        try {
          localStorage.setItem(this.prefix + key, JSON.stringify(entry))
        } catch (retryError) {
          console.error('LocalStorage cache set retry failed:', retryError)
        }
      }
    }
  }

  async delete(key: string): Promise<void> {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.prefix + key)
  }

  async clear(): Promise<void> {
    if (typeof window === 'undefined') return

    const keys = Object.keys(localStorage).filter(key => key.startsWith(this.prefix))
    keys.forEach(key => localStorage.removeItem(key))
  }

  async keys(): Promise<string[]> {
    if (typeof window === 'undefined') return []

    return Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .map(key => key.replace(this.prefix, ''))
  }

  async size(): Promise<number> {
    return (await this.keys()).length
  }

  private async clearExpired(): Promise<void> {
    const keys = await this.keys()
    const now = Date.now()

    for (const key of keys) {
      const entry = await this.get(key)
      if (!entry || now - entry.timestamp > entry.ttl) {
        await this.delete(key)
      }
    }
  }
}

// IndexedDB storage implementation (for larger data)
class IndexedDBStorage implements CacheStorage {
  private dbName = 'dentalflow_cache'
  private storeName = 'cache_entries'
  private version = 1

  private async getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'key' })
          store.createIndex('timestamp', 'timestamp')
          store.createIndex('tags', 'tags', { multiEntry: true })
        }
      }
    })
  }

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    if (typeof window === 'undefined') return null

    try {
      const db = await this.getDB()
      const transaction = db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.get(key)

      return new Promise((resolve, reject) => {
        request.onerror = () => reject(request.error)
        request.onsuccess = () => {
          const entry = request.result as CacheEntry<T>
          if (!entry) {
            resolve(null)
            return
          }

          // Check if expired
          if (Date.now() - entry.timestamp > entry.ttl) {
            this.delete(key)
            resolve(null)
            return
          }

          resolve(entry)
        }
      })
    } catch (error) {
      console.warn('IndexedDB cache get error:', error)
      return null
    }
  }

  async set<T>(key: string, entry: CacheEntry<T>): Promise<void> {
    if (typeof window === 'undefined') return

    try {
      const db = await this.getDB()
      const transaction = db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      store.put(entry)

      return new Promise((resolve, reject) => {
        transaction.onerror = () => reject(transaction.error)
        transaction.oncomplete = () => resolve()
      })
    } catch (error) {
      console.warn('IndexedDB cache set error:', error)
    }
  }

  async delete(key: string): Promise<void> {
    if (typeof window === 'undefined') return

    try {
      const db = await this.getDB()
      const transaction = db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      store.delete(key)

      return new Promise((resolve, reject) => {
        transaction.onerror = () => reject(transaction.error)
        transaction.oncomplete = () => resolve()
      })
    } catch (error) {
      console.warn('IndexedDB cache delete error:', error)
    }
  }

  async clear(): Promise<void> {
    if (typeof window === 'undefined') return

    try {
      const db = await this.getDB()
      const transaction = db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      store.clear()

      return new Promise((resolve, reject) => {
        transaction.onerror = () => reject(transaction.error)
        transaction.oncomplete = () => resolve()
      })
    } catch (error) {
      console.warn('IndexedDB cache clear error:', error)
    }
  }

  async keys(): Promise<string[]> {
    if (typeof window === 'undefined') return []

    try {
      const db = await this.getDB()
      const transaction = db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.getAllKeys()

      return new Promise((resolve, reject) => {
        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result as string[])
      })
    } catch (error) {
      console.warn('IndexedDB cache keys error:', error)
      return []
    }
  }

  async size(): Promise<number> {
    return (await this.keys()).length
  }
}

// Cache manager class
export class CacheManager {
  private storage: CacheStorage
  private defaultTTL: number
  private maxSize: number

  constructor(
    storage: CacheStorage = new MemoryStorage(),
    defaultTTL: number = config.performance.cacheTimeout,
    maxSize: number = 1000
  ) {
    this.storage = storage
    this.defaultTTL = defaultTTL
    this.maxSize = maxSize
  }

  // Get cached data
  async get<T>(key: string): Promise<T | null> {
    const entry = await this.storage.get<T>(key)
    return entry ? entry.data : null
  }

  // Set cached data
  async set<T>(
    key: string,
    data: T,
    options: {
      ttl?: number
      version?: string
      tags?: string[]
      metadata?: Record<string, any>
    } = {}
  ): Promise<void> {
    const entry: CacheEntry<T> = {
      key,
      data,
      timestamp: Date.now(),
      ttl: options.ttl || this.defaultTTL,
      version: options.version,
      tags: options.tags,
      metadata: options.metadata,
    }

    await this.storage.set(key, entry)

    // Check if we need to evict old entries
    const size = await this.storage.size()
    if (size > this.maxSize) {
      await this.evictOldest()
    }
  }

  // Delete cached data
  async delete(key: string): Promise<void> {
    await this.storage.delete(key)
  }

  // Clear all cached data
  async clear(): Promise<void> {
    await this.storage.clear()
  }

  // Check if key exists and is not expired
  async has(key: string): Promise<boolean> {
    const entry = await this.storage.get(key)
    return entry !== null
  }

  // Get cache statistics
  async getStats(): Promise<{
    size: number
    keys: string[]
    hitRate: number
    memoryUsage: number
  }> {
    const keys = await this.storage.keys()
    return {
      size: keys.length,
      keys,
      hitRate: 0, // Would need to track hits/misses
      memoryUsage: 0, // Would need to calculate actual memory usage
    }
  }

  // Invalidate by tags
  async invalidateByTags(tags: string[]): Promise<void> {
    const keys = await this.storage.keys()
    
    for (const key of keys) {
      const entry = await this.storage.get(key)
      if (entry?.tags && entry.tags.some(tag => tags.includes(tag))) {
        await this.storage.delete(key)
      }
    }
  }

  // Invalidate by version
  async invalidateByVersion(version: string): Promise<void> {
    const keys = await this.storage.keys()
    
    for (const key of keys) {
      const entry = await this.storage.get(key)
      if (entry?.version && entry.version !== version) {
        await this.storage.delete(key)
      }
    }
  }

  // Evict oldest entries
  private async evictOldest(): Promise<void> {
    const keys = await this.storage.keys()
    const entries: Array<{ key: string; timestamp: number }> = []

    for (const key of keys) {
      const entry = await this.storage.get(key)
      if (entry) {
        entries.push({ key, timestamp: entry.timestamp })
      }
    }

    // Sort by timestamp (oldest first)
    entries.sort((a, b) => a.timestamp - b.timestamp)

    // Remove oldest 10% of entries
    const toRemove = Math.ceil(entries.length * 0.1)
    for (let i = 0; i < toRemove; i++) {
      await this.storage.delete(entries[i].key)
    }
  }

  // Cleanup expired entries
  async cleanup(): Promise<void> {
    const keys = await this.storage.keys()
    const now = Date.now()

    for (const key of keys) {
      const entry = await this.storage.get(key)
      if (entry && now - entry.timestamp > entry.ttl) {
        await this.storage.delete(key)
      }
    }
  }
}

// Create cache manager instances
export const memoryCache = new CacheManager(new MemoryStorage())
export const persistentCache = new CacheManager(new LocalStorageStorage())
export const largeDataCache = new CacheManager(new IndexedDBStorage())

// Default cache manager
export const cacheManager = config.performance.enableCaching ? memoryCache : new CacheManager(new MemoryStorage(), 0)
