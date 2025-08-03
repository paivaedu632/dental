// Route constants for DentalFlow dashboard
export const ROUTES = {
  AUTH: {
    SIGNUP: '/signup',
    SIGNIN: '/signin',
    ONBOARDING: '/onboarding',
  },
  DASHBOARD: {
    ADS: '/ads',
    APPOINTMENTS: '/appointments',
    COMPETITORS: '/competitors',
    CONTACT: '/contact',
    LANDING_PAGE: '/landing-page',
    PRICING: '/pricing',
    PRODUCTS: '/products',
    SETTINGS: '/settings',
    SHOPS: '/shops',
    SUCCESS_RADAR: '/success-radar',
    SUPPORT: '/support',
    USAGE: '/usage',
    VOICE_AGENT: '/voice-agent',
  },
  LEGAL: {
    TERMS: '/terms',
    PRIVACY: '/privacy',
  }
} as const

// Route arrays for layout provider
export const AUTH_ROUTES = Object.values(ROUTES.AUTH)
export const DASHBOARD_ROUTES = Object.values(ROUTES.DASHBOARD)
export const LEGAL_ROUTES = Object.values(ROUTES.LEGAL)

// Standalone routes that don't use dashboard layout
export const STANDALONE_ROUTES = [
  '/',
  ...AUTH_ROUTES,
  ...LEGAL_ROUTES
]

// All valid routes
export const ALL_ROUTES = [
  '/',
  ...AUTH_ROUTES,
  ...DASHBOARD_ROUTES,
  ...LEGAL_ROUTES
]

// Route type definitions
export type AuthRoute = typeof ROUTES.AUTH[keyof typeof ROUTES.AUTH]
export type DashboardRoute = typeof ROUTES.DASHBOARD[keyof typeof ROUTES.DASHBOARD]
export type LegalRoute = typeof ROUTES.LEGAL[keyof typeof ROUTES.LEGAL]
export type AppRoute = AuthRoute | DashboardRoute | LegalRoute | '/'
