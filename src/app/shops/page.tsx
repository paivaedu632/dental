import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Building2,
  Filter,
  Search,
  Calendar,
  Globe,
  TrendingUp,
  Star,
  ExternalLink,
  BarChart3
} from "lucide-react"

export default function ShopsPage() {
  const sampleShops = [
    {
      id: 1,
      name: "Saladcode Beauty",
      domain: "www.saladcode.com",
      country: "ES",
      category: "Beauty & Cosmetics",
      rating: 4.8,
      totalAds: 156,
      activeAds: 23,
      monthlySpend: "$12.5K",
      status: "Active",
      lastSeen: "2 hours ago",
      platform: "Shopify",
    },
    {
      id: 2,
      name: "PepPlay Games",
      domain: "pepplay.in",
      country: "IN",
      category: "Games & Toys",
      rating: 4.6,
      totalAds: 89,
      activeAds: 12,
      monthlySpend: "$3.2K",
      status: "Active",
      lastSeen: "1 hour ago",
      platform: "WooCommerce",
    },
    {
      id: 3,
      name: "Taaima Fashion",
      domain: "taaima.shop",
      country: "IT",
      category: "Fashion & Apparel",
      rating: 4.9,
      totalAds: 234,
      activeAds: 45,
      monthlySpend: "$28.7K",
      status: "Active",
      lastSeen: "30 minutes ago",
      platform: "Shopify",
    },
    {
      id: 4,
      name: "HydroShield Pro",
      domain: "www.hydro-shield.com",
      country: "US",
      category: "Home & Garden",
      rating: 4.7,
      totalAds: 67,
      activeAds: 8,
      monthlySpend: "$5.8K",
      status: "Active",
      lastSeen: "4 hours ago",
      platform: "Shopify",
    },
    {
      id: 5,
      name: "Kitty Town Coffee",
      domain: "kittytowncoffee.com",
      country: "US",
      category: "Food & Beverage",
      rating: 4.9,
      totalAds: 45,
      activeAds: 15,
      monthlySpend: "$7.3K",
      status: "Active",
      lastSeen: "1 hour ago",
      platform: "Shopify",
    },
    {
      id: 6,
      name: "MajeCats",
      domain: "majescats.de",
      country: "DE",
      category: "Pet Supplies",
      rating: 4.8,
      totalAds: 178,
      activeAds: 32,
      monthlySpend: "$18.9K",
      status: "Active",
      lastSeen: "15 minutes ago",
      platform: "Shopify",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shops</h1>
          <p className="text-muted-foreground mt-2">
            Discover and analyze successful e-commerce stores and their advertising strategies.
          </p>
        </div>
        <Button className="gap-2">
          <Building2 className="h-4 w-4" />
          Add Shop
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shops</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3M</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shops</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8M</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Monthly Spend</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8.4K</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156K</div>
            <p className="text-xs text-muted-foreground">
              High-performing shops
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search shops..." 
              className="pl-10"
            />
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
          <Button variant="outline">Category</Button>
          <Button variant="outline">Platform</Button>
        </div>
      </div>

      {/* Shops Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleShops.map((shop) => (
          <Card key={shop.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{shop.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {shop.country}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {shop.platform}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Globe className="h-3 w-3" />
                  {shop.domain}
                </div>
                
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{shop.rating}</span>
                  <span className="text-xs text-muted-foreground">rating</span>
                </div>

                <div className="text-sm text-muted-foreground">
                  {shop.category}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">{shop.totalAds}</div>
                    <div className="text-xs text-muted-foreground">Total Ads</div>
                  </div>
                  <div>
                    <div className="font-medium">{shop.activeAds}</div>
                    <div className="text-xs text-muted-foreground">Active Ads</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{shop.monthlySpend}</div>
                    <div className="text-xs text-muted-foreground">Monthly Spend</div>
                  </div>
                  <Badge 
                    variant={shop.status === 'Active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {shop.status}
                  </Badge>
                </div>

                <div className="text-xs text-muted-foreground">
                  Last seen: {shop.lastSeen}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          Load More Shops
        </Button>
      </div>
    </div>
  )
}
