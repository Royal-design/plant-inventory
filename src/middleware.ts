import { Session } from 'next-auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { Role } from './types/customType'

interface AuthenticatedRequest extends NextRequest {
  auth: Session | null
}

export default auth((req: AuthenticatedRequest) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role as Role

  const isAuthRoute =
    nextUrl.pathname.startsWith('/sign-in') ||
    nextUrl.pathname.startsWith('/sign-up') ||
    nextUrl.pathname.startsWith('/auth')

  const isProtectedRoute =
    nextUrl.pathname.startsWith('/dashboard') ||
    nextUrl.pathname.startsWith('/profile') ||
    nextUrl.pathname.startsWith('/settings')

  const isAdminRoute = nextUrl.pathname.startsWith('/admin')
  const isUserDashboard = nextUrl.pathname.startsWith('/dashboard')

  // Redirect logged-in user from auth pages
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL('/', nextUrl))
  }

  // Redirect unauthenticated users from protected pages
  if (!isLoggedIn && (isProtectedRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL('/sign-in', nextUrl))
  }

  if (isAdminRoute && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/forbidden', nextUrl))
  }
  if (isUserDashboard && userRole !== 'USER') {
    return NextResponse.redirect(new URL('/forbidden', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}
