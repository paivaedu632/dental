import { Button } from '@/components/ui/button'
import { FileQuestion, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <FileQuestion className="h-8 w-8 text-muted-foreground" />
        </div>
        
        <h1 className="mb-2 text-6xl font-bold tracking-tight text-muted-foreground">
          404
        </h1>
        
        <h2 className="mb-2 text-2xl font-bold tracking-tight">
          Page not found
        </h2>
        
        <p className="mb-6 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for in the DentalFlow dashboard.
        </p>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => window.history.back()} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>
          
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go home
            </Link>
          </Button>
        </div>
        
        <div className="mt-8 text-sm text-muted-foreground">
          <p>Popular pages:</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <Link href="/ads" className="text-primary hover:underline">
              Browse Ads
            </Link>
            <span>•</span>
            <Link href="/appointments" className="text-primary hover:underline">
              Appointments
            </Link>
            <span>•</span>
            <Link href="/competitors" className="text-primary hover:underline">
              Competitors
            </Link>
            <span>•</span>
            <Link href="/settings" className="text-primary hover:underline">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
