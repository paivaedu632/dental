"use client"

import * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageCircle,
  Share2,
  Play
} from "lucide-react"

export interface CampaignData {
  id: string
  doctorName: string
  location: string
  profileImage: string
  views: string
  duration: string
  phoneCalls: number
  qualifiedLeads: number
  appointments: number
  revenue: number
  adSpend: number
  roi: string
  likes: number
  comments: number
  shares: number
  videoThumbnail: string
  description: string
  createDate: string
}

export interface TikTokCampaignCardProps {
  campaign: CampaignData
  onView?: (campaign: CampaignData) => void
  onSave?: (campaign: CampaignData) => void
}

export function TikTokCampaignCard({ campaign, onView, onSave }: TikTokCampaignCardProps) {
  // Format numbers for display
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow max-w-md">
      <CardHeader className="pb-3">
        {/* Campaign Info */}
        <div className="flex items-center gap-3">
          <img
            src={campaign.profileImage}
            alt={campaign.doctorName}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KPHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+Cjwvc3ZnPgo8L3N2Zz4K'
            }}
          />
          <div>
            <h3 className="font-semibold text-sm">{campaign.doctorName}</h3>
            <Badge variant="secondary" className="text-xs px-2 py-0">
              Sponsored
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Media Preview */}
        <div className="relative mb-4 rounded-lg overflow-hidden bg-muted">
          <img
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=192&fit=crop"
            alt="Campaign preview"
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDQwMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+CjxzdmcgeD0iMTkyIiB5PSI4OCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgo8cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiIvPgo8cGF0aCBkPSJtMjEgMTUtMy0zLTMuNSAzLjUtMi41LTIuNUw5IDEzIi8+Cjwvc3ZnPgo8L3N2Zz4K'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-white/90 rounded-full p-3">
              <Play className="h-6 w-6 text-gray-800 fill-current" />
            </div>
          </div>
        </div>



        {/* Campaign Performance Stats */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Views:</span>
            <span className="font-semibold">{campaign.views}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Phone calls:</span>
            <span className="font-semibold">{formatNumber(campaign.phoneCalls)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Qualified leads:</span>
            <span className="font-semibold">{formatNumber(campaign.qualifiedLeads)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Appointments:</span>
            <span className="font-semibold">{formatNumber(campaign.appointments)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Revenue:</span>
            <span className="font-semibold">${formatNumber(campaign.revenue)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Ad spend:</span>
            <span className="font-semibold">${formatNumber(campaign.adSpend)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">ROI:</span>
            <span className="font-bold">{campaign.roi}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
