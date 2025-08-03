import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Star,
  ArrowRight
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BarChart3 className="size-4" />
            </div>
            <span className="font-semibold text-lg">Dental Analytics</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto mb-8">
          <Badge variant="secondary" className="gap-2 mb-6">
            <Star className="h-4 w-4" />
            Trusted by 2,500+ Dental Practices
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Grow Your Dental Practice with{" "}
            <br className="hidden md:block" />
            <span className="text-primary">Data-Driven Insights</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Join thousands of dental professionals using our analytics platform to generate more appointments,
            increase revenue, and optimize their marketing ROI with transparent, usage-based pricing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button
              size="lg"
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 gap-2"
            >
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-16">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">2,500+</div>
            <div className="text-muted-foreground">Dental Practices</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-primary">$12M+</div>
            <div className="text-muted-foreground">Revenue Generated</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-primary">905%</div>
            <div className="text-muted-foreground">Average ROI</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">4.9/5 Rating</span>
          </div>
        </div>

        {/* A/B Test Navigation - Development Only */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-16 p-6 bg-white/50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">🧪 A/B Test Landing Pages</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" size="sm" asChild>
                <Link href="/landing-v2">High-Converting Version</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/landing-minimal">Minimal Version</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/landing-premium">Premium Version</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/landing-minea-style">Minea-Style Version</Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
