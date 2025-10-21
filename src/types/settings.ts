// Settings and configuration related types
// Centralized settings-related types from components

import { BaseComponentProps } from './common'

// Settings navigation and container types
export type SettingsTab =
  | "personal"
  | "security"
  | "billing"
  | "plans"
  | "practice"
  | "notifications"
  | "integrations"
  | "referrals"
  | "support"

export interface SettingsContainerProps extends BaseComponentProps {
  defaultTab?: SettingsTab
}

export interface SettingsNavigationProps extends BaseComponentProps {
  activeTab: SettingsTab
  onTabChange: (tab: SettingsTab) => void
}

// Individual settings component props
export interface PersonalSettingsProps extends BaseComponentProps {}
export interface SecuritySettingsProps extends BaseComponentProps {}
export interface BillingSettingsProps extends BaseComponentProps {}
export interface PracticeSettingsProps extends BaseComponentProps {}
export interface NotificationSettingsProps extends BaseComponentProps {}
export interface IntegrationSettingsProps extends BaseComponentProps {}
export interface ReferralSettingsProps extends BaseComponentProps {}
export interface SupportSettingsProps extends BaseComponentProps {}

// Settings data types
export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  timezone: string
  avatar?: string
}

export interface SecuritySettingsData {
  twoFactorEnabled: boolean
  passwordLastChanged: Date
  activeSessions: LoginSession[]
  trustedDevices: TrustedDevice[]
}

export interface LoginSession {
  id: string
  device: string
  browser: string
  location: string
  ipAddress: string
  lastActive: Date
  isCurrent: boolean
}

export interface TrustedDevice {
  id: string
  name: string
  type: 'desktop' | 'mobile' | 'tablet'
  addedAt: Date
  lastUsed: Date
}

export interface NotificationPreferences {
  email: {
    appointments: boolean
    billing: boolean
    marketing: boolean
    security: boolean
  }
  sms: {
    appointments: boolean
    billing: boolean
    security: boolean
  }
  push: {
    appointments: boolean
    billing: boolean
    marketing: boolean
  }
}

export interface IntegrationConfig {
  id: string
  name: string
  type: IntegrationType
  status: IntegrationStatus
  config: Record<string, unknown>
  lastSync?: Date
  createdAt: Date
}

export type IntegrationType = 'calendar' | 'email' | 'crm' | 'payment' | 'analytics'
export type IntegrationStatus = 'connected' | 'disconnected' | 'error' | 'syncing'

export interface ReferralProgram {
  referralCode: string
  totalReferrals: number
  successfulReferrals: number
  totalEarnings: number
  pendingEarnings: number
  referralHistory: ReferralRecord[]
}

export interface ReferralRecord {
  id: string
  referredEmail: string
  referredName?: string
  status: ReferralStatus
  earnings: number
  referredAt: Date
  convertedAt?: Date
}

export type ReferralStatus = 'pending' | 'converted' | 'expired' | 'cancelled'
