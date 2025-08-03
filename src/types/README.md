# DentalFlow Type System

This directory contains the centralized TypeScript type definitions for the DentalFlow application. The type system is organized by domain to improve maintainability and reusability.

## Directory Structure

```
src/types/
├── index.ts          # Main entry point - exports all types
├── common.ts         # Base types and utilities used across the app
├── api.ts           # API request/response types and error handling
├── ads.ts           # Advertising and marketing related types
├── billing.ts       # Billing, pricing, and subscription types
├── settings.ts      # Settings and configuration types
├── support.ts       # Support, help, and ticketing types
├── ui.ts           # UI component prop interfaces
└── README.md       # This file
```

## Usage

### Importing Types

```typescript
// Import specific types
import type { User, Practice, BillingPeriod } from '@/types'

// Import from specific domain
import type { AdData, CompetitorData } from '@/types/ads'
import type { SupportTicket } from '@/types/support'

// Import from feature components (re-exported for convenience)
import type { PricingCalculatorProps } from '@/components/features/billing'
```

### Type Categories

#### Common Types (`common.ts`)
- **Base Types**: `BaseComponentProps`, `LoadingState`, `ApiResponse`
- **Utility Types**: `Optional`, `RequiredFields`, `Nullable`, `Maybe`
- **User & Practice**: `User`, `Practice`, `Address`, `BusinessHours`
- **UI Types**: `ThemeMode`, `Size`, `Variant`, `Priority`, `Status`

#### API Types (`api.ts`)
- **Request/Response**: `ApiResponse`, `ApiError`, `ApiRequestConfig`
- **Authentication**: `AuthTokens`, `LoginRequest`, `LoginResponse`
- **Resources**: `ApiUser`, `ApiPractice`, `ApiAppointment`
- **File Upload**: `FileUploadRequest`, `FileUploadResponse`

#### Domain-Specific Types
- **Ads** (`ads.ts`): `AdData`, `CompetitorData`, `AdCampaign`
- **Billing** (`billing.ts`): `PricingTier`, `BillingPeriod`, `Invoice`
- **Settings** (`settings.ts`): `SettingsTab`, `PersonalInfo`, `SecuritySettings`
- **Support** (`support.ts`): `SupportTicket`, `ContactFormData`, `HelpArticle`

#### UI Component Types (`ui.ts`)
- **Base Props**: `ComponentWithChildren`, `FormComponentProps`
- **Interactive**: `ButtonLikeProps`, `InputLikeProps`, `ModalProps`
- **Navigation**: `NavigationProps`, `NavigationItem`

## Type Naming Conventions

### Interfaces vs Types
- Use `interface` for object shapes that might be extended
- Use `type` for unions, primitives, and computed types

```typescript
// ✅ Good - Interface for extensible object
export interface User {
  id: string
  name: string
}

// ✅ Good - Type for union
export type UserRole = 'admin' | 'dentist' | 'staff'

// ✅ Good - Type for computed type
export type UserWithRole = User & { role: UserRole }
```

### Naming Patterns
- **Interfaces**: PascalCase, descriptive nouns
- **Types**: PascalCase, descriptive nouns or adjectives
- **Props**: ComponentName + "Props" suffix
- **Enums**: PascalCase for type, UPPER_CASE for values

```typescript
// ✅ Component props
export interface PricingCalculatorProps {
  defaultAppointments?: number
}

// ✅ Data models
export interface SupportTicket {
  id: string
  status: TicketStatus
}

// ✅ Union types
export type TicketStatus = 'open' | 'closed' | 'pending'
```

## Best Practices

### 1. Use Centralized Types
```typescript
// ❌ Don't define types inline in components
interface Props {
  user: {
    id: string
    name: string
  }
}

// ✅ Use centralized types
import type { User, ComponentProps } from '@/types'

interface Props extends ComponentProps {
  user: User
}
```

### 2. Extend Base Types
```typescript
// ✅ Extend base component props
import type { BaseComponentProps } from '@/types/common'

export interface CustomComponentProps extends BaseComponentProps {
  title: string
  onAction: () => void
}
```

### 3. Use Utility Types
```typescript
// ✅ Use utility types for variations
import type { Optional, RequiredFields } from '@/types/common'

// Make some fields optional
type PartialUser = Optional<User, 'avatar' | 'phone'>

// Make some fields required
type UserWithEmail = RequiredFields<User, 'email'>
```

### 4. Generic Types for Reusability
```typescript
// ✅ Generic types for reusable patterns
export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
}

// Usage
type UserResponse = ApiResponse<User>
type UsersResponse = ApiResponse<User[]>
```

## Migration Guide

When moving types from components to centralized types:

1. **Extract the type** from the component file
2. **Add it to the appropriate domain file** (ads.ts, billing.ts, etc.)
3. **Update the component** to import from centralized types
4. **Update the feature index** to re-export the type
5. **Test** that everything still works

### Example Migration

```typescript
// Before: In component file
export interface MyComponentProps {
  title: string
  onAction: () => void
}

// After: In centralized types
// src/types/ui.ts
export interface MyComponentProps extends BaseComponentProps {
  title: string
  onAction: () => void
}

// Component file
import type { MyComponentProps } from '@/types/ui'
```

## Future Enhancements

- **Validation Schemas**: Add runtime validation using Zod or similar
- **API Client Types**: Expand API types as backend is developed
- **Form Types**: Add comprehensive form validation types
- **Theme Types**: Expand theme and styling type definitions
- **Testing Types**: Add types for test utilities and mocks

## Contributing

When adding new types:

1. **Choose the right domain file** or create a new one if needed
2. **Follow naming conventions** established in this guide
3. **Add JSDoc comments** for complex types
4. **Update this README** if adding new patterns or domains
5. **Re-export** types in the main index.ts file
