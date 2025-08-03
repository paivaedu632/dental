"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  HelpCircle,
  MessageCircle,
  Headphones,
  Book,
  Video,
  FileText,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  ExternalLink,
  Search,
  ArrowRight,
  Users,
  Zap,
  Shield,
  TrendingUp
} from "lucide-react"

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const supportCategories = [
    { id: "all", label: "All Topics", icon: HelpCircle },
    { id: "getting-started", label: "Getting Started", icon: Zap },
    { id: "billing", label: "Billing & Pricing", icon: TrendingUp },
    { id: "appointments", label: "Appointments", icon: Users },
    { id: "technical", label: "Technical Issues", icon: Shield }
  ]

  const helpArticles = [
    {
      id: 1,
      title: "Getting Started with Dental Analytics",
      category: "getting-started",
      description: "Learn how to set up your practice and start generating appointments",
      readTime: "5 min read",
      popular: true
    },
    {
      id: 2,
      title: "Understanding Usage-Based Pricing",
      category: "billing",
      description: "How our pricing model works and calculating your ROI",
      readTime: "3 min read",
      popular: true
    },
    {
      id: 3,
      title: "Managing Patient Appointments",
      category: "appointments",
      description: "Best practices for appointment scheduling and management",
      readTime: "4 min read",
      popular: false
    },
    {
      id: 4,
      title: "Troubleshooting Common Issues",
      category: "technical",
      description: "Solutions to frequently encountered technical problems",
      readTime: "6 min read",
      popular: false
    },
    {
      id: 5,
      title: "Setting Up Your Practice Profile",
      category: "getting-started",
      description: "Complete guide to configuring your dental practice information",
      readTime: "4 min read",
      popular: true
    },
    {
      id: 6,
      title: "Billing History and Invoices",
      category: "billing",
      description: "How to access and understand your billing statements",
      readTime: "3 min read",
      popular: false
    }
  ]

  const filteredArticles = helpArticles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get the help you need to maximize your dental practice's success with our analytics platform.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get instant help from our support team
            </p>
            <Button className="w-full" asChild>
              <a href="/contact">Start Chat</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Send us a detailed message
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="/contact">Send Email</a>
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Speak directly with our team
            </p>
            <Button variant="outline" className="w-full">Call Now</Button>
          </CardContent>
        </Card>
      </div>

      {/* Support Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Support Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Live Chat & Phone</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 8:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 5:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Email Support</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Response Time</span>
                  <span>Within 2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Available</span>
                  <span>24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Currently Online</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Articles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Help Articles
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {supportCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {category.label}
                  </Button>
                )
              })}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{article.title}</h4>
                    {article.popular && (
                      <Badge variant="secondary" className="text-xs">Popular</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{article.description}</p>
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Video Tutorials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Video Tutorials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                <Video className="h-8 w-8 text-muted-foreground" />
              </div>
              <h4 className="font-medium mb-1">Platform Overview</h4>
              <p className="text-sm text-muted-foreground">5:30 min</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                <Video className="h-8 w-8 text-muted-foreground" />
              </div>
              <h4 className="font-medium mb-1">Setting Up Your Practice</h4>
              <p className="text-sm text-muted-foreground">8:15 min</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">support@dentalanalytics.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">1-800-DENTAL-1</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ExternalLink className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Documentation</p>
                  <p className="text-sm text-muted-foreground">docs.dentalanalytics.com</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Emergency Support</h4>
              <p className="text-sm text-muted-foreground">
                For critical issues affecting your practice operations, call our emergency line:
              </p>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-600">1-800-URGENT-1</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Available 24/7 for billing system outages and critical technical issues
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
