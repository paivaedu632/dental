import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BarChart3,
  Filter,
  Search,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react"

export default function AdsPage() {
  const sampleAds = [
    {
      id: 1,
      title: "Invisalign Special - Limited Time",
      platform: "Facebook",
      status: "Active",
      impressions: "23.5K",
      clicks: "1.2K",
      ctr: "5.1%",
      spend: "$1,230",
      conversions: 42,
      cpa: "$29.28",
      lastSeen: "2 hours ago",
    },
    {
      id: 2,
      title: "Teeth Whitening Offer",
      platform: "Instagram",
      status: "Paused",
      impressions: "15.2K",
      clicks: "780",
      ctr: "5.1%",
      spend: "$640",
      conversions: 19,
      cpa: "$33.68",
      lastSeen: "1 day ago",
    },
    {
      id: 3,
      title: "New Patient Exam & X-Ray",
      platform: "TikTok",
      status: "Active",
      impressions: "42.8K",
      clicks: "2.9K",
      ctr: "6.8%",
      spend: "$2,340",
      conversions: 67,
      cpa: "$34.92",
      lastSeen: "15 minutes ago",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ads</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and optimize your marketing campaigns across platforms.
          </p>
        </div>
        <Button className="gap-2">
          <BarChart3 className="h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across Facebook, Instagram, TikTok</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,420</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. CTR</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.6%</div>
            <p className="text-xs text-muted-foreground">Weighted across campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Patients</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">Attributed this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search campaigns..." className="pl-10" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Ads Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleAds.map((ad) => (
          <Card key={ad.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{ad.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {ad.platform}
                    </Badge>
                    <Badge variant={ad.status === "Active" ? "default" : "secondary"} className="text-xs">
                      {ad.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Impressions</div>
                  <div className="font-medium">{ad.impressions}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Clicks</div>
                  <div className="font-medium">{ad.clicks}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">CTR</div>
                  <div className="font-medium">{ad.ctr}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Spend</div>
                  <div className="font-medium">{ad.spend}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Conversions</div>
                  <div className="font-medium">{ad.conversions}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">CPA</div>
                  <div className="font-medium">{ad.cpa}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-4 text-xs text-muted-foreground">
                <span>Last seen: {ad.lastSeen}</span>
                <span className="flex items-center gap-1">
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <span>Performance</span>
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          Load More Campaigns
        </Button>
      </div>
    </div>
  )
}
