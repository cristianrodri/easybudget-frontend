// middleware.ts
import {
  AUTH_PATHNAMES,
  isAuthPath,
  isPublicPath,
  PUBLIC_PATHNAMES
} from '@utils/middleware'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl

  // If the pathname is PRIVATE and there is no token in the cookies, redirect to login
  if (isAuthPath(pathname) && !request.cookies.has('token')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'

    return NextResponse.redirect(url)
  }

  // If the pathname is PUBLIC and there is token in the cookies, redirect to dashboard
  if (isPublicPath(pathname) && request.cookies.has('token')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'

    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/api/:path*', ...PUBLIC_PATHNAMES, ...AUTH_PATHNAMES]
}
