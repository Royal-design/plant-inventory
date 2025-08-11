// middleware.ts
import { Session } from 'next-auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'

interface AuthenticatedRequest extends NextRequest {
  auth: Session | null
}

export default auth((req: AuthenticatedRequest) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isAuthRoute =
    nextUrl.pathname.startsWith('/sign-in') ||
    nextUrl.pathname.startsWith('/sign-up') ||
    nextUrl.pathname.startsWith('/auth')

  const isProtectedRoute =
    nextUrl.pathname.startsWith('/dashboard') ||
    nextUrl.pathname.startsWith('/profile') ||
    nextUrl.pathname.startsWith('/settings')

  // const isPublicRoute =
  //   nextUrl.pathname === '/' ||
  //   nextUrl.pathname.startsWith('/about') ||
  //   nextUrl.pathname.startsWith('/contact')

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL('/', nextUrl))
  }

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL('/sign-in', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}
