export const PUBLIC_PATHNAMES = ['/', '/signup', '/login']
export const AUTH_PATHNAMES = [
  '/dashboard',
  '/profile',
  '/categories',
  '/privacy'
]

export const isPublicPath = (pathname: string) =>
  PUBLIC_PATHNAMES.includes(pathname)
export const isAuthPath = (pathname: string) =>
  AUTH_PATHNAMES.includes(pathname)
