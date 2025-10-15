import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/welcome']
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Protected routes that require authentication
  const protectedRoutes = ['/', '/modul', '/lekcija']
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  // For protected routes, redirect to login if not authenticated
  // This will be handled by the client-side auth check
  if (isProtectedRoute) {
    // Let the client handle the auth check
    return NextResponse.next()
  }

  // For public routes, allow access
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Default: allow access
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
