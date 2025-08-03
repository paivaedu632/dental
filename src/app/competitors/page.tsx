"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { competitorsData } from "@/data"
import {
  Building2,
  Filter,
  Search,
  Calendar,
  TrendingUp,
  Star,
  ExternalLink,
  MapPin,
  ArrowUpDown,
  ChevronUp,
  ChevronDown
} from "lucide-react"

type SortField = 'name' | 'rating' | 'monthlyLeads' | 'monthlyRevenue' | 'marketRank' | 'healthScore'
type SortDirection = 'asc' | 'desc'

export default function CompetitorsPage() {
  const [sortField, setSortField] = useState<SortField>('marketRank')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [searchTerm, setSearchTerm] = useState('')

  // Transform the competitor JSON data into the format expected by the UI
  const transformCompetitorData = () => {
    const data = competitorsData

    // Format numbers for display
    const formatNumber = (num: number) => {
      if (!num || isNaN(num)) return '0'
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
      }
      return num.toString()
    }

    // Handle both single object and array formats
    const dataArray = Array.isArray(data) ? data : [data]

    return dataArray.map((competitor: any, index: number) => ({
      id: competitor.business_id || `competitor-${index}`,
      name: competitor.business_info?.name || 'Unknown Practice',
      location: `${competitor.business_info?.location?.city || 'Unknown'}, ${competitor.business_info?.location?.neighborhood || ''}`.trim().replace(/,$/, ''),
      rating: competitor.raw_gmb_metrics?.reputation?.average_rating || 0,
      reviewCount: competitor.raw_gmb_metrics?.reputation?.total_reviews || 0,
      monthlyLeads: formatNumber(competitor.raw_gmb_metrics?.engagement?.phone_calls_30d || 0),
      monthlyRevenue: `$${formatNumber((competitor.raw_gmb_metrics?.engagement?.phone_calls_30d || 0) * 150)}`, // Estimated revenue
      marketRank: index + 1, // Simple ranking based on position
      healthScore: Math.round((competitor.raw_gmb_metrics?.reputation?.average_rating || 0) * 20), // Convert rating to percentage
      website: competitor.business_info?.contact?.website || '',
      specialties: [competitor.business_info?.category || 'dentist'],
      isVerified: true, // Assume verified if we have data
      trend: 'stable',
      trendValue: '0%'
    }))
  }

  const competitors = transformCompetitorData()

  // Sorting function
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection(field === 'marketRank' ? 'asc' : 'desc')
    }
  }

  // Filter and sort competitors
  const filteredAndSortedCompetitors = competitors
    .filter(competitor => 
      competitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      competitor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      competitor.specialties.some((specialty: string) => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      let aValue: string | number = a[sortField as keyof typeof a]
      let bValue: string | number = b[sortField as keyof typeof b]
      
      // Handle numeric values
      if (sortField === 'rating' || sortField === 'marketRank' || sortField === 'healthScore') {
        aValue = Number(aValue)
        bValue = Number(bValue)
      }
      
      // Handle formatted numbers (remove K, M, $)
      if (sortField === 'monthlyLeads') {
        aValue = parseFloat(String(aValue).replace(/[KM$]/g, '')) * (String(aValue).includes('M') ? 1000000 : String(aValue).includes('K') ? 1000 : 1)
        bValue = parseFloat(String(bValue).replace(/[KM$]/g, '')) * (String(bValue).includes('M') ? 1000000 : String(bValue).includes('K') ? 1000 : 1)
      }
      
      if (sortField === 'monthlyRevenue') {
        aValue = parseFloat(String(aValue).replace(/[$KM]/g, '')) * (String(aValue).includes('M') ? 1000000 : String(aValue).includes('K') ? 1000 : 1)
        bValue = parseFloat(String(bValue).replace(/[$KM]/g, '')) * (String(bValue).includes('M') ? 1000000 : String(bValue).includes('K') ? 1000 : 1)
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

  // Sort icon component
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4" />
      : <ChevronDown className="h-4 w-4" />
  }

  // Get health score color
  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  // Get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-600" />
      case 'down':
        return <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />
      default:
        return <div className="h-3 w-3 bg-gray-400 rounded-full" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Competitors</h1>
        <p className="text-muted-foreground mt-2">
          Monitor and analyze your dental practice competitors to stay ahead in the market.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search competitors..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          <Button variant="outline">Location</Button>
        </div>
      </div>

      {/* Competitors Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Practice Name
                  <SortIcon field="name" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('rating')}
              >
                <div className="flex items-center gap-2">
                  Rating
                  <SortIcon field="rating" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('monthlyLeads')}
              >
                <div className="flex items-center gap-2">
                  Monthly Leads
                  <SortIcon field="monthlyLeads" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('monthlyRevenue')}
              >
                <div className="flex items-center gap-2">
                  Monthly Revenue
                  <SortIcon field="monthlyRevenue" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('marketRank')}
              >
                <div className="flex items-center gap-2">
                  Market Rank
                  <SortIcon field="marketRank" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('healthScore')}
              >
                <div className="flex items-center gap-2">
                  Health Score
                  <SortIcon field="healthScore" />
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedCompetitors.map((competitor) => (
              <TableRow key={competitor.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{competitor.name}</span>
                        {competitor.isVerified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {competitor.location}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{competitor.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({competitor.reviewCount})
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{competitor.monthlyLeads}</span>
                    {getTrendIcon(competitor.trend)}
                    <span className={`text-xs ${
                      competitor.trend === 'up' ? 'text-green-600' : 
                      competitor.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {competitor.trendValue}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{competitor.monthlyRevenue}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    #{competitor.marketRank}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={`text-xs ${getHealthScoreColor(competitor.healthScore)}`}>
                    {competitor.healthScore}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Visit
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Analyze
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Table Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Showing {filteredAndSortedCompetitors.length} competitor{filteredAndSortedCompetitors.length !== 1 ? 's' : ''}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
        <div className="flex items-center gap-4">
          <span>Avg. Rating: {(filteredAndSortedCompetitors.reduce((sum, comp) => sum + comp.rating, 0) / filteredAndSortedCompetitors.length).toFixed(1)}</span>
          <span>Top Rank: #{Math.min(...filteredAndSortedCompetitors.map(comp => comp.marketRank))}</span>
        </div>
      </div>
    </div>
  )
}
