// Mock Service Worker server setup
// Provides API mocking for tests using MSW

import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { mockUser, mockPractice, mockBillingPeriod } from '../utils'

// API base URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

// Mock handlers
export const handlers = [
  // Authentication endpoints
  rest.post(`${API_BASE}/auth/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
          user: mockUser,
          tokens: {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            expiresAt: new Date(Date.now() + 3600000).toISOString(),
            tokenType: 'Bearer',
          },
          permissions: ['billing:read', 'billing:write', 'staff:read'],
        },
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  rest.post(`${API_BASE}/auth/logout`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: null,
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  rest.get(`${API_BASE}/auth/profile`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: mockUser,
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  rest.patch(`${API_BASE}/auth/profile`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: { ...mockUser, ...req.body },
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  // Practice endpoints
  rest.get(`${API_BASE}/practice`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: mockPractice,
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  rest.patch(`${API_BASE}/practice`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: { ...mockPractice, ...req.body },
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  rest.get(`${API_BASE}/practice/staff`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: [
          {
            id: 'staff-1',
            name: 'Dr. Jane Smith',
            email: 'jane@example.com',
            role: 'dentist',
            permissions: ['appointments:read', 'appointments:write'],
            isActive: true,
          },
          {
            id: 'staff-2',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'hygienist',
            permissions: ['appointments:read'],
            isActive: true,
          },
        ],
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  // Billing endpoints
  rest.get(`${API_BASE}/billing/current`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: mockBillingPeriod,
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  rest.get(`${API_BASE}/billing/usage`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
          appointmentCount: 15,
          setupFee: 300,
          baseFee: 97,
          usageFee: 250,
          totalFee: 647,
        },
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  rest.get(`${API_BASE}/billing/history`, (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page')) || 1
    const pageSize = Number(req.url.searchParams.get('pageSize')) || 20

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
          data: [mockBillingPeriod],
          pagination: {
            page,
            pageSize,
            total: 1,
            totalPages: 1,
          },
        },
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  rest.get(`${API_BASE}/billing/payment-methods`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: [
          {
            id: 'pm-1',
            type: 'card',
            last4: '4242',
            expiryMonth: 12,
            expiryYear: 2025,
            isDefault: true,
          },
        ],
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  // Appointments endpoints
  rest.get(`${API_BASE}/appointments`, (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page')) || 1
    const pageSize = Number(req.url.searchParams.get('pageSize')) || 20

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
          data: [
            {
              id: 'apt-1',
              practiceId: 'practice-1',
              patientId: 'patient-1',
              providerId: 'staff-1',
              scheduledAt: new Date().toISOString(),
              duration: 30,
              status: 'scheduled',
              type: 'consultation',
              notes: 'Regular checkup',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
          pagination: {
            page,
            pageSize,
            total: 1,
            totalPages: 1,
          },
        },
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  rest.post(`${API_BASE}/appointments`, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        data: {
          id: 'apt-new',
          ...req.body,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  // File upload endpoints
  rest.post(`${API_BASE}/files/upload`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
          id: 'file-1',
          filename: 'mock-file.pdf',
          originalName: 'document.pdf',
          mimeType: 'application/pdf',
          size: 1024,
          url: 'https://example.com/files/mock-file.pdf',
          category: 'document',
          uploadedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  // Search endpoints
  rest.post(`${API_BASE}/search`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
          data: [],
          pagination: {
            page: 1,
            pageSize: 20,
            total: 0,
            totalPages: 0,
          },
        },
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  // Analytics endpoints
  rest.get(`${API_BASE}/analytics/dashboard`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
          totalAppointments: 150,
          totalRevenue: 15000,
          averageAppointmentValue: 100,
          patientSatisfaction: 4.8,
        },
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  // Notifications endpoints
  rest.get(`${API_BASE}/notifications`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
          data: [
            {
              id: 'notif-1',
              title: 'Test Notification',
              message: 'This is a test notification',
              type: 'info',
              read: false,
              timestamp: new Date().toISOString(),
            },
          ],
          pagination: {
            page: 1,
            pageSize: 20,
            total: 1,
            totalPages: 1,
          },
        },
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  // System endpoints
  rest.get(`${API_BASE}/health`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
      })
    )
  }),

  rest.get(`${API_BASE}/version`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        version: '1.0.0',
        build: 'mock-build',
      })
    )
  }),

  // Error handlers for testing error scenarios
  rest.get(`${API_BASE}/error/500`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        success: false,
        error: {
          code: '500',
          message: 'Internal server error',
        },
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  rest.get(`${API_BASE}/error/404`, (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        success: false,
        error: {
          code: '404',
          message: 'Not found',
        },
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),

  rest.get(`${API_BASE}/error/401`, (req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json({
        success: false,
        error: {
          code: '401',
          message: 'Unauthorized',
        },
        timestamp: new Date().toISOString(),
        requestId: 'mock-request-id',
      })
    )
  }),
]

// Create server instance
export const server = setupServer(...handlers)
