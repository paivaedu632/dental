import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect old dashboard URLs to new simplified URLs
  if (pathname.startsWith('/dashboard/')) {
    const newPath = pathname.replace('/dashboard', '')
    
    // Handle the dashboard home redirect to ads
    if (newPath === '/') {
      return NextResponse.redirect(new URL('/ads', request.url))
    }
    
    // Redirect other dashboard paths
    return NextResponse.redirect(new URL(newPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*'
  ]
}
