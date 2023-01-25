// middleware.ts
import { isAuthPath, isPublicPath } from '@utils/middleware'
import { NextRequest, NextResponse } from 'next/server'

enum Middleware {
  KEY = 'x-middleware-cache',
  VALUE = 'no-cache'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If the pathname belongs to PRIVATE and there is NO token in the cookies, redirect to login (public page)
  if (isAuthPath(pathname) && !request.cookies.has('token')) {
    request.nextUrl.pathname = '/login'

    const response = NextResponse.redirect(request.nextUrl)
    response.headers.set(Middleware.KEY, Middleware.VALUE)
    return response
  }

  // If the pathname belongs to PUBLIC and there IS token in the cookies, redirect to dashboard (private page)
  if (isPublicPath(pathname) && request.cookies.has('token')) {
    request.nextUrl.pathname = '/dashboard'

    const response = NextResponse.redirect(request.nextUrl)
    response.headers.set(Middleware.KEY, Middleware.VALUE)
    return response
  }

  const response = NextResponse.next()
  response.headers.set(Middleware.KEY, Middleware.VALUE)
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     */
    '/((?!api|_next/static|_next/image).*)'
  ]
}
