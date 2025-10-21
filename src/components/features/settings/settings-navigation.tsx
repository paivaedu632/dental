"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  User,
  Shield,
  CreditCard,
  Building2,
  Bell,
  Database,
  Gift,
  HelpCircle,
  DollarSign
} from "lucide-react"
import type { SettingsTab, SettingsNavigationProps } from '@/types/settings'

export function SettingsNavigation({ activeTab, onTabChange, className }: SettingsNavigationProps) {
  const settingsTabs = [
    {
      id: "personal" as const,
      label: "Personal Information",
      icon: User,
      description: "Manage your personal profile and contact details"
    },
    {
      id: "security" as const,
      label: "Security",
      icon: Shield,
      description: "Password, two-factor authentication, and login settings"
    },
    {
      id: "billing" as const,
      label: "Billing & Payments",
      icon: CreditCard,
      description: "Usage-based pricing, payment methods, and billing history"
    },
    {
      id: "plans" as const,
      label: "Plans & Pricing",
      icon: DollarSign,
      description: "View pricing details and ROI calculator"
    },
    {
      id: "practice" as const,
      label: "Practice Settings",
      icon: Building2,
      description: "Dental practice information and configuration"
    },
    {
      id: "notifications" as const,
      label: "Notifications",
      icon: Bell,
      description: "Email alerts, SMS notifications, and communication preferences"
    },
    {
      id: "integrations" as const,
      label: "Integrations",
      icon: Database,
      description: "Connect with third-party services and APIs"
    },
    {
      id: "referrals" as const,
      label: "Referral Program",
      icon: Gift,
      description: "Invite colleagues and earn rewards"
    },
    {
      id: "support" as const,
      label: "Help & Support",
      icon: HelpCircle,
      description: "Get help, contact support, and access documentation"
    }
  ]

  return (
    <Card className={className}>
      <CardContent className="p-0">
        <nav className="space-y-1">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-start gap-3 p-4 text-left transition-colors hover:bg-muted/50 ${
                  isActive 
                    ? "bg-primary/10 border-r-2 border-primary text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`} />
                <div className="min-w-0 flex-1">
                  <p className={`font-medium text-sm ${
                    isActive ? "text-primary" : "text-foreground"
                  }`}>
                    {tab.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {tab.description}
                  </p>
                </div>
              </button>
            )
          })}
        </nav>
      </CardContent>
    </Card>
  )
}
