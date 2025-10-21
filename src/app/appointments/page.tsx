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
  BarChart3,
  Filter,
  Search,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Eye,
  Edit,
  X,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  CalendarDays,
  Users
} from "lucide-react"

type SortField = 'patientName' | 'appointmentDate' | 'status' | 'provider' | 'duration'
type SortDirection = 'asc' | 'desc'

export default function AppointmentsPage() {
  const [sortField, setSortField] = useState<SortField>('appointmentDate')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [searchTerm, setSearchTerm] = useState('')

  const appointmentData = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      appointmentDate: "2025-08-02",
      appointmentTime: "09:00 AM",
      serviceType: "Routine Cleaning",
      status: "Confirmed",
      provider: "Dr. Susan Miller",
      duration: "60 min",
      phone: "(555) 123-4567",
      email: "sarah.johnson@email.com",
      notes: "Regular checkup and cleaning",
      isNewPatient: false,
    },
    {
      id: 2,
      patientName: "Michael Chen",
      appointmentDate: "2025-08-02",
      appointmentTime: "10:30 AM",
      serviceType: "Root Canal",
      status: "Scheduled",
      provider: "Dr. Robert Davis",
      duration: "90 min",
      phone: "(555) 234-5678",
      email: "michael.chen@email.com",
      notes: "Follow-up for root canal treatment",
      isNewPatient: false,
    },
    {
      id: 3,
      patientName: "Lisa Rodriguez",
      appointmentDate: "2025-08-02",
      appointmentTime: "02:00 PM",
      serviceType: "Teeth Whitening",
      status: "Confirmed",
      provider: "Dr. Susan Miller",
      duration: "45 min",
      phone: "(555) 345-6789",
      email: "lisa.rodriguez@email.com",
      notes: "Cosmetic whitening consultation",
      isNewPatient: true,
    },
    {
      id: 4,
      patientName: "David Wilson",
      appointmentDate: "2025-08-03",
      appointmentTime: "11:00 AM",
      serviceType: "Dental Implant",
      status: "Scheduled",
      provider: "Dr. Robert Davis",
      duration: "120 min",
      phone: "(555) 456-7890",
      email: "david.wilson@email.com",
      notes: "Implant placement procedure",
      isNewPatient: false,
    },
    {
      id: 5,
      patientName: "Emily Brown",
      appointmentDate: "2025-08-03",
      appointmentTime: "03:30 PM",
      serviceType: "Orthodontic Consultation",
      status: "Completed",
      provider: "Dr. Jennifer Lee",
      duration: "30 min",
      phone: "(555) 567-8901",
      email: "emily.brown@email.com",
      notes: "Initial orthodontic evaluation",
      isNewPatient: true,
    },
    {
      id: 6,
      patientName: "James Taylor",
      appointmentDate: "2025-08-04",
      appointmentTime: "10:00 AM",
      serviceType: "Emergency Visit",
      status: "Cancelled",
      provider: "Dr. Susan Miller",
      duration: "30 min",
      phone: "(555) 678-9012",
      email: "james.taylor@email.com",
      notes: "Tooth pain - cancelled by patient",
      isNewPatient: false,
    },
  ]

  // Status color function
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Sorting function
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc') // Default to ascending for dates and names
    }
  }

  // Filter and sort appointments
  const filteredAndSortedAppointments = appointmentData
    .filter(appointment =>
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue: string | number = String(a[sortField as keyof typeof a])
      let bValue: string | number = String(b[sortField as keyof typeof b])

      // Handle date sorting
      if (sortField === 'appointmentDate') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }

      // Handle duration (remove 'min' and convert to number)
      if (sortField === 'duration') {
        aValue = parseInt(String(aValue).replace(' min', ''))
        bValue = parseInt(String(bValue).replace(' min', ''))
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground mt-2">
          Manage and track patient appointments, schedules, and dental treatments.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              2 confirmed, 1 scheduled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              2 new patients
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83%</div>
            <p className="text-xs text-muted-foreground">
              5 of 6 appointments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">62 min</div>
            <p className="text-xs text-muted-foreground">
              Per appointment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button className="gap-2">
          <Calendar className="h-4 w-4" />
          Schedule New
        </Button>
        <Button variant="outline" className="gap-2">
          <CalendarDays className="h-4 w-4" />
          View Calendar
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search appointments..."
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
          <Button variant="outline">Status</Button>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          "All Status",
          "✅ Confirmed",
          "📅 Scheduled",
          "✔️ Completed",
          "❌ Cancelled",
          "🆕 New Patients",
          "🔄 Follow-ups"
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

      {/* Appointments Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('patientName')}
              >
                <div className="flex items-center gap-2">
                  Patient Name
                  <SortIcon field="patientName" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('appointmentDate')}
              >
                <div className="flex items-center gap-2">
                  Date & Time
                  <SortIcon field="appointmentDate" />
                </div>
              </TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-2">
                  Status
                  <SortIcon field="status" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('provider')}
              >
                <div className="flex items-center gap-2">
                  Provider
                  <SortIcon field="provider" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('duration')}
              >
                <div className="flex items-center gap-2">
                  Duration
                  <SortIcon field="duration" />
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{appointment.patientName}</div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.phone}
                      </div>
                      {appointment.isNewPatient && (
                        <Badge variant="outline" className="text-xs mt-1">
                          New Patient
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">
                        {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.appointmentTime}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-muted-foreground" />
                    <span>{appointment.serviceType}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`text-xs ${getStatusColor(appointment.status)}`}
                  >
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{appointment.provider}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{appointment.duration}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    {appointment.status !== "Completed" && appointment.status !== "Cancelled" && (
                      <Button size="sm" variant="outline" className="gap-1 text-red-600 hover:text-red-700">
                        <X className="h-3 w-3" />
                        Cancel
                      </Button>
                    )}
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
          Showing {filteredAndSortedAppointments.length} appointment{filteredAndSortedAppointments.length !== 1 ? 's' : ''}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
        <div className="flex items-center gap-4">
          <span>Confirmed: {filteredAndSortedAppointments.filter(apt => apt.status === 'Confirmed').length}</span>
          <span>New Patients: {filteredAndSortedAppointments.filter(apt => apt.isNewPatient).length}</span>
        </div>
      </div>
    </div>
  )
}
