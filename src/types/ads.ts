// Advertising and marketing related types
// Centralized ad-related types from components and data files

import { BaseComponentProps, ID, UUID, Status } from './common'

// Core ad data structure (from Facebook/TikTok ads)
export interface AdData {
  search_by_image_tag: boolean
  comment_count: number
  app_dev_id: string
  digg_play_rate: number
  modify_time: number
  min_cpa: number
  pack_url: string
  type: number
  is_collection: boolean
  platform: number
  duration: number
  cover: string
  video_url: string
  share_play_rate: number
  last_put_time: number
  root_path_id: string
  min_cpm: number
  put_days: number
  unique_id: string
  app_title: string
  popular_person_id: string
  fetch_region: string[]
  ad_create_time: number
  play_count: number
  share_count: number
  app_name: string
  found_time: number
  ad_id: string
  hot_value: number
  digg_count: number
  is_download: boolean
  data_type: number[]
  button_text: string
  desc: string
  video_id: string
  app_image: string
}

// Competitor data structure
export interface CompetitorData {
  id: UUID
  name: string
  website: string
  description: string
  category: string
  location: {
    city: string
    state: string
    country: string
  }
  contact: {
    phone?: string
    email?: string
  }
  social_media: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  services: string[]
  pricing_range: {
    min: number
    max: number
    currency: string
  }
  raw_gmb_metrics: {
    visibility: {
      profile_views_30d: number
      search_appearances: number
      map_views: number
      listing_photos_viewed: number
    }
    engagement: {
      phone_calls_30d: number
      direction_requests_30d: number
      website_clicks_30d: number
      message_conversations_30d: number
    }
    reputation: {
      total_reviews: number
      average_rating: number
      reviews_last_30d: number
      five_star_reviews_30d: number
      response_rate: number
      avg_response_time_hours: number
    }
    content_performance: {
      photos_uploaded_30d: number
      posts_published_30d: number
      questions_answered: number
      business_updates: number
    }
  }
}

// Ad campaign types
export interface AdCampaign {
  id: UUID
  name: string
  platform: AdPlatform
  status: CampaignStatus
  budget: {
    daily: number
    total: number
    spent: number
    currency: string
  }
  targeting: {
    demographics: Demographics
    interests: string[]
    behaviors: string[]
    locations: string[]
  }
  performance: CampaignPerformance
  createdAt: Date
  updatedAt: Date
}

export type AdPlatform = 'facebook' | 'instagram' | 'google' | 'tiktok' | 'linkedin'
export type CampaignStatus = 'active' | 'paused' | 'completed' | 'draft'

export interface Demographics {
  ageRange: {
    min: number
    max: number
  }
  gender: 'all' | 'male' | 'female'
  languages: string[]
}

export interface CampaignPerformance {
  impressions: number
  clicks: number
  conversions: number
  ctr: number // Click-through rate
  cpc: number // Cost per click
  cpm: number // Cost per mille
  roas: number // Return on ad spend
}

// Component props
export interface FacebookAdCardProps extends BaseComponentProps {
  ad: AdData
  onView?: (ad: AdData) => void
  onSave?: (ad: AdData) => void
}

export interface CompetitorCardProps extends BaseComponentProps {
  competitor: CompetitorData
  onAnalyze?: (competitor: CompetitorData) => void
}

export interface AdCampaignCardProps extends BaseComponentProps {
  campaign: AdCampaign
  onEdit?: (campaign: AdCampaign) => void
  onPause?: (campaign: AdCampaign) => void
  onDelete?: (campaign: AdCampaign) => void
}

// Filter and search types
export interface AdFilters {
  platform?: AdPlatform[]
  dateRange?: {
    start: Date
    end: Date
  }
  performanceRange?: {
    minImpressions?: number
    maxImpressions?: number
    minCtr?: number
    maxCtr?: number
  }
  categories?: string[]
}

export interface CompetitorFilters {
  location?: string
  category?: string
  priceRange?: {
    min: number
    max: number
  }
  rating?: {
    min: number
    max: number
  }
}
