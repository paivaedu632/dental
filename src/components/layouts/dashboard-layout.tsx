"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shared"
import { FloatingHelpWidget } from "@/components/features/support"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col min-h-screen">
        <div className="flex-1 p-4">
          {children}
        </div>
      </main>
      <FloatingHelpWidget />
    </SidebarProvider>
  )
}
