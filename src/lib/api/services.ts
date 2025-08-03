// API services for different domains
// Provides typed API methods for various application features

import { apiClient } from './client'
import type { 
  ApiUser, 
  ApiPractice, 
  ApiAppointment, 
  ApiBillingPeriod,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  FileUploadRequest,
  FileUploadResponse,
  SearchRequest,
  PaginatedResponse
} from '@/types/api'
import type { User, Practice, BillingPeriod } from '@/types'

// Authentication service
export const authService = {
  // Login user
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
    return response.data
  },

  // Logout user
  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  },

  // Refresh access token
  async refreshToken(request: RefreshTokenRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/refresh', request)
    return response.data
  },

  // Get current user profile
  async getProfile(): Promise<ApiUser> {
    const response = await apiClient.get<ApiUser>('/auth/profile')
    return response.data
  },

  // Update user profile
  async updateProfile(updates: Partial<ApiUser>): Promise<ApiUser> {
    const response = await apiClient.patch<ApiUser>('/auth/profile', updates)
    return response.data
  },

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword,
    })
  },

  // Request password reset
  async requestPasswordReset(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email })
  },

  // Reset password with token
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/reset-password', { token, newPassword })
  },
}

// Practice management service
export const practiceService = {
  // Get current practice
  async getPractice(): Promise<ApiPractice> {
    const response = await apiClient.get<ApiPractice>('/practice')
    return response.data
  },

  // Update practice information
  async updatePractice(updates: Partial<ApiPractice>): Promise<ApiPractice> {
    const response = await apiClient.patch<ApiPractice>('/practice', updates)
    return response.data
  },

  // Get practice staff
  async getStaff(): Promise<ApiUser[]> {
    const response = await apiClient.get<ApiUser[]>('/practice/staff')
    return response.data
  },

  // Add staff member
  async addStaff(staffData: Partial<ApiUser>): Promise<ApiUser> {
    const response = await apiClient.post<ApiUser>('/practice/staff', staffData)
    return response.data
  },

  // Update staff member
  async updateStaff(staffId: string, updates: Partial<ApiUser>): Promise<ApiUser> {
    const response = await apiClient.patch<ApiUser>(`/practice/staff/${staffId}`, updates)
    return response.data
  },

  // Remove staff member
  async removeStaff(staffId: string): Promise<void> {
    await apiClient.delete(`/practice/staff/${staffId}`)
  },

  // Get practice settings
  async getSettings(): Promise<Record<string, unknown>> {
    const response = await apiClient.get<Record<string, unknown>>('/practice/settings')
    return response.data
  },

  // Update practice settings
  async updateSettings(settings: Record<string, unknown>): Promise<Record<string, unknown>> {
    const response = await apiClient.patch<Record<string, unknown>>('/practice/settings', settings)
    return response.data
  },
}

// Billing service
export const billingService = {
  // Get current billing period
  async getCurrentPeriod(): Promise<ApiBillingPeriod> {
    const response = await apiClient.get<ApiBillingPeriod>('/billing/current')
    return response.data
  },

  // Get billing history
  async getBillingHistory(params?: { 
    page?: number
    pageSize?: number
    year?: number
  }): Promise<PaginatedResponse<ApiBillingPeriod>> {
    const response = await apiClient.get<PaginatedResponse<ApiBillingPeriod>>('/billing/history', { params })
    return response.data
  },

  // Get usage statistics
  async getUsageStats(month?: number, year?: number): Promise<{
    appointmentCount: number
    setupFee: number
    baseFee: number
    usageFee: number
    totalFee: number
  }> {
    const response = await apiClient.get('/billing/usage', { 
      params: { month, year } 
    })
    return response.data
  },

  // Get payment methods
  async getPaymentMethods(): Promise<any[]> {
    const response = await apiClient.get<any[]>('/billing/payment-methods')
    return response.data
  },

  // Add payment method
  async addPaymentMethod(paymentMethod: any): Promise<any> {
    const response = await apiClient.post<any>('/billing/payment-methods', paymentMethod)
    return response.data
  },

  // Update payment method
  async updatePaymentMethod(methodId: string, updates: any): Promise<any> {
    const response = await apiClient.patch<any>(`/billing/payment-methods/${methodId}`, updates)
    return response.data
  },

  // Remove payment method
  async removePaymentMethod(methodId: string): Promise<void> {
    await apiClient.delete(`/billing/payment-methods/${methodId}`)
  },

  // Get invoices
  async getInvoices(params?: {
    page?: number
    pageSize?: number
    status?: string
  }): Promise<PaginatedResponse<any>> {
    const response = await apiClient.get<PaginatedResponse<any>>('/billing/invoices', { params })
    return response.data
  },

  // Download invoice
  async downloadInvoice(invoiceId: string): Promise<Blob> {
    const response = await apiClient.get(`/billing/invoices/${invoiceId}/download`, {
      headers: { Accept: 'application/pdf' }
    })
    return response.data as unknown as Blob
  },
}

// Appointment service
export const appointmentService = {
  // Get appointments
  async getAppointments(params?: {
    page?: number
    pageSize?: number
    startDate?: string
    endDate?: string
    status?: string
  }): Promise<PaginatedResponse<ApiAppointment>> {
    const response = await apiClient.get<PaginatedResponse<ApiAppointment>>('/appointments', { params })
    return response.data
  },

  // Get appointment by ID
  async getAppointment(appointmentId: string): Promise<ApiAppointment> {
    const response = await apiClient.get<ApiAppointment>(`/appointments/${appointmentId}`)
    return response.data
  },

  // Create appointment
  async createAppointment(appointmentData: Partial<ApiAppointment>): Promise<ApiAppointment> {
    const response = await apiClient.post<ApiAppointment>('/appointments', appointmentData)
    return response.data
  },

  // Update appointment
  async updateAppointment(appointmentId: string, updates: Partial<ApiAppointment>): Promise<ApiAppointment> {
    const response = await apiClient.patch<ApiAppointment>(`/appointments/${appointmentId}`, updates)
    return response.data
  },

  // Cancel appointment
  async cancelAppointment(appointmentId: string, reason?: string): Promise<void> {
    await apiClient.post(`/appointments/${appointmentId}/cancel`, { reason })
  },

  // Get available time slots
  async getAvailableSlots(date: string, providerId?: string): Promise<string[]> {
    const response = await apiClient.get<string[]>('/appointments/available-slots', {
      params: { date, providerId }
    })
    return response.data
  },
}

// File service
export const fileService = {
  // Upload file
  async uploadFile(request: FileUploadRequest): Promise<FileUploadResponse> {
    const formData = new FormData()
    formData.append('file', request.file)
    formData.append('category', request.category)
    
    if (request.metadata) {
      formData.append('metadata', JSON.stringify(request.metadata))
    }

    const response = await apiClient.post<FileUploadResponse>('/files/upload', formData)
    return response.data
  },

  // Get file info
  async getFileInfo(fileId: string): Promise<FileUploadResponse> {
    const response = await apiClient.get<FileUploadResponse>(`/files/${fileId}`)
    return response.data
  },

  // Delete file
  async deleteFile(fileId: string): Promise<void> {
    await apiClient.delete(`/files/${fileId}`)
  },

  // Get file download URL
  async getDownloadUrl(fileId: string): Promise<{ url: string; expiresAt: string }> {
    const response = await apiClient.get<{ url: string; expiresAt: string }>(`/files/${fileId}/download-url`)
    return response.data
  },
}

// Search service
export const searchService = {
  // Global search
  async search<T = unknown>(request: SearchRequest): Promise<PaginatedResponse<T>> {
    const response = await apiClient.post<PaginatedResponse<T>>('/search', request)
    return response.data
  },

  // Search appointments
  async searchAppointments(query: string, filters?: Record<string, unknown>): Promise<ApiAppointment[]> {
    const response = await apiClient.post<ApiAppointment[]>('/search/appointments', {
      query,
      filters,
    })
    return response.data
  },

  // Search patients
  async searchPatients(query: string): Promise<any[]> {
    const response = await apiClient.post<any[]>('/search/patients', { query })
    return response.data
  },
}

// Analytics service
export const analyticsService = {
  // Get dashboard metrics
  async getDashboardMetrics(period?: string): Promise<Record<string, unknown>> {
    const response = await apiClient.get<Record<string, unknown>>('/analytics/dashboard', {
      params: { period }
    })
    return response.data
  },

  // Get appointment analytics
  async getAppointmentAnalytics(startDate: string, endDate: string): Promise<Record<string, unknown>> {
    const response = await apiClient.get<Record<string, unknown>>('/analytics/appointments', {
      params: { startDate, endDate }
    })
    return response.data
  },

  // Get billing analytics
  async getBillingAnalytics(year?: number): Promise<Record<string, unknown>> {
    const response = await apiClient.get<Record<string, unknown>>('/analytics/billing', {
      params: { year }
    })
    return response.data
  },

  // Track event
  async trackEvent(event: string, properties?: Record<string, unknown>): Promise<void> {
    await apiClient.post('/analytics/events', { event, properties })
  },
}

// Notification service
export const notificationService = {
  // Get notifications
  async getNotifications(params?: {
    page?: number
    pageSize?: number
    unreadOnly?: boolean
  }): Promise<PaginatedResponse<any>> {
    const response = await apiClient.get<PaginatedResponse<any>>('/notifications', { params })
    return response.data
  },

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<void> {
    await apiClient.patch(`/notifications/${notificationId}/read`)
  },

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    await apiClient.patch('/notifications/read-all')
  },

  // Delete notification
  async deleteNotification(notificationId: string): Promise<void> {
    await apiClient.delete(`/notifications/${notificationId}`)
  },

  // Get notification preferences
  async getPreferences(): Promise<Record<string, boolean>> {
    const response = await apiClient.get<Record<string, boolean>>('/notifications/preferences')
    return response.data
  },

  // Update notification preferences
  async updatePreferences(preferences: Record<string, boolean>): Promise<Record<string, boolean>> {
    const response = await apiClient.patch<Record<string, boolean>>('/notifications/preferences', preferences)
    return response.data
  },
}

// Export all services
export const apiServices = {
  auth: authService,
  practice: practiceService,
  billing: billingService,
  appointments: appointmentService,
  files: fileService,
  search: searchService,
  analytics: analyticsService,
  notifications: notificationService,
}
