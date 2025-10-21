// Settings feature components exports
export { SettingsContainer } from './settings-container'
export { SettingsNavigation } from './settings-navigation'
export { PersonalSettings } from './personal-settings'
export { SecuritySettings } from './security-settings'
export { BillingSettings } from './billing-settings'
export { PracticeSettings } from './practice-settings'
export { NotificationSettings } from './notification-settings'
export { IntegrationSettings } from './integration-settings'
export { ReferralSettings } from './referral-settings'
export { SupportSettings } from './support-settings'

// Re-export settings types for convenience
export type {
  SettingsTab,
  SettingsContainerProps,
  SettingsNavigationProps,
  PersonalSettingsProps,
  SecuritySettingsProps,
  BillingSettingsProps,
  PracticeSettingsProps,
  NotificationSettingsProps,
  IntegrationSettingsProps,
  ReferralSettingsProps,
  SupportSettingsProps,
  PersonalInfo,
  SecuritySettingsData,
  NotificationPreferences,
  IntegrationConfig,
  ReferralProgram
} from '@/types/settings'
