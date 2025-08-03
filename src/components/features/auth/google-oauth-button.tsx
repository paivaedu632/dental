"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"

interface GoogleOAuthButtonProps {
  mode?: "signin" | "signup"
  onSuccess?: (user: any) => void
  onError?: (error: string) => void
  disabled?: boolean
  className?: string
}

export function GoogleOAuthButton({ 
  mode = "signup", 
  onSuccess, 
  onError, 
  disabled = false,
  className 
}: GoogleOAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    
    try {
      // In a real implementation, this would integrate with Google OAuth
      // For now, we'll simulate the OAuth flow
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful response
      const mockUser = {
        id: "google_123456789",
        email: "user@example.com",
        name: "Dr. Sarah Johnson",
        picture: "https://via.placeholder.com/150",
        provider: "google"
      }
      
      // In a real app, you would:
      // 1. Open Google OAuth popup/redirect
      // 2. Handle the OAuth callback
      // 3. Exchange code for tokens
      // 4. Get user info from Google
      // 5. Create/update user in your database
      // 6. Set authentication state
      
      if (onSuccess) {
        onSuccess(mockUser)
      } else {
        // Default behavior - redirect to onboarding
        window.location.href = "/onboarding"
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Authentication failed"
      
      if (onError) {
        onError(errorMessage)
      } else {
        console.error("Google OAuth error:", errorMessage)
        // You might want to show a toast notification here
      }
    } finally {
      setIsLoading(false)
    }
  }

  const buttonText = mode === "signin" 
    ? "Continue with Google" 
    : "Sign up with Google"

  return (
    <Button
      onClick={handleGoogleAuth}
      disabled={disabled || isLoading}
      variant="outline"
      className={`w-full h-12 gap-3 ${className}`}
    >
      {isLoading ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
          {mode === "signin" ? "Signing in..." : "Creating account..."}
        </>
      ) : (
        <>
          <Chrome className="h-5 w-5" />
          {buttonText}
        </>
      )}
    </Button>
  )
}

// Hook for Google OAuth integration
export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState<string | null>(null)

  const signInWithGoogle = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Real implementation would use Google OAuth SDK
      // Example with Google Identity Services:
      /*
      const response = await google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: 'email profile',
        callback: (tokenResponse) => {
          // Handle the token response
          fetchUserProfile(tokenResponse.access_token)
        }
      }).requestAccessToken()
      */

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 2000))

      const mockUser = {
        id: "google_123456789",
        email: "user@example.com",
        name: "Dr. Sarah Johnson",
        picture: "https://via.placeholder.com/150",
        provider: "google"
      }

      setUser(mockUser)
      return mockUser

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Authentication failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    setError(null)
    // In real implementation, also sign out from Google
    // google.accounts.id.disableAutoSelect()
  }

  return {
    user,
    isLoading,
    error,
    signInWithGoogle,
    signOut
  }
}

// Configuration for Google OAuth
export const googleOAuthConfig = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
  redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback/google`,
  scopes: ["email", "profile"],

  // Real implementation would include these settings
  settings: {
    auto_select: false,
    cancel_on_tap_outside: true,
    context: "signup" as const,
    itp_support: true,
    use_fedcm_for_prompt: true
  }
}

// Utility function to load Google OAuth script
export const loadGoogleOAuthScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Google OAuth can only be loaded in browser environment"))
      return
    }

    // Check if already loaded
    if (window.google?.accounts) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true

    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load Google OAuth script"))

    document.head.appendChild(script)
  })
}

// Type definitions for Google OAuth
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          prompt: () => void
          disableAutoSelect: () => void
          renderButton: (element: HTMLElement, config: any) => void
        }
        oauth2: {
          initTokenClient: (config: any) => {
            requestAccessToken: () => void
          }
        }
      }
    }
  }
}
