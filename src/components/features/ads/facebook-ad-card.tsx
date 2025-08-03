"use client"

import * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  Play,
  ExternalLink,
  MapPin,
  Calendar,
  TrendingUp
} from "lucide-react"

import type { AdData, FacebookAdCardProps } from '@/types/ads'

export function FacebookAdCard({ ad }: FacebookAdCardProps) {
  const adData = ad
  const [isBookmarked, setIsBookmarked] = React.useState(false)
  const [showFullDescription, setShowFullDescription] = React.useState(false)

  // Format numbers for display
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  // Format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Extract domain from description or use a default
  const extractDomain = () => {
    const urlMatch = adData.desc.match(/@(\w+)/g)
    if (urlMatch && urlMatch.length > 0) {
      return urlMatch[urlMatch.length - 1].replace('@', '') + '.com'
    }
    return 'walmart.com'
  }

  // Truncate description
  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const description = showFullDescription 
    ? adData.desc 
    : truncateDescription(adData.desc)

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow max-w-md">
      <CardHeader className="pb-3">
        {/* Advertiser Info */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={adData.app_image}
              alt={adData.app_name}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KPHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+Cjwvc3ZnPgo8L3N2Zz4K'
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{adData.app_name}</h3>
                <Badge variant="secondary" className="text-xs px-2 py-0">
                  Sponsored
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(adData.ad_create_time)}</span>
                <span>•</span>
                <MapPin className="h-3 w-3" />
                <span>{adData.fetch_region.join(', ')}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark 
              className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} 
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Ad Description */}
        <div className="mb-4">
          <p className="text-sm leading-relaxed">
            {description}
          </p>
          {adData.desc.length > 150 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-xs text-blue-600 hover:underline mt-1"
            >
              {showFullDescription ? 'See less' : 'See more'}
            </button>
          )}
        </div>

        {/* Media Preview */}
        <div className="relative mb-4 rounded-lg overflow-hidden bg-muted">
          <img
            src={adData.cover}
            alt="Ad preview"
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDQwMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+CjxzdmcgeD0iMTkyIiB5PSI4OCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgo8cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiIvPgo8Y2lyY2xlIGN4PSI4LjUiIGN5PSI4LjUiIHI9IjEuNSIvPgo8cGF0aCBkPSJtMjEgMTUtMy0zLTMuNSAzLjUtMi41LTIuNUw5IDEzIi8+Cjwvc3ZnPgo8L3N2Zz4K'
            }}
          />
          {adData.video_url && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="bg-white/90 rounded-full p-3">
                <Play className="h-6 w-6 text-gray-800 fill-current" />
              </div>
            </div>
          )}
          <div className="absolute bottom-2 right-2">
            <Badge variant="secondary" className="text-xs">
              {Math.floor(adData.duration / 60)}:{(adData.duration % 60).toString().padStart(2, '0')}
            </Badge>
          </div>
        </div>

        {/* Website Preview */}
        <div className="border rounded-lg p-3 mb-4 bg-muted/30">
          <div className="flex items-center gap-2 mb-2">
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              {extractDomain()}
            </span>
          </div>
          <h4 className="font-semibold text-sm mb-1">
            Hair Care Products - Premium Quality
          </h4>
          <p className="text-xs text-muted-foreground">
            Shop the latest hair care products for long-lasting results
          </p>
        </div>

        {/* Engagement Metrics */}
        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{formatNumber(adData.digg_count)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{formatNumber(adData.comment_count)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              <span>{formatNumber(adData.share_count)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>{formatNumber(adData.play_count)} views</span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
          <div className="text-center p-2 bg-muted/50 rounded">
            <div className="font-semibold">{adData.put_days}</div>
            <div className="text-muted-foreground">Days Active</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded">
            <div className="font-semibold">${adData.min_cpa}</div>
            <div className="text-muted-foreground">Min CPA</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded">
            <div className="font-semibold">{adData.hot_value}</div>
            <div className="text-muted-foreground">Hot Score</div>
          </div>
        </div>

        {/* Call to Action */}
        <Button className="w-full" size="lg">
          {adData.button_text}
        </Button>
      </CardContent>
    </Card>
  )
}
