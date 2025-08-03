"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Minus,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Phone,
  PhoneCall
} from "lucide-react"

type SortField = 'name' | 'successScore' | 'revenue' | 'roas' | 'conversionRate' | 'callsHandled'
type SortDirection = 'asc' | 'desc'

export default function CallAgentPage() {
  const [sortField, setSortField] = useState<SortField>('successScore')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const callAgentMetrics = [
    {
      id: 1,
      name: "Dr. Sarah's Dental Assistant",
      agentId: "CA-001",
      category: "New Patient Intake",
      successScore: 95,
      trend: "up",
      trendValue: "+12%",
      revenue: "$45.2K",
      callsHandled: 1247,
      successRate: "94.2%",
      avgCallDuration: "4.2 min",
      conversionRate: "78.5%",
      appointmentsBooked: 978,
      location: "Denver, CO",
      daysActive: 30,
      status: "Active",
      isActive: true,
    },
    {
      id: 2,
      name: "Emergency Dental Hotline",
      agentId: "CA-002",
      category: "Emergency Care",
      successScore: 92,
      trend: "up",
      trendValue: "+8%",
      revenue: "$67.8K",
      callsHandled: 2156,
      successRate: "89.7%",
      avgCallDuration: "6.8 min",
      conversionRate: "85.3%",
      appointmentsBooked: 1839,
      location: "Multiple Locations",
      daysActive: 45,
      status: "Active",
      isActive: true,
    },
    {
      id: 3,
      name: "Cosmetic Consultation Bot",
      agentId: "CA-003",
      category: "Cosmetic Dentistry",
      successScore: 88,
      trend: "up",
      trendValue: "+15%",
      revenue: "$32.4K",
      callsHandled: 892,
      successRate: "91.4%",
      avgCallDuration: "5.1 min",
      conversionRate: "72.8%",
      appointmentsBooked: 649,
      location: "Austin, TX",
      daysActive: 21,
      status: "Active",
      isActive: true,
    },
    {
      id: 4,
      name: "Family Dental Scheduler",
      agentId: "CA-004",
      category: "Family Dentistry",
      successScore: 85,
      trend: "stable",
      trendValue: "0%",
      revenue: "$28.9K",
      callsHandled: 1534,
      successRate: "87.2%",
      avgCallDuration: "3.9 min",
      conversionRate: "69.4%",
      appointmentsBooked: 1065,
      location: "Phoenix, AZ",
      daysActive: 60,
      status: "Active",
      isActive: true,
    },
    {
      id: 5,
      name: "Orthodontic Inquiry Agent",
      agentId: "CA-005",
      category: "Orthodontics",
      successScore: 78,
      trend: "down",
      trendValue: "-5%",
      revenue: "$19.3K",
      callsHandled: 687,
      successRate: "82.1%",
      avgCallDuration: "7.2 min",
      conversionRate: "65.8%",
      appointmentsBooked: 452,
      location: "Miami, FL",
      daysActive: 35,
      status: "Inactive",
      isActive: false,
    },
    {
      id: 6,
      name: "Preventive Care Assistant",
      agentId: "CA-006",
      category: "Preventive Care",
      successScore: 82,
      trend: "up",
      trendValue: "+6%",
      revenue: "$15.7K",
      callsHandled: 923,
      successRate: "90.3%",
      avgCallDuration: "3.2 min",
      conversionRate: "74.1%",
      appointmentsBooked: 684,
      location: "Seattle, WA",
      daysActive: 28,
      status: "Active",
      isActive: true,
    },
  ]

  // Sorting function
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc') // Default to descending for metrics
    }
  }

  // Filter and sort call agents
  const filteredAndSortedAgents = callAgentMetrics
    .filter(agent =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.agentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue: string | number = String(a[sortField as keyof typeof a])
      let bValue: string | number = String(b[sortField as keyof typeof b])

      // Handle numeric values
      if (sortField === 'successScore' || sortField === 'callsHandled') {
        aValue = Number(aValue)
        bValue = Number(bValue)
      }

      // Handle conversion rate (remove % and convert to number)
      if (sortField === 'conversionRate') {
        aValue = parseFloat(String(aValue).replace('%', ''))
        bValue = parseFloat(String(bValue).replace('%', ''))
      }

      // Handle revenue (remove $ and K, convert to number)
      if (sortField === 'revenue') {
        aValue = parseFloat(String(aValue).replace('$', '').replace('K', '')) * 1000
        bValue = parseFloat(String(bValue).replace('$', '').replace('K', '')) * 1000
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
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "Training":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Call Agent</h1>
        <p className="text-muted-foreground mt-2">
          AI-powered call agents to handle patient inquiries, book appointments, and optimize dental practice operations.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.2%</div>
            <p className="text-xs text-muted-foreground">
              +3.2% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls Handled</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7,439</div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Booked</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,667</div>
            <p className="text-xs text-muted-foreground">
              +18% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              1 inactive agent
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
              placeholder="Search call agents..."
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
            Time Range
          </Button>
          <Button variant="outline">Status</Button>
          <Button variant="outline">Category</Button>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex gap-2">
        <Button className="gap-2">
          <PhoneCall className="h-4 w-4" />
          Configure Agent
        </Button>
      </div>

      {/* Call Agents Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Agent Name
                  <SortIcon field="name" />
                </div>
              </TableHead>
              <TableHead>Agent ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('successScore')}
              >
                <div className="flex items-center gap-2">
                  Success Score
                  <SortIcon field="successScore" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('callsHandled')}
              >
                <div className="flex items-center gap-2">
                  Calls Handled
                  <SortIcon field="callsHandled" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('conversionRate')}
              >
                <div className="flex items-center gap-2">
                  Conversion Rate
                  <SortIcon field="conversionRate" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('revenue')}
              >
                <div className="flex items-center gap-2">
                  Revenue Generated
                  <SortIcon field="revenue" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedAgents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      <PhoneCall className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{agent.name}</div>
                      <div className="text-sm text-muted-foreground">{agent.location}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {agent.agentId}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{agent.category}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{agent.successScore}</div>
                    {getTrendIcon(agent.trend)}
                    <span className={`text-xs ${
                      agent.trend === 'up' ? 'text-green-600' :
                      agent.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {agent.trendValue}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{agent.callsHandled.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">
                    {agent.avgCallDuration} avg
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{agent.conversionRate}</div>
                  <div className="text-xs text-muted-foreground">
                    {agent.appointmentsBooked} appointments
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{agent.revenue}</div>
                  <div className="text-xs text-muted-foreground">
                    {agent.daysActive} days active
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={agent.isActive ? 'default' : 'secondary'}
                    className={`text-xs ${getStatusColor(agent.status)}`}
                  >
                    {agent.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <BarChart3 className="h-3 w-3" />
                      Analytics
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
          Showing {filteredAndSortedAgents.length} call agent{filteredAndSortedAgents.length !== 1 ? 's' : ''}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
        <div className="flex items-center gap-4">
          <span>Total Calls: {filteredAndSortedAgents.reduce((sum, agent) => sum + agent.callsHandled, 0).toLocaleString()}</span>
          <span>Total Appointments: {filteredAndSortedAgents.reduce((sum, agent) => sum + agent.appointmentsBooked, 0).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
