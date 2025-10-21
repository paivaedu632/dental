// Support and help related types
// Centralized support-related types from components

import { BaseComponentProps, Priority, Status, UUID } from './common'

// Support contact form types
export interface SupportContactFormProps extends BaseComponentProps {
  onSubmit?: (data: ContactFormData) => void
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  category: SupportCategory
  message: string
  priority: Priority
}

export type SupportCategory =
  | 'general'
  | 'billing'
  | 'technical'
  | 'appointments'
  | 'account'
  | 'feature'

// Floating help widget types
export interface FloatingHelpWidgetProps extends BaseComponentProps {}

// Support ticket types
export interface SupportTicket {
  id: UUID
  ticketNumber: string
  subject: string
  description: string
  category: SupportCategory
  priority: Priority
  status: TicketStatus
  assignedTo?: SupportAgent
  createdBy: {
    id: UUID
    name: string
    email: string
  }
  messages: TicketMessage[]
  attachments: TicketAttachment[]
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
}

export type TicketStatus =
  | 'open'
  | 'in_progress'
  | 'waiting_for_customer'
  | 'resolved'
  | 'closed'

export interface SupportAgent {
  id: UUID
  name: string
  email: string
  avatar?: string
  department: string
  isOnline: boolean
}

export interface TicketMessage {
  id: UUID
  ticketId: UUID
  content: string
  isFromCustomer: boolean
  author: {
    id: UUID
    name: string
    email: string
    avatar?: string
  }
  attachments: TicketAttachment[]
  createdAt: Date
}

export interface TicketAttachment {
  id: UUID
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  uploadedAt: Date
}

// Help article types
export interface HelpArticle {
  id: UUID
  title: string
  content: string
  category: HelpCategory
  tags: string[]
  isPublished: boolean
  views: number
  helpful: number
  notHelpful: number
  author: {
    id: UUID
    name: string
  }
  createdAt: Date
  updatedAt: Date
}

export type HelpCategory =
  | 'getting_started'
  | 'billing'
  | 'features'
  | 'troubleshooting'
  | 'integrations'
  | 'api'

// FAQ types
export interface FAQ {
  id: UUID
  question: string
  answer: string
  category: HelpCategory
  order: number
  isPublished: boolean
  views: number
  helpful: number
  notHelpful: number
}

// Live chat types
export interface ChatSession {
  id: UUID
  customerId: UUID
  agentId?: UUID
  status: ChatStatus
  messages: ChatMessage[]
  startedAt: Date
  endedAt?: Date
}

export type ChatStatus = 'waiting' | 'active' | 'ended'

export interface ChatMessage {
  id: UUID
  sessionId: UUID
  content: string
  isFromCustomer: boolean
  author: {
    id: UUID
    name: string
    avatar?: string
  }
  timestamp: Date
}

// Support metrics and analytics
export interface SupportMetrics {
  totalTickets: number
  openTickets: number
  resolvedTickets: number
  averageResponseTime: number // in hours
  averageResolutionTime: number // in hours
  customerSatisfactionScore: number
  firstContactResolutionRate: number
  ticketsByCategory: Record<SupportCategory, number>
  ticketsByPriority: Record<Priority, number>
}
