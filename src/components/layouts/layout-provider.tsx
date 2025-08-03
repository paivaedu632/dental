"use client"

import { usePathname } from "next/navigation"
import { DashboardLayout } from "./dashboard-layout"
import { STANDALONE_ROUTES, AUTH_ROUTES } from "@/constants"

interface LayoutProviderProps {
  children: React.ReactNode
}

// Routes are now imported from constants

export function LayoutProvider({ children }: LayoutProviderProps) {
  const pathname = usePathname()

  // Check if current route is a standalone auth route (exact match)
  const isStandaloneRoute = STANDALONE_ROUTES.includes(pathname)

  // Check if current route is an auth route (exact match or starts with for dynamic routes)
  const isAuthRoute = AUTH_ROUTES.includes(pathname) ||
    AUTH_ROUTES.some(route => {
      // Handle dynamic routes like /reset-password/[token]
      if (route.includes('[') || route.endsWith('*')) {
        return pathname.startsWith(route.replace('*', ''))
      }
      return false
    })

  // Debug logging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('LayoutProvider Debug:', {
      pathname,
      isStandaloneRoute,
      isAuthRoute,
      layoutType: isStandaloneRoute ? 'standalone' : isAuthRoute ? 'auth' : 'dashboard'
    })
  }

  // For standalone routes, render children directly without any layout wrapper
  if (isStandaloneRoute) {
    return <>{children}</>
  }

  // For auth routes, render without dashboard layout but with minimal wrapper
  if (isAuthRoute) {
    return <>{children}</>
  }

  // For all other routes (dashboard routes), use the dashboard layout
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}
