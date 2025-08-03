'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        
        <h1 className="mb-2 text-2xl font-bold tracking-tight">
          Something went wrong!
        </h1>
        
        <p className="mb-6 text-muted-foreground">
          We apologize for the inconvenience. An unexpected error has occurred in the DentalFlow dashboard.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 rounded-lg bg-muted p-4 text-left">
            <h3 className="mb-2 font-semibold text-sm">Error Details:</h3>
            <p className="text-xs font-mono text-muted-foreground break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="mt-2 text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}
        
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go home
            </Link>
          </Button>
        </div>
        
        <p className="mt-6 text-xs text-muted-foreground">
          If this problem persists, please contact our support team.
        </p>
      </div>
    </div>
  )
}
