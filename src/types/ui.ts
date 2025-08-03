// UI component related types
// This file consolidates component prop interfaces and UI-specific types

import { BaseComponentProps } from './common'

// Common component prop patterns
export interface ComponentWithChildren extends BaseComponentProps {
  children: React.ReactNode
}

export interface ComponentWithOptionalChildren extends BaseComponentProps {
  children?: React.ReactNode
}

// Form component types
export interface FormComponentProps extends BaseComponentProps {
  name?: string
  disabled?: boolean
  required?: boolean
  error?: string
}

// Button-like component props
export interface ButtonLikeProps extends BaseComponentProps {
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

// Input-like component props
export interface InputLikeProps<T = string> extends FormComponentProps {
  value?: T
  defaultValue?: T
  placeholder?: string
  onChange?: (value: T) => void
  onBlur?: () => void
  onFocus?: () => void
}

// Modal/Dialog component props
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
}

// Card component props
export interface CardProps extends ComponentWithOptionalChildren {
  title?: string
  description?: string
  footer?: React.ReactNode
}

// Navigation component props
export interface NavigationProps extends BaseComponentProps {
  items: NavigationItem[]
  activeItem?: string
  onItemClick?: (item: NavigationItem) => void
}

export interface NavigationItem {
  id: string
  label: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  disabled?: boolean
  badge?: string | number
}
