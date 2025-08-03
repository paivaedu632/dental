# ShadCN Components Reference - DentalFlow Dashboard

This file tracks all ShadCN components used in the DentalFlow project and serves as a reference for component availability.

## Currently Available Components

### UI Components
- **Button** (`src/components/ui/button.tsx`)
  - Variants: default, destructive, outline, secondary, ghost, link
  - Sizes: default, sm, lg, icon
  - Used for: Primary actions, secondary actions, icon buttons

- **Card** (`src/components/ui/card.tsx`)
  - Components: Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter
  - Used for: Content containers, feature cards, information display

- **Badge** (`src/components/ui/badge.tsx`)
  - Variants: default, secondary, destructive, outline
  - Used for: Status indicators, labels, tags

- **Avatar** (`src/components/ui/avatar.tsx`)
  - Components: Avatar, AvatarImage, AvatarFallback
  - Used for: User profile images, placeholder avatars

- **Sidebar** (`src/components/ui/sidebar.tsx`)
  - Components: Sidebar, SidebarProvider, SidebarTrigger, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarRail
  - Used for: Navigation sidebar, collapsible sidebar, dashboard layout

- **Input** (`src/components/ui/input.tsx`)
  - Used for: Text input fields, search boxes

- **Dropdown Menu** (`src/components/ui/dropdown-menu.tsx`)
  - Components: DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
  - Used for: User menus, context menus, action menus

- **Progress** (`src/components/ui/progress.tsx`)
  - Used for: Progress bars, loading indicators, usage tracking

- **Separator** (`src/components/ui/separator.tsx`)
  - Used for: Visual separation between content sections

- **Sheet** (`src/components/ui/sheet.tsx`)
  - Used for: Mobile sidebar, overlay panels

- **Tooltip** (`src/components/ui/tooltip.tsx`)
  - Used for: Hover information, help text

- **Skeleton** (`src/components/ui/skeleton.tsx`)
  - Used for: Loading states, placeholder content

- **Table** (`src/components/ui/table.tsx`)
  - Used for: Data tables with sorting, responsive design, competitor analysis

- **Dialog** (`src/components/ui/dialog.tsx`)
  - Used for: Modal dialogs, lead capture page overlay

- **Label** (`src/components/ui/label.tsx`)
  - Used for: Form labels, input field descriptions

## Components Used in Dashboard
- Button ✅ (Used for navigation, actions, filters, CTA buttons)
- Card ✅ (Used for content containers, stats cards, product cards, ad cards)
- Badge ✅ (Used for status indicators, categories, countries, sponsored labels)
- Sidebar ✅ (Used for main navigation with Minea-style toggle behavior)
- Input ✅ (Used for search functionality)
- Dropdown Menu ✅ (Used for user menu in sidebar footer)

## Custom Components
- **FacebookAdCard** (`src/components/facebook-ad-card.tsx`)
  - Facebook-style ad layout with media preview
  - Engagement metrics (likes, comments, shares, views)
  - Advertiser information and sponsored labels
  - Performance metrics (CPA, days active, hot score)
  - Interactive elements (bookmark, expand description)
  - Responsive design with ShadCN components

## Components Used in Landing Page
- Button ✅ (Used for CTA buttons, navigation, form submissions)
- Badge ✅ (Used for social proof, ratings, status indicators, urgency elements)
- Card ✅ (Used for pricing calculator, testimonials, feature sections)
- Input ✅ (Used for email capture forms, contact forms)
- Avatar ❌ (Not used in this design)

## Lucide Icons Used
### Dashboard Icons
- BarChart3 ✅ (Used for ads, analytics)
- Building2 ✅ (Used for shops)
- Package ✅ (Used for products)
- Target ✅ (Used for success radar)
- Home ✅ (Used for home navigation)
- Search ✅ (Used for search functionality)
- Settings ✅ (Used for settings)
- User2 ✅ (Used for user profile)
- ChevronUp ✅ (Used for dropdown indicators)
- Plus ✅ (Used for add actions)
- Filter ✅ (Used for filtering)
- Calendar ✅ (Used for date filters)
- Globe ✅ (Used for website indicators)
- DollarSign ✅ (Used for pricing/spend)
- Eye ✅ (Used for view actions)
- Heart ✅ (Used for favorites)
- Share2 ✅ (Used for sharing)
- ExternalLink ✅ (Used for external links)
- ShoppingCart ✅ (Used for product actions)
- TrendingUp ✅ (Used for trending indicators)
- ArrowUp/ArrowDown ✅ (Used for trend directions)
- Zap ✅ (Used for advanced tools)
- Play ✅ (Used for tutorial buttons, video previews)
- Bookmark ✅ (Used for save/bookmark functionality)
- MessageCircle ✅ (Used for comment counts)
- MapPin ✅ (Used for location indicators)

### Landing Page Icons
- Star ✅ (Used for rating stars with fill, testimonials, reviews)
- Users ✅ (Used for community indicator, social proof, practice counts)
- CheckCircle ✅ (Used for benefit lists, feature confirmations, guarantees)
- Play ✅ (Used for video demos, tutorial buttons)
- ArrowRight ✅ (Used for CTA buttons, navigation, next actions)
- Clock ✅ (Used for urgency timers, setup time indicators)
- Zap ✅ (Used for urgency banners, power features, speed indicators)
- Shield ✅ (Used for security badges, compliance indicators, trust elements)
- DollarSign ✅ (Used for pricing, revenue metrics, cost calculations)
- TrendingUp ✅ (Used for growth statistics, performance metrics)
- Calculator ✅ (Used for pricing calculator, ROI tools)
- Award ✅ (Used for ratings, achievements, recognition)
- X ✅ (Used for close buttons, dismissible elements)
- ChevronDown/ChevronUp ✅ (Used for FAQ accordions, dropdowns)
- ChevronLeft/ChevronRight ✅ (Used for testimonial navigation)
- Quote ✅ (Used for testimonial sections, customer quotes)
- Calendar ✅ (Used for scheduling features, appointment booking)
- CreditCard ✅ (Used for billing features, payment processing)
- MessageSquare ✅ (Used for communication features, support chat)
- BarChart3 ✅ (Used for analytics features, practice metrics)
- Smartphone ✅ (Used for mobile features, device compatibility)
- Phone ✅ (Used for contact information, support phone)
- Mail ✅ (Used for email support, contact forms)
- MessageCircle ✅ (Used for live chat, messaging features)

## Design System
- Style: new-york
- Base Color: neutral
- CSS Variables: enabled
- Icon Library: lucide
- Tailwind CSS: v4

## Dashboard Structure
- Main Layout: `src/app/layout.tsx` (Integrated sidebar layout)
- Ads Section: `src/app/ads/page.tsx` (Simplified - single Facebook ad card)
- Competitors Section: `src/app/competitors/page.tsx` (Table-based layout with real JSON data)
- Landing Page Section: `src/app/landing-page/page.tsx` (Table-based layout with lead capture)
- Call Agent Section: `src/app/voice-agent/page.tsx` (Renamed from Voice Agent, table-based layout)
- Appointments Section: `src/app/appointments/page.tsx` (Table-based layout with DentalFlow appointment data)
- Products Section: `src/app/products/page.tsx`
- Shops Section: `src/app/shops/page.tsx`
- Success Radar Section: `src/app/success-radar/page.tsx`
- Settings Section: `src/app/settings/page.tsx` (Comprehensive settings page matching Minea structure)
- Usage & Billing Section: `src/app/usage/page.tsx` (Usage-based billing dashboard with charts and analytics)
- Pricing Calculator: `src/components/pricing-calculator.tsx` (Interactive ROI calculator)
- Pricing Page: `src/app/pricing/page.tsx` (Dedicated pricing information and calculator)
- Billing Utilities: `src/lib/billing.ts` (Usage-based pricing calculations and utilities)
- Support Page: `src/app/support/page.tsx` (Comprehensive help center with resources and contact options)
- Contact Page: `src/app/contact/page.tsx` (Dedicated contact form and support information)
- Support Contact Form: `src/components/support-contact-form.tsx` (Reusable contact form component)
- Floating Help Widget: `src/components/floating-help-widget.tsx` (Always-accessible help button)
- Signup Page: `src/app/signup/page.tsx` (Comprehensive signup with Google OAuth and value proposition)
- Signin Page: `src/app/signin/page.tsx` (Professional signin page with multiple authentication options)
- Onboarding Flow: `src/app/onboarding/page.tsx` (Multi-step onboarding for new users)
- Google OAuth Component: `src/components/auth/google-oauth-button.tsx` (Reusable Google authentication)
- Terms of Service: `src/app/terms/page.tsx` (Legal terms and conditions)
- Privacy Policy: `src/app/privacy/page.tsx` (HIPAA-compliant privacy policy)
- Layout Provider: `src/components/layouts/layout-provider.tsx` (Conditional layout routing)
- Dashboard Layout: `src/components/layouts/dashboard-layout.tsx` (Sidebar and dashboard wrapper)
- Auth Layout: `src/components/layouts/auth-layout.tsx` (Standalone authentication layout)
- App Sidebar: `src/components/app-sidebar.tsx`

## Font Configuration
- **Primary Font**: Inter (from Google Fonts)
- **Font Variable**: `--font-inter`
- **Applied**: Universally across all dashboard components and pages
- **Configuration**: `src/app/layout.tsx` and `src/app/globals.css`

## Sidebar Configuration
- **Header**: Clean design with app name and collapse toggle
- **Collapse Button**: SidebarTrigger component with automatic state management
- **Navigation**: No section labels, direct menu items
- **State Management**: Uses ShadCN sidebar context for collapse/expand control
- **Behavior**: Title text hides when collapsed, toggle button remains visible
- **Responsive**: Automatic mobile/desktop behavior with proper icon states

## Data Integration
- **Facebook Ad Card**: `src/components/facebook-ad-card.tsx` - Displays real ad data from JSON
- **Ad Data Source**: `src/app/ad.json` - Contains Facebook ad metadata and metrics
- **Competitor Data Source**: `src/app/competitor.json` - Contains comprehensive competitor analysis data
- **Competitor Analysis**: Table-based layout with sorting, filtering, and comprehensive business metrics
- **Table Features**: Sortable columns, search functionality, responsive design, professional data presentation
- **Lead Capture Component**: `src/components/lead-capture-page.tsx` - Professional DentalFlow lead capture page
- **Lead Capture Features**: Modal dialog, contact form, social proof, urgency elements, responsive design
- **Landing Page Table**: Sortable columns, search functionality, conversion metrics, practice analytics
- **Table Integration**: Simplified interface with lead capture opening in new tab
- **Interface Reorganization**: Restored stats cards, moved action buttons to replace category filters
- **Call Agent System**: Renamed from Voice Agent, focuses on DentalFlow practice call handling and appointment booking
- **Call Agent Metrics**: Success rates, call volumes, appointment conversions, revenue tracking
- **UI Simplification**: Removed status filter tags, moved configure button for cleaner interface
- **Appointments Management**: Table-based appointment scheduling with patient data, service types, and provider assignments
- **Appointment Tracking**: Status management (Confirmed/Scheduled/Completed/Cancelled), duration tracking, new patient identification
- **URL Structure Simplification**: Removed "dashboard/" prefix from all routes, removed Home section completely
- **Navigation Updates**: Updated all navigation links to use simplified URLs (/ads, /appointments, /competitors, etc.)
- **Error Resolution**: Fixed HTTP 500 errors caused by JSON data structure mismatches and component prop issues
- **Data Handling**: Updated components to handle single object JSON files and proper data transformation
- **Settings Page**: Comprehensive settings interface matching Minea structure with 8 main sections
- **Settings Features**: Personal info, security, billing, practice settings, notifications, integrations, referrals, plans
- **Usage-Based Billing**: Complete billing system with appointment tracking and transparent pricing
- **Billing Features**: Setup fee ($300), monthly base ($97), free appointments (10), per-appointment fee ($50)
- **ROI Calculator**: Interactive calculator showing costs, revenue, profit, and ROI percentages
- **Usage Dashboard**: Real-time usage tracking with charts, projections, and billing history
- **Pricing Transparency**: Clear cost breakdown and comparison tables for different appointment volumes
- **Comprehensive Support System**: Multi-channel support with help center, contact forms, and floating widget
- **Support Features**: Live chat, email support, phone support, help articles, video tutorials, FAQ
- **Support Access Points**: Sidebar navigation, settings section, floating widget, user profile dropdown
- **Contact Management**: Professional contact forms with categorization, priority levels, and ticket tracking
- **Help Resources**: Searchable help articles, video tutorials, troubleshooting guides, and documentation
- **Sidebar Toggle Behavior**: Minea-style sidebar collapse with toggle-only view when collapsed
- **Responsive Sidebar**: Clean minimalist collapsed state focusing on toggle functionality over branding
- **Authentication System**: Complete signup/signin flow with Google OAuth integration
- **Signup Features**: Professional signup page with value proposition, pricing transparency, and legal compliance
- **Onboarding Flow**: Multi-step guided setup for new users with practice customization
- **Legal Compliance**: HIPAA-compliant privacy policy and comprehensive terms of service
- **User Experience**: Responsive design, professional branding, and seamless authentication flow
- **Layout Separation**: Authentication pages completely separate from dashboard layout
- **Standalone Auth**: No sidebar or dashboard elements on signup, signin, onboarding, terms, privacy pages
- **Conditional Routing**: Smart layout provider that applies correct layout based on route
- **Fixed Route Detection**: Uses exact route matching instead of startsWith to prevent root route conflicts
- **Debug Logging**: Development-mode logging for layout provider troubleshooting

## High-Converting Landing Page Components
- **Hero Section** (`src/components/landing/hero-section.tsx`)
  - Compelling headline with benefit-focused copy
  - Email capture form with CTA button
  - Social proof badges and trust indicators
  - Benefits list with checkmarks
  - Interactive dashboard preview
  - Floating stats cards for credibility
  - Video demo CTA button

- **Urgency Banner** (`src/components/landing/urgency-banner.tsx`)
  - Limited time offer messaging
  - Live countdown timer with hours/minutes/seconds
  - Promotional pricing (3 months free)
  - Dismissible banner with close button
  - Mobile-responsive design

- **Trust Section** (`src/components/landing/trust-section.tsx`)
  - Trust indicators with icons and metrics
  - Industry logo placeholders
  - Security compliance badges
  - Recent signup activity feed
  - Social proof statistics

- **Stats Section** (`src/components/landing/stats-section.tsx`)
  - Animated number counters
  - Key performance metrics (40% revenue increase, 60% no-show reduction)
  - Intersection observer for scroll-triggered animations
  - Bottom CTA with value proposition

- **Features Section** (`src/components/landing/features-section.tsx`)
  - Tabbed interface for feature exploration
  - Interactive feature demos
  - Benefit lists with checkmarks
  - Mock interface previews
  - Additional features grid

- **Testimonials Section** (`src/components/landing/testimonials-section.tsx`)
  - Rotating testimonial carousel
  - Before/after transformation stories
  - Results metrics for each testimonial
  - Navigation controls and indicators
  - Grid view of all testimonials

- **Pricing Section** (`src/components/landing/pricing-section.tsx`)
  - Interactive pricing calculator
  - Usage-based pricing model ($300 setup + $97/month + $50/appointment after 10)
  - Competitor comparison table
  - Value proposition highlighting
  - Transparent cost breakdown

- **FAQ Section** (`src/components/landing/faq-section.tsx`)
  - Accordion-style FAQ list
  - Common objections addressed
  - Support contact options
  - Quick start CTA

- **CTA Section** (`src/components/landing/cta-section.tsx`)
  - Final conversion-focused section
  - Email capture with prominent CTA
  - 30-day growth guarantee
  - Multiple contact options
  - Urgency elements and limited-time offers

## Landing Page Features
- **Conversion Optimization**: Multiple CTAs, urgency elements, social proof
- **Mobile Responsive**: All components optimized for mobile devices
- **Performance**: Lazy loading, optimized images, fast loading times
- **SEO Optimized**: Proper meta tags, structured data, semantic HTML
- **Trust Building**: Security badges, testimonials, guarantees, social proof
- **Interactive Elements**: Pricing calculator, animated counters, tabbed features
- **Professional Design**: Modern UI, consistent branding, high-quality visuals
