import { ROUTES } from './routes'
import { 
  BarChart3, 
  Calendar, 
  Users, 
  MessageSquare, 
  ShoppingBag, 
  Store, 
  Target, 
  Settings, 
  CreditCard, 
  HelpCircle,
  Phone,
  Globe
} from 'lucide-react'

// Navigation items for the dashboard sidebar
export const NAVIGATION_ITEMS = [
  {
    title: "Browse ads",
    url: ROUTES.DASHBOARD.ADS,
    icon: BarChart3,
    description: "Discover winning products by browsing ads"
  },
  {
    title: "Appointments",
    url: ROUTES.DASHBOARD.APPOINTMENTS,
    icon: Calendar,
    description: "Manage patient appointments and scheduling"
  },
  {
    title: "Competitors",
    url: ROUTES.DASHBOARD.COMPETITORS,
    icon: Users,
    description: "Analyze competitor performance and strategies"
  },
  {
    title: "Contact",
    url: ROUTES.DASHBOARD.CONTACT,
    icon: MessageSquare,
    description: "Contact form and communication"
  },
  {
    title: "Landing Page",
    url: ROUTES.DASHBOARD.LANDING_PAGE,
    icon: Globe,
    description: "Landing page analytics and management"
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
    title: "Voice Agent",
    url: ROUTES.DASHBOARD.VOICE_AGENT,
    icon: Phone,
    description: "Voice agent and call management"
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
    NAVIGATION_ITEMS[0], // Browse ads
    NAVIGATION_ITEMS[1], // Appointments
    NAVIGATION_ITEMS[2], // Competitors
  ],
  MARKETING: [
    NAVIGATION_ITEMS[4], // Landing Page
    NAVIGATION_ITEMS[5], // Products
    NAVIGATION_ITEMS[6], // Shops
    NAVIGATION_ITEMS[7], // Success Radar
  ],
  COMMUNICATION: [
    NAVIGATION_ITEMS[3], // Contact
    NAVIGATION_ITEMS[8], // Voice Agent
  ],
  ACCOUNT: [
    NAVIGATION_ITEMS[9], // Usage & Billing
    NAVIGATION_ITEMS[10], // Settings
    NAVIGATION_ITEMS[11], // Support
  ]
} as const

// Breadcrumb configuration
export const BREADCRUMB_LABELS = {
  [ROUTES.DASHBOARD.ADS]: "Browse ads",
  [ROUTES.DASHBOARD.APPOINTMENTS]: "Appointments",
  [ROUTES.DASHBOARD.COMPETITORS]: "Competitors",
  [ROUTES.DASHBOARD.CONTACT]: "Contact",
  [ROUTES.DASHBOARD.LANDING_PAGE]: "Landing Page",
  [ROUTES.DASHBOARD.PRICING]: "Pricing",
  [ROUTES.DASHBOARD.PRODUCTS]: "Products",
  [ROUTES.DASHBOARD.SETTINGS]: "Settings",
  [ROUTES.DASHBOARD.SHOPS]: "Shops",
  [ROUTES.DASHBOARD.SUCCESS_RADAR]: "Success Radar",
  [ROUTES.DASHBOARD.SUPPORT]: "Support",
  [ROUTES.DASHBOARD.USAGE]: "Usage & Billing",
  [ROUTES.DASHBOARD.VOICE_AGENT]: "Voice Agent",
} as const
