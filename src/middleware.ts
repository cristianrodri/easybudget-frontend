// middleware.ts
import { AUTH_PATHNAMES, isAuthPath, PUBLIC_PATHNAMES } from '@utils/middleware'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  if (isAuthPath(request.nextUrl.pathname) && !request.cookies.has('token')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'

    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/api/:path*', ...PUBLIC_PATHNAMES, ...AUTH_PATHNAMES]
}
