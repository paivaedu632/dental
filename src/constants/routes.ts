// Route constants for DentalFlow application
export const ROUTES = {
  // Public/Marketing pages (standalone, no dashboard layout)
  PUBLIC: {
    HOME: '/',
    PRICING: '/pricing',        // Public pricing page
    ABOUT: '/about',
    CONTACT: '/contact',        // Public contact page
    SUCCESS: '/success',        // Payment success page
    // Landing Page
    LANDING_MINEA: '/landing-minea-style', // Minea-inspired design
    // Case Studies & Content
    VSL_CASE_STUDY: '/vsl-case-study',   // $100M VSL case study article
  },
  // Authentication pages (standalone)
  AUTH: {
    SIGNUP: '/signup',
    SIGNIN: '/signin',
    ONBOARDING: '/onboarding',
    ONBOARDING_TOKEN: '/onboarding/*',
    RESCHEDULE_TOKEN: '/reschedule/*',
  },
  // Dashboard pages (with sidebar layout)
  DASHBOARD: {
    // Core practice management
    APPOINTMENTS: '/appointments',
    SETTINGS: '/settings',
    USAGE: '/usage',
    SUPPORT: '/support',        // Internal support dashboard

    // E-commerce tools
    PRODUCTS: '/products',
    SHOPS: '/shops',
    SUCCESS_RADAR: '/success-radar',
  },
  // Legal pages (standalone)
  LEGAL: {
    TERMS: '/terms',
    PRIVACY: '/privacy',
  }
} as const

// Route arrays for layout provider
export const PUBLIC_ROUTES = Object.values(ROUTES.PUBLIC)
export const AUTH_ROUTES = Object.values(ROUTES.AUTH)
export const DASHBOARD_ROUTES = Object.values(ROUTES.DASHBOARD)
export const LEGAL_ROUTES = Object.values(ROUTES.LEGAL)

// Standalone routes that don't use dashboard layout (public + auth + legal)
export const STANDALONE_ROUTES = [
  ...PUBLIC_ROUTES,
  ...AUTH_ROUTES,
  ...LEGAL_ROUTES
]

// All valid routes
export const ALL_ROUTES = [
  ...PUBLIC_ROUTES,
  ...AUTH_ROUTES,
  ...DASHBOARD_ROUTES,
  ...LEGAL_ROUTES
]

// Route type definitions
export type PublicRoute = typeof ROUTES.PUBLIC[keyof typeof ROUTES.PUBLIC]
export type AuthRoute = typeof ROUTES.AUTH[keyof typeof ROUTES.AUTH]
export type DashboardRoute = typeof ROUTES.DASHBOARD[keyof typeof ROUTES.DASHBOARD]
export type LegalRoute = typeof ROUTES.LEGAL[keyof typeof ROUTES.LEGAL]
export type AppRoute = PublicRoute | AuthRoute | DashboardRoute | LegalRoute
