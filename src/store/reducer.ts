// Global state reducer
// Handles all state updates for the application

import type { AppState, AppAction } from './types'

// Initial state
export const initialState: AppState = {
  user: {
    currentUser: null,
    isAuthenticated: false,
    isLoading: false,
    permissions: [],
    preferences: {
      theme: 'system',
      language: 'en',
      timezone: 'UTC',
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      dashboard: {
        defaultView: 'overview',
        compactMode: false,
      },
    },
    lastActivity: null,
  },
  practice: {
    currentPractice: null,
    isLoading: false,
    settings: {
      businessHours: [],
      appointmentSettings: {
        defaultDuration: 30,
        bufferTime: 15,
        maxAdvanceBooking: 90,
        allowOnlineBooking: true,
      },
      billing: {
        currency: 'USD',
        taxRate: 0,
        paymentMethods: ['card'],
      },
    },
    staff: [],
    locations: [],
  },
  billing: {
    currentPeriod: null,
    usage: {
      currentMonth: {
        appointmentCount: 0,
        setupFee: 0,
        baseFee: 0,
        usageFee: 0,
        totalFee: 0,
      },
      previousMonth: {
        appointmentCount: 0,
        totalFee: 0,
      },
      yearToDate: {
        totalAppointments: 0,
        totalFees: 0,
        averageMonthlyFee: 0,
      },
    },
    pricing: null,
    paymentMethods: [],
    invoices: [],
    isLoading: false,
  },
  ui: {
    sidebarCollapsed: false,
    currentPage: '',
    breadcrumbs: [],
    modals: [],
    globalLoading: false,
    errors: [],
    notifications: [],
    theme: 'system',
    layout: 'default',
  },
  settings: {
    activeTab: 'personal',
    isDirty: false,
    savedSettings: {},
    pendingChanges: {},
  },
  cache: {
    apiCache: new Map(),
    componentCache: new Map(),
    performance: {
      pageLoadTimes: {},
      renderTimes: {},
      apiResponseTimes: {},
      memoryUsage: [],
    },
  },
}

// Main reducer function
export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    // User actions
    case 'USER_LOGIN':
      return {
        ...state,
        user: {
          ...state.user,
          currentUser: action.payload,
          isAuthenticated: true,
          isLoading: false,
          lastActivity: new Date(),
        },
      }

    case 'USER_LOGOUT':
      return {
        ...state,
        user: {
          ...initialState.user,
          preferences: state.user.preferences, // Keep preferences
        },
        // Clear sensitive data
        practice: initialState.practice,
        billing: initialState.billing,
      }

    case 'USER_UPDATE':
      return {
        ...state,
        user: {
          ...state.user,
          currentUser: state.user.currentUser
            ? { ...state.user.currentUser, ...action.payload }
            : null,
        },
      }

    case 'USER_SET_LOADING':
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: action.payload,
        },
      }

    case 'USER_SET_PREFERENCES':
      return {
        ...state,
        user: {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            ...action.payload,
          },
        },
      }

    // Practice actions
    case 'PRACTICE_SET':
      return {
        ...state,
        practice: {
          ...state.practice,
          currentPractice: action.payload,
          isLoading: false,
        },
      }

    case 'PRACTICE_UPDATE':
      return {
        ...state,
        practice: {
          ...state.practice,
          currentPractice: state.practice.currentPractice
            ? { ...state.practice.currentPractice, ...action.payload }
            : null,
        },
      }

    case 'PRACTICE_SET_LOADING':
      return {
        ...state,
        practice: {
          ...state.practice,
          isLoading: action.payload,
        },
      }

    case 'PRACTICE_ADD_STAFF':
      return {
        ...state,
        practice: {
          ...state.practice,
          staff: [...state.practice.staff, action.payload],
        },
      }

    case 'PRACTICE_UPDATE_STAFF':
      return {
        ...state,
        practice: {
          ...state.practice,
          staff: state.practice.staff.map(member =>
            member.id === action.payload.id
              ? { ...member, ...action.payload.updates }
              : member
          ),
        },
      }

    // Billing actions
    case 'BILLING_SET_PERIOD':
      return {
        ...state,
        billing: {
          ...state.billing,
          currentPeriod: action.payload,
          isLoading: false,
        },
      }

    case 'BILLING_UPDATE_USAGE':
      return {
        ...state,
        billing: {
          ...state.billing,
          usage: {
            ...state.billing.usage,
            ...action.payload,
          },
        },
      }

    case 'BILLING_SET_LOADING':
      return {
        ...state,
        billing: {
          ...state.billing,
          isLoading: action.payload,
        },
      }

    case 'BILLING_ADD_PAYMENT_METHOD':
      return {
        ...state,
        billing: {
          ...state.billing,
          paymentMethods: [...state.billing.paymentMethods, action.payload],
        },
      }

    case 'BILLING_ADD_INVOICE':
      return {
        ...state,
        billing: {
          ...state.billing,
          invoices: [...state.billing.invoices, action.payload],
        },
      }

    // UI actions
    case 'UI_TOGGLE_SIDEBAR':
      return {
        ...state,
        ui: {
          ...state.ui,
          sidebarCollapsed: !state.ui.sidebarCollapsed,
        },
      }

    case 'UI_SET_SIDEBAR':
      return {
        ...state,
        ui: {
          ...state.ui,
          sidebarCollapsed: action.payload,
        },
      }

    case 'UI_SET_PAGE':
      return {
        ...state,
        ui: {
          ...state.ui,
          currentPage: action.payload,
        },
      }

    case 'UI_SET_BREADCRUMBS':
      return {
        ...state,
        ui: {
          ...state.ui,
          breadcrumbs: action.payload,
        },
      }

    case 'UI_OPEN_MODAL':
      return {
        ...state,
        ui: {
          ...state.ui,
          modals: [
            ...state.ui.modals.filter(modal => modal.id !== action.payload.id),
            {
              id: action.payload.id,
              type: action.payload.type,
              isOpen: true,
              data: action.payload.data,
            },
          ],
        },
      }

    case 'UI_CLOSE_MODAL':
      return {
        ...state,
        ui: {
          ...state.ui,
          modals: state.ui.modals.filter(modal => modal.id !== action.payload),
        },
      }

    case 'UI_ADD_ERROR':
      return {
        ...state,
        ui: {
          ...state.ui,
          errors: [
            ...state.ui.errors,
            {
              id: Date.now().toString(),
              timestamp: new Date(),
              dismissed: false,
              ...action.payload,
            },
          ],
        },
      }

    case 'UI_DISMISS_ERROR':
      return {
        ...state,
        ui: {
          ...state.ui,
          errors: state.ui.errors.map(error =>
            error.id === action.payload
              ? { ...error, dismissed: true }
              : error
          ),
        },
      }

    case 'UI_ADD_NOTIFICATION':
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: [
            ...state.ui.notifications,
            {
              id: Date.now().toString(),
              timestamp: new Date(),
              read: false,
              ...action.payload,
            },
          ],
        },
      }

    case 'UI_MARK_NOTIFICATION_READ':
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.map(notification =>
            notification.id === action.payload
              ? { ...notification, read: true }
              : notification
          ),
        },
      }

    case 'UI_SET_THEME':
      return {
        ...state,
        ui: {
          ...state.ui,
          theme: action.payload,
        },
        user: {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            theme: action.payload,
          },
        },
      }

    case 'UI_SET_LOADING':
      return {
        ...state,
        ui: {
          ...state.ui,
          globalLoading: action.payload,
        },
      }

    // Settings actions
    case 'SETTINGS_SET_TAB':
      return {
        ...state,
        settings: {
          ...state.settings,
          activeTab: action.payload,
        },
      }

    case 'SETTINGS_SET_DIRTY':
      return {
        ...state,
        settings: {
          ...state.settings,
          isDirty: action.payload,
        },
      }

    case 'SETTINGS_UPDATE_PENDING':
      return {
        ...state,
        settings: {
          ...state.settings,
          pendingChanges: {
            ...state.settings.pendingChanges,
            ...action.payload,
          },
          isDirty: true,
        },
      }

    case 'SETTINGS_SAVE':
      return {
        ...state,
        settings: {
          ...state.settings,
          savedSettings: {
            ...state.settings.savedSettings,
            ...action.payload,
          },
          pendingChanges: {},
          isDirty: false,
        },
      }

    case 'SETTINGS_RESET':
      return {
        ...state,
        settings: {
          ...state.settings,
          pendingChanges: {},
          isDirty: false,
        },
      }

    // Cache actions
    case 'CACHE_SET':
      const newApiCache = new Map(state.cache.apiCache)
      newApiCache.set(action.payload.key, {
        data: action.payload.data,
        timestamp: new Date(),
        ttl: action.payload.ttl || 300000, // 5 minutes default
        key: action.payload.key,
      })
      return {
        ...state,
        cache: {
          ...state.cache,
          apiCache: newApiCache,
        },
      }

    case 'CACHE_INVALIDATE':
      const invalidatedCache = new Map(state.cache.apiCache)
      invalidatedCache.delete(action.payload)
      return {
        ...state,
        cache: {
          ...state.cache,
          apiCache: invalidatedCache,
        },
      }

    case 'CACHE_CLEAR':
      return {
        ...state,
        cache: {
          ...state.cache,
          apiCache: new Map(),
          componentCache: new Map(),
        },
      }

    case 'CACHE_UPDATE_PERFORMANCE':
      return {
        ...state,
        cache: {
          ...state.cache,
          performance: {
            ...state.cache.performance,
            ...action.payload,
          },
        },
      }

    default:
      return state
  }
}
