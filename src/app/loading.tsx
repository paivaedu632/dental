import { Loader2, BarChart3 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <BarChart3 className="h-6 w-6" />
        </div>
        
        <div className="mb-4 flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-lg font-medium">Loading DentalFlow...</span>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Please wait while we prepare your dashboard
        </p>
      </div>
    </div>
  )
}
