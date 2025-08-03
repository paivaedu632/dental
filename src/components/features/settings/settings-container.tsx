"use client"

import { useState } from "react"
import { SettingsNavigation } from "./settings-navigation"
import { PersonalSettings } from "./personal-settings"
import { SecuritySettings } from "./security-settings"
import { BillingSettings } from "./billing-settings"
import { PracticeSettings } from "./practice-settings"
import { NotificationSettings } from "./notification-settings"
import { IntegrationSettings } from "./integration-settings"
import { ReferralSettings } from "./referral-settings"
import { SupportSettings } from "./support-settings"

import type { SettingsTab, SettingsContainerProps } from '@/types/settings'

export function SettingsContainer({ className, defaultTab = "personal" }: SettingsContainerProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>(defaultTab)

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalSettings />
      case "security":
        return <SecuritySettings />
      case "billing":
      case "plans":
        return <BillingSettings />
      case "practice":
        return <PracticeSettings />
      case "notifications":
        return <NotificationSettings />
      case "integrations":
        return <IntegrationSettings />
      case "referrals":
        return <ReferralSettings />
      case "support":
        return <SupportSettings />
      default:
        return <PersonalSettings />
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences for your DentalFlow dashboard.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <SettingsNavigation 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
