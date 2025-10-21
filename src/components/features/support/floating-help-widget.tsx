"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  HelpCircle,
  MessageCircle,
  X,
  Book,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Search,
  Clock,
  CheckCircle
} from "lucide-react"

import type { FloatingHelpWidgetProps } from '@/types/support'

export function FloatingHelpWidget({ className }: FloatingHelpWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeView, setActiveView] = useState<"main" | "chat" | "articles">("main")

  const quickActions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help",
      action: () => setActiveView("chat"),
      available: true
    },
    {
      icon: Book,
      title: "Help Articles",
      description: "Browse documentation",
      action: () => setActiveView("articles"),
      available: true
    },
    {
      icon: Phone,
      title: "Call Support",
      description: "1-800-DENTAL-1",
      action: () => window.open("tel:1-800-336-8251"),
      available: true
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send detailed message",
      action: () => window.open("mailto:support@dentalflow.com"),
      available: true
    }
  ]

  const popularArticles = [
    {
      title: "Getting Started Guide",
      category: "Setup",
      readTime: "5 min"
    },
    {
      title: "Understanding Billing",
      category: "Billing",
      readTime: "3 min"
    },
    {
      title: "Managing Appointments",
      category: "Features",
      readTime: "4 min"
    },
    {
      title: "Troubleshooting Issues",
      category: "Support",
      readTime: "6 min"
    }
  ]

  const renderMainView = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-semibold mb-1">How can we help?</h3>
        <p className="text-sm text-muted-foreground">
          Choose an option below to get started
        </p>
      </div>

      <div className="space-y-2">
        {quickActions.map((action, index) => {
          const Icon = action.icon
          return (
            <button
              key={index}
              onClick={action.action}
              className="w-full flex items-center gap-3 p-3 text-left rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <Icon className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          )
        })}
      </div>

      <div className="pt-2 border-t">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Support hours: Mon-Fri 8AM-8PM EST</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-green-600 mt-1">
          <CheckCircle className="h-3 w-3" />
          <span>Currently online</span>
        </div>
      </div>
    </div>
  )

  const renderChatView = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveView("main")}
          className="text-muted-foreground hover:text-foreground"
        >
          ←
        </button>
        <h3 className="font-semibold">Live Chat</h3>
        <Badge variant="secondary" className="ml-auto">Online</Badge>
      </div>

      <div className="space-y-3">
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm">
            👋 Hi! I'm here to help. What can I assist you with today?
          </p>
          <p className="text-xs text-muted-foreground mt-1">Support Agent • Just now</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Quick responses:</p>
        <div className="space-y-1">
          {[
            "I need help with billing",
            "Technical issue",
            "General question",
            "Account settings"
          ].map((response, index) => (
            <button
              key={index}
              className="w-full text-left p-2 text-sm border rounded hover:bg-muted/50 transition-colors"
            >
              {response}
            </button>
          ))}
        </div>
      </div>

      <Button className="w-full gap-2" asChild>
        <a href="/contact">
          <MessageCircle className="h-4 w-4" />
          Start Chat
        </a>
      </Button>
    </div>
  )

  const renderArticlesView = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveView("main")}
          className="text-muted-foreground hover:text-foreground"
        >
          ←
        </button>
        <h3 className="font-semibold">Help Articles</h3>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full pl-10 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Popular articles:</p>
        <div className="space-y-1">
          {popularArticles.map((article, index) => (
            <button
              key={index}
              className="w-full text-left p-2 border rounded hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{article.title}</p>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {article.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{article.readTime}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full gap-2" asChild>
        <a href="/support">
          <Book className="h-4 w-4" />
          View All Articles
        </a>
      </Button>
    </div>
  )

  const renderContent = () => {
    switch (activeView) {
      case "chat":
        return renderChatView()
      case "articles":
        return renderArticlesView()
      default:
        return renderMainView()
    }
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Help Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Help Widget */}
      {isOpen && (
        <Card className="w-80 shadow-xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Help & Support</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false)
                  setActiveView("main")
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {renderContent()}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
