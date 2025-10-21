# Component Migration Plan

## Current Components to Migrate

### Auth Components
- `src/components/auth/google-oauth-button.tsx` → `src/components/features/auth/google-oauth-button.tsx`

### Ads Components  
- `src/components/facebook-ad-card.tsx` → `src/components/features/ads/facebook-ad-card.tsx`

### Billing Components
- `src/components/pricing-calculator.tsx` → `src/components/features/billing/pricing-calculator.tsx`

### Support Components
- `src/components/support-contact-form.tsx` → `src/components/features/support/support-contact-form.tsx`
- `src/components/floating-help-widget.tsx` → `src/components/features/support/floating-help-widget.tsx`

### Settings Components (to be broken down)
- Settings page (1180 lines) will be broken into:
  - `settings-container.tsx` - Main container component
  - `settings-navigation.tsx` - Tab navigation
  - `personal-settings.tsx` - Personal information section
  - `billing-settings.tsx` - Billing and subscription section
  - `security-settings.tsx` - Security and privacy section

### Shared Components
- `src/components/app-sidebar.tsx` → `src/components/shared/app-sidebar.tsx`
- `src/components/lead-capture-page.tsx` → `src/components/shared/lead-capture-page.tsx` (if used across features)

### Layout Components (keep in current location)
- `src/components/layouts/` - Keep as is, these are architectural components

### UI Components (keep in current location)
- `src/components/ui/` - Keep as is, these are design system components

## Migration Order
1. Auth components (lowest risk)
2. Ads components 
3. Billing components
4. Support components
5. Settings component breakdown (highest complexity)
6. Shared components

## Import Update Strategy
- Update all imports to use new paths
- Use index files for clean imports
- Test each migration before proceeding to next
