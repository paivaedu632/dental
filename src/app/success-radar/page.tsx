import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Target,
  Filter,
  Search,
  Calendar,
  TrendingUp,
  Zap,
  BarChart3,
  DollarSign,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react"

export default function SuccessRadarPage() {
  const successMetrics = [
    {
      id: 1,
      name: "Saladcode Beauty Serum",
      shop: "Saladcode Beauty",
      category: "Beauty & Cosmetics",
      successScore: 95,
      trend: "up",
      trendValue: "+12%",
      revenue: "$45.2K",
      adSpend: "$8.3K",
      roas: "5.4x",
      conversionRate: "3.8%",
      ctr: "2.1%",
      country: "ES",
      daysTracked: 30,
      status: "Hot",
    },
    {
      id: 2,
      name: "Premium Cat Litter",
      shop: "MajeCats",
      category: "Pet Supplies",
      successScore: 92,
      trend: "up",
      trendValue: "+8%",
      revenue: "$67.8K",
      adSpend: "$12.1K",
      roas: "5.6x",
      conversionRate: "4.2%",
      ctr: "1.9%",
      country: "DE",
      daysTracked: 45,
      status: "Rising",
    },
    {
      id: 3,
      name: "Summer Fashion Dress",
      shop: "Taaima Fashion",
      category: "Fashion & Apparel",
      successScore: 88,
      trend: "up",
      trendValue: "+15%",
      revenue: "$32.4K",
      adSpend: "$7.2K",
      roas: "4.5x",
      conversionRate: "2.9%",
      ctr: "2.3%",
      country: "IT",
      daysTracked: 21,
      status: "Hot",
    },
    {
      id: 4,
      name: "Organic Coffee Blend",
      shop: "Kitty Town Coffee",
      category: "Food & Beverage",
      successScore: 85,
      trend: "stable",
      trendValue: "0%",
      revenue: "$28.9K",
      adSpend: "$6.8K",
      roas: "4.3x",
      conversionRate: "3.1%",
      ctr: "1.8%",
      country: "US",
      daysTracked: 60,
      status: "Stable",
    },
    {
      id: 5,
      name: "Waterproof Phone Case",
      shop: "HydroShield Pro",
      category: "Electronics",
      successScore: 78,
      trend: "down",
      trendValue: "-5%",
      revenue: "$19.3K",
      adSpend: "$5.4K",
      roas: "3.6x",
      conversionRate: "2.4%",
      ctr: "1.6%",
      country: "US",
      daysTracked: 35,
      status: "Declining",
    },
    {
      id: 6,
      name: "Wooden Puzzle Cube",
      shop: "PepPlay Games",
      category: "Games & Toys",
      successScore: 82,
      trend: "up",
      trendValue: "+6%",
      revenue: "$15.7K",
      adSpend: "$4.2K",
      roas: "3.7x",
      conversionRate: "2.8%",
      ctr: "2.0%",
      country: "IN",
      daysTracked: 28,
      status: "Rising",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-3 w-3 text-green-600" />
      case "down":
        return <ArrowDown className="h-3 w-3 text-red-600" />
      default:
        return <Minus className="h-3 w-3 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot":
        return "bg-red-100 text-red-800"
      case "Rising":
        return "bg-green-100 text-green-800"
      case "Stable":
        return "bg-blue-100 text-blue-800"
      case "Declining":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Success Radar</h1>
          <p className="text-muted-foreground mt-2">
            Track and analyze the performance of successful products and campaigns in real-time.
          </p>
        </div>
        <Button className="gap-2">
          <Target className="h-4 w-4" />
          Add to Radar
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.2</div>
            <p className="text-xs text-muted-foreground">
              +3.2% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. ROAS</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7x</div>
            <p className="text-xs text-muted-foreground">
              +0.3x from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$209K</div>
            <p className="text-xs text-muted-foreground">
              +18% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hot Products</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              +5 from last week
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
              placeholder="Search products on radar..." 
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
            Time Range
          </Button>
          <Button variant="outline">Status</Button>
          <Button variant="outline">Category</Button>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          "All Status",
          "🔥 Hot",
          "📈 Rising", 
          "📊 Stable",
          "📉 Declining"
        ].map((status) => (
          <Button 
            key={status} 
            variant={status === "All Status" ? "default" : "outline"} 
            className="whitespace-nowrap"
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Success Radar Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {successMetrics.map((item) => (
          <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base line-clamp-2">{item.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {item.country}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{item.successScore}</div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  {item.category} • {item.shop}
                </div>
                
                <div className="flex items-center gap-2">
                  {getTrendIcon(item.trend)}
                  <span className={`text-sm font-medium ${
                    item.trend === 'up' ? 'text-green-600' : 
                    item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {item.trendValue}
                  </span>
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">{item.revenue}</div>
                    <div className="text-xs text-muted-foreground">Revenue</div>
                  </div>
                  <div>
                    <div className="font-medium">{item.roas}</div>
                    <div className="text-xs text-muted-foreground">ROAS</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">{item.conversionRate}</div>
                    <div className="text-xs text-muted-foreground">Conv. Rate</div>
                  </div>
                  <div>
                    <div className="font-medium">{item.ctr}</div>
                    <div className="text-xs text-muted-foreground">CTR</div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Tracked for {item.daysTracked} days
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button size="sm" className="flex-1 gap-2">
                    <Eye className="h-3 w-3" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <BarChart3 className="h-3 w-3" />
                    Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          Load More Results
        </Button>
      </div>
    </div>
  )
}
