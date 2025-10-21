"use client"

// Global state context provider
// Provides application state and dispatch functions to all components

import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react'
import type { AppState, AppAction, AppContextProviderProps, StateSelectors } from './types'
import { appReducer, initialState } from './reducer'

// Context definition
interface AppContextValue {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  selectors: StateSelectors
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

// State selectors
const createSelectors = (state: AppState): StateSelectors => ({
  // User selectors
  isAuthenticated: () => state.user.isAuthenticated,
  getCurrentUser: () => state.user.currentUser,
  getUserPermissions: () => state.user.permissions,

  // Practice selectors
  getCurrentPractice: () => state.practice.currentPractice,
  getPracticeStaff: () => state.practice.staff,

  // Billing selectors
  getCurrentUsage: () => state.billing.usage,
  getUnpaidInvoices: () => state.billing.invoices.filter(invoice => invoice.status !== 'paid'),

  // UI selectors
  isSidebarCollapsed: () => state.ui.sidebarCollapsed,
  getActiveModals: () => state.ui.modals.filter(modal => modal.isOpen),
  getUnreadNotifications: () => state.ui.notifications.filter(notification => !notification.read),
})

// Context provider component
export function AppContextProvider({ children, initialState: customInitialState }: AppContextProviderProps) {
  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    ...customInitialState,
  })

  // Memoized selectors to prevent unnecessary re-renders
  const selectors = useMemo(() => createSelectors(state), [state])

  // Persist user preferences to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && state.user.preferences) {
      localStorage.setItem('user-preferences', JSON.stringify(state.user.preferences))
    }
  }, [state.user.preferences])

  // Load user preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPreferences = localStorage.getItem('user-preferences')
      if (savedPreferences) {
        try {
          const preferences = JSON.parse(savedPreferences)
          dispatch({ type: 'USER_SET_PREFERENCES', payload: preferences })
        } catch (error) {
          console.warn('Failed to load user preferences:', error)
        }
      }
    }
  }, [])

  // Auto-cleanup expired cache entries
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now()
      const expiredKeys: string[] = []

      state.cache.apiCache.forEach((entry, key) => {
        if (now - entry.timestamp.getTime() > entry.ttl) {
          expiredKeys.push(key)
        }
      })

      expiredKeys.forEach(key => {
        dispatch({ type: 'CACHE_INVALIDATE', payload: key })
      })
    }, 60000) // Check every minute

    return () => clearInterval(cleanupInterval)
  }, [state.cache.apiCache])

  // Auto-dismiss old errors
  useEffect(() => {
    const dismissInterval = setInterval(() => {
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
      
      state.ui.errors.forEach(error => {
        if (!error.dismissed && error.timestamp.getTime() < fiveMinutesAgo) {
          dispatch({ type: 'UI_DISMISS_ERROR', payload: error.id })
        }
      })
    }, 30000) // Check every 30 seconds

    return () => clearInterval(dismissInterval)
  }, [state.ui.errors])

  // Context value
  const contextValue = useMemo(() => ({
    state,
    dispatch,
    selectors,
  }), [state, selectors])

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

// Hook to use the app context
export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }
  return context
}

// Convenience hooks for specific state slices
export function useUser() {
  const { state, dispatch, selectors } = useAppContext()
  
  return {
    user: state.user,
    isAuthenticated: selectors.isAuthenticated(),
    currentUser: selectors.getCurrentUser(),
    permissions: selectors.getUserPermissions(),
    login: (user: any) => dispatch({ type: 'USER_LOGIN', payload: user }),
    logout: () => dispatch({ type: 'USER_LOGOUT' }),
    updateUser: (updates: any) => dispatch({ type: 'USER_UPDATE', payload: updates }),
    setLoading: (loading: boolean) => dispatch({ type: 'USER_SET_LOADING', payload: loading }),
    setPreferences: (preferences: any) => dispatch({ type: 'USER_SET_PREFERENCES', payload: preferences }),
  }
}

export function usePractice() {
  const { state, dispatch, selectors } = useAppContext()
  
  return {
    practice: state.practice,
    currentPractice: selectors.getCurrentPractice(),
    staff: selectors.getPracticeStaff(),
    setPractice: (practice: any) => dispatch({ type: 'PRACTICE_SET', payload: practice }),
    updatePractice: (updates: any) => dispatch({ type: 'PRACTICE_UPDATE', payload: updates }),
    setLoading: (loading: boolean) => dispatch({ type: 'PRACTICE_SET_LOADING', payload: loading }),
    addStaff: (staff: any) => dispatch({ type: 'PRACTICE_ADD_STAFF', payload: staff }),
    updateStaff: (id: string, updates: any) => dispatch({ type: 'PRACTICE_UPDATE_STAFF', payload: { id, updates } }),
  }
}

export function useBilling() {
  const { state, dispatch, selectors } = useAppContext()
  
  return {
    billing: state.billing,
    usage: selectors.getCurrentUsage(),
    unpaidInvoices: selectors.getUnpaidInvoices(),
    setPeriod: (period: any) => dispatch({ type: 'BILLING_SET_PERIOD', payload: period }),
    updateUsage: (usage: any) => dispatch({ type: 'BILLING_UPDATE_USAGE', payload: usage }),
    setLoading: (loading: boolean) => dispatch({ type: 'BILLING_SET_LOADING', payload: loading }),
    addPaymentMethod: (method: any) => dispatch({ type: 'BILLING_ADD_PAYMENT_METHOD', payload: method }),
    addInvoice: (invoice: any) => dispatch({ type: 'BILLING_ADD_INVOICE', payload: invoice }),
  }
}

export function useUI() {
  const { state, dispatch, selectors } = useAppContext()
  
  return {
    ui: state.ui,
    sidebarCollapsed: selectors.isSidebarCollapsed(),
    activeModals: selectors.getActiveModals(),
    unreadNotifications: selectors.getUnreadNotifications(),
    toggleSidebar: () => dispatch({ type: 'UI_TOGGLE_SIDEBAR' }),
    setSidebar: (collapsed: boolean) => dispatch({ type: 'UI_SET_SIDEBAR', payload: collapsed }),
    setPage: (page: string) => dispatch({ type: 'UI_SET_PAGE', payload: page }),
    setBreadcrumbs: (breadcrumbs: any[]) => dispatch({ type: 'UI_SET_BREADCRUMBS', payload: breadcrumbs }),
    openModal: (id: string, type: string, data?: any) => dispatch({ type: 'UI_OPEN_MODAL', payload: { id, type, data } }),
    closeModal: (id: string) => dispatch({ type: 'UI_CLOSE_MODAL', payload: id }),
    addError: (error: any) => dispatch({ type: 'UI_ADD_ERROR', payload: error }),
    dismissError: (id: string) => dispatch({ type: 'UI_DISMISS_ERROR', payload: id }),
    addNotification: (notification: any) => dispatch({ type: 'UI_ADD_NOTIFICATION', payload: notification }),
    markNotificationRead: (id: string) => dispatch({ type: 'UI_MARK_NOTIFICATION_READ', payload: id }),
    setTheme: (theme: 'light' | 'dark' | 'system') => dispatch({ type: 'UI_SET_THEME', payload: theme }),
    setLoading: (loading: boolean) => dispatch({ type: 'UI_SET_LOADING', payload: loading }),
  }
}

export function useSettings() {
  const { state, dispatch } = useAppContext()
  
  return {
    settings: state.settings,
    setTab: (tab: string) => dispatch({ type: 'SETTINGS_SET_TAB', payload: tab }),
    setDirty: (dirty: boolean) => dispatch({ type: 'SETTINGS_SET_DIRTY', payload: dirty }),
    updatePending: (changes: any) => dispatch({ type: 'SETTINGS_UPDATE_PENDING', payload: changes }),
    save: (settings: any) => dispatch({ type: 'SETTINGS_SAVE', payload: settings }),
    reset: () => dispatch({ type: 'SETTINGS_RESET' }),
  }
}

export function useCache() {
  const { state, dispatch } = useAppContext()
  
  return {
    cache: state.cache,
    set: (key: string, data: any, ttl?: number) => dispatch({ type: 'CACHE_SET', payload: { key, data, ttl } }),
    invalidate: (key: string) => dispatch({ type: 'CACHE_INVALIDATE', payload: key }),
    clear: () => dispatch({ type: 'CACHE_CLEAR' }),
    updatePerformance: (metrics: any) => dispatch({ type: 'CACHE_UPDATE_PERFORMANCE', payload: metrics }),
    get: (key: string) => {
      const entry = state.cache.apiCache.get(key)
      if (!entry) return null
      
      const now = Date.now()
      if (now - entry.timestamp.getTime() > entry.ttl) {
        dispatch({ type: 'CACHE_INVALIDATE', payload: key })
        return null
      }
      
      return entry.data
    },
  }
}

// Export context for advanced usage
export { AppContext }
