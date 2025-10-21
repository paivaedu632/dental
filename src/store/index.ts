// Store module exports
// Central export point for all state management functionality

// Context and hooks
export {
  AppContextProvider,
  useAppContext,
  useUser,
  usePractice,
  useBilling,
  useUI,
  useSettings,
  useCache,
  AppContext,
} from './context'

// Types
export type {
  AppState,
  AppAction,
  UserState,
  PracticeState,
  BillingState,
  UIState,
  SettingsState,
  CacheState,
  UserPreferences,
  PracticeSettings,
  UsageMetrics,
  PaymentMethod,
  Invoice,
  Breadcrumb,
  ModalState,
  ErrorState,
  NotificationState,
  NotificationAction,
  CacheEntry,
  PerformanceMetrics,
  StateSelectors,
  AppContextProviderProps,
} from './types'

// Reducer and initial state
export { appReducer, initialState } from './reducer'

// Action creators for better type safety and consistency
export const actionCreators = {
  // User actions
  user: {
    login: (user: any) => ({ type: 'USER_LOGIN' as const, payload: user }),
    logout: () => ({ type: 'USER_LOGOUT' as const }),
    update: (updates: any) => ({ type: 'USER_UPDATE' as const, payload: updates }),
    setLoading: (loading: boolean) => ({ type: 'USER_SET_LOADING' as const, payload: loading }),
    setPreferences: (preferences: any) => ({ type: 'USER_SET_PREFERENCES' as const, payload: preferences }),
  },

  // Practice actions
  practice: {
    set: (practice: any) => ({ type: 'PRACTICE_SET' as const, payload: practice }),
    update: (updates: any) => ({ type: 'PRACTICE_UPDATE' as const, payload: updates }),
    setLoading: (loading: boolean) => ({ type: 'PRACTICE_SET_LOADING' as const, payload: loading }),
    addStaff: (staff: any) => ({ type: 'PRACTICE_ADD_STAFF' as const, payload: staff }),
    updateStaff: (id: string, updates: any) => ({ type: 'PRACTICE_UPDATE_STAFF' as const, payload: { id, updates } }),
  },

  // Billing actions
  billing: {
    setPeriod: (period: any) => ({ type: 'BILLING_SET_PERIOD' as const, payload: period }),
    updateUsage: (usage: any) => ({ type: 'BILLING_UPDATE_USAGE' as const, payload: usage }),
    setLoading: (loading: boolean) => ({ type: 'BILLING_SET_LOADING' as const, payload: loading }),
    addPaymentMethod: (method: any) => ({ type: 'BILLING_ADD_PAYMENT_METHOD' as const, payload: method }),
    addInvoice: (invoice: any) => ({ type: 'BILLING_ADD_INVOICE' as const, payload: invoice }),
  },

  // UI actions
  ui: {
    toggleSidebar: () => ({ type: 'UI_TOGGLE_SIDEBAR' as const }),
    setSidebar: (collapsed: boolean) => ({ type: 'UI_SET_SIDEBAR' as const, payload: collapsed }),
    setPage: (page: string) => ({ type: 'UI_SET_PAGE' as const, payload: page }),
    setBreadcrumbs: (breadcrumbs: any[]) => ({ type: 'UI_SET_BREADCRUMBS' as const, payload: breadcrumbs }),
    openModal: (id: string, type: string, data?: any) => ({ type: 'UI_OPEN_MODAL' as const, payload: { id, type, data } }),
    closeModal: (id: string) => ({ type: 'UI_CLOSE_MODAL' as const, payload: id }),
    addError: (error: any) => ({ type: 'UI_ADD_ERROR' as const, payload: error }),
    dismissError: (id: string) => ({ type: 'UI_DISMISS_ERROR' as const, payload: id }),
    addNotification: (notification: any) => ({ type: 'UI_ADD_NOTIFICATION' as const, payload: notification }),
    markNotificationRead: (id: string) => ({ type: 'UI_MARK_NOTIFICATION_READ' as const, payload: id }),
    setTheme: (theme: 'light' | 'dark' | 'system') => ({ type: 'UI_SET_THEME' as const, payload: theme }),
    setLoading: (loading: boolean) => ({ type: 'UI_SET_LOADING' as const, payload: loading }),
  },

  // Settings actions
  settings: {
    setTab: (tab: string) => ({ type: 'SETTINGS_SET_TAB' as const, payload: tab }),
    setDirty: (dirty: boolean) => ({ type: 'SETTINGS_SET_DIRTY' as const, payload: dirty }),
    updatePending: (changes: any) => ({ type: 'SETTINGS_UPDATE_PENDING' as const, payload: changes }),
    save: (settings: any) => ({ type: 'SETTINGS_SAVE' as const, payload: settings }),
    reset: () => ({ type: 'SETTINGS_RESET' as const }),
  },

  // Cache actions
  cache: {
    set: (key: string, data: any, ttl?: number) => ({ type: 'CACHE_SET' as const, payload: { key, data, ttl } }),
    invalidate: (key: string) => ({ type: 'CACHE_INVALIDATE' as const, payload: key }),
    clear: () => ({ type: 'CACHE_CLEAR' as const }),
    updatePerformance: (metrics: any) => ({ type: 'CACHE_UPDATE_PERFORMANCE' as const, payload: metrics }),
  },
}

// Utility functions for working with state
export const stateUtils = {
  // Check if user has permission
  hasPermission: (state: AppState, permission: string): boolean => {
    return state.user.permissions.includes(permission) || state.user.permissions.includes('admin')
  },

  // Get current billing period info
  getCurrentBillingInfo: (state: AppState) => {
    const { currentPeriod, usage } = state.billing
    if (!currentPeriod) return null

    return {
      period: currentPeriod,
      usage: usage.currentMonth,
      isOverLimit: usage.currentMonth.appointmentCount > 10,
      projectedCost: usage.currentMonth.totalFee,
    }
  },

  // Get unread notification count
  getUnreadCount: (state: AppState): number => {
    return state.ui.notifications.filter(n => !n.read).length
  },

  // Get active error count
  getActiveErrorCount: (state: AppState): number => {
    return state.ui.errors.filter(e => !e.dismissed).length
  },

  // Check if settings have unsaved changes
  hasUnsavedChanges: (state: AppState): boolean => {
    return state.settings.isDirty && Object.keys(state.settings.pendingChanges).length > 0
  },

  // Get cache hit rate
  getCacheHitRate: (state: AppState): number => {
    const totalEntries = state.cache.apiCache.size
    if (totalEntries === 0) return 0

    // This would need to be tracked separately in a real implementation
    return 0.85 // Placeholder
  },

  // Get performance summary
  getPerformanceSummary: (state: AppState) => {
    const { performance } = state.cache
    const pageLoadTimes = Object.values(performance.pageLoadTimes).flat()
    const renderTimes = Object.values(performance.renderTimes).flat()

    return {
      averagePageLoad: pageLoadTimes.length > 0 
        ? pageLoadTimes.reduce((a, b) => a + b, 0) / pageLoadTimes.length 
        : 0,
      averageRender: renderTimes.length > 0 
        ? renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length 
        : 0,
      memoryUsage: performance.memoryUsage.length > 0 
        ? performance.memoryUsage[performance.memoryUsage.length - 1] 
        : 0,
    }
  },
}

// Development helpers
export const devTools = {
  // Log current state (development only)
  logState: (state: AppState) => {
    if (process.env.NODE_ENV === 'development') {
      console.group('🏪 App State')
      console.log('User:', state.user)
      console.log('Practice:', state.practice)
      console.log('Billing:', state.billing)
      console.log('UI:', state.ui)
      console.log('Settings:', state.settings)
      console.log('Cache:', {
        apiCacheSize: state.cache.apiCache.size,
        componentCacheSize: state.cache.componentCache.size,
        performance: state.cache.performance,
      })
      console.groupEnd()
    }
  },

  // Export state as JSON (development only)
  exportState: (state: AppState) => {
    if (process.env.NODE_ENV === 'development') {
      const exportableState = {
        ...state,
        cache: {
          ...state.cache,
          apiCache: Object.fromEntries(state.cache.apiCache),
          componentCache: Object.fromEntries(state.cache.componentCache),
        },
      }
      return JSON.stringify(exportableState, null, 2)
    }
    return null
  },

  // Import state from JSON (development only)
  importState: (jsonState: string): Partial<AppState> | null => {
    if (process.env.NODE_ENV === 'development') {
      try {
        const parsed = JSON.parse(jsonState)
        return {
          ...parsed,
          cache: {
            ...parsed.cache,
            apiCache: new Map(Object.entries(parsed.cache.apiCache || {})),
            componentCache: new Map(Object.entries(parsed.cache.componentCache || {})),
          },
        }
      } catch (error) {
        console.error('Failed to import state:', error)
        return null
      }
    }
    return null
  },
}

// Type guards
export const typeGuards = {
  isUser: (obj: any): obj is any => {
    return obj && typeof obj.id === 'string' && typeof obj.email === 'string'
  },

  isPractice: (obj: any): obj is any => {
    return obj && typeof obj.id === 'string' && typeof obj.name === 'string'
  },

  isError: (obj: any): obj is Error => {
    return obj instanceof Error
  },
}

// Constants
export const CACHE_KEYS = {
  USER_PROFILE: 'user-profile',
  PRACTICE_INFO: 'practice-info',
  BILLING_USAGE: 'billing-usage',
  STAFF_LIST: 'staff-list',
  INVOICES: 'invoices',
  PAYMENT_METHODS: 'payment-methods',
} as const

export const PERMISSIONS = {
  ADMIN: 'admin',
  BILLING_READ: 'billing:read',
  BILLING_WRITE: 'billing:write',
  STAFF_READ: 'staff:read',
  STAFF_WRITE: 'staff:write',
  SETTINGS_READ: 'settings:read',
  SETTINGS_WRITE: 'settings:write',
} as const
