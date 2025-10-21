import { ROUTES } from './routes'
import {
  Calendar,
  ShoppingBag,
  Store,
  Target,
  Settings,
  CreditCard,
  HelpCircle
} from 'lucide-react'

// Navigation items for the dashboard sidebar
export const NAVIGATION_ITEMS = [
  {
    title: "Appointments",
    url: ROUTES.DASHBOARD.APPOINTMENTS,
    icon: Calendar,
    description: "Manage patient appointments and scheduling"
  },
  {
    title: "Products",
    url: ROUTES.DASHBOARD.PRODUCTS,
    icon: ShoppingBag,
    description: "Product catalog and management"
  },
  {
    title: "Shops",
    url: ROUTES.DASHBOARD.SHOPS,
    icon: Store,
    description: "Shop management and analytics"
  },
  {
    title: "Success Radar",
    url: ROUTES.DASHBOARD.SUCCESS_RADAR,
    icon: Target,
    description: "Success metrics and performance tracking"
  },
  {
    title: "Usage & Billing",
    url: ROUTES.DASHBOARD.USAGE,
    icon: CreditCard,
    description: "Usage statistics and billing information"
  },
  {
    title: "Settings",
    url: ROUTES.DASHBOARD.SETTINGS,
    icon: Settings,
    description: "Account and application settings"
  },
  {
    title: "Support",
    url: ROUTES.DASHBOARD.SUPPORT,
    icon: HelpCircle,
    description: "Help center and support resources"
  }
] as const

// Navigation groups for better organization
export const NAVIGATION_GROUPS = {
  MAIN: [
    NAVIGATION_ITEMS[0], // Appointments
  ],
  MARKETING: [
    NAVIGATION_ITEMS[1], // Products
    NAVIGATION_ITEMS[2], // Shops
    NAVIGATION_ITEMS[3], // Success Radar
  ],
  ACCOUNT: [
    NAVIGATION_ITEMS[4], // Usage & Billing
    NAVIGATION_ITEMS[5], // Settings
    NAVIGATION_ITEMS[6], // Support
  ]
} as const

// Breadcrumb configuration
export const BREADCRUMB_LABELS = {
  [ROUTES.DASHBOARD.APPOINTMENTS]: "Appointments",
  [ROUTES.DASHBOARD.PRODUCTS]: "Products",
  [ROUTES.DASHBOARD.SETTINGS]: "Settings",
  [ROUTES.DASHBOARD.SHOPS]: "Shops",
  [ROUTES.DASHBOARD.SUCCESS_RADAR]: "Success Radar",
  [ROUTES.DASHBOARD.SUPPORT]: "Support",
  [ROUTES.DASHBOARD.USAGE]: "Usage & Billing",
} as const
