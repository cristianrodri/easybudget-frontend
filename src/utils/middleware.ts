import { GetServerSideProps } from 'next'

// Function that will be called in getServerSideProps in PUBLIC pages to verify if the user is logged. If the auth user tries to browse public pages (such as login or signup), it should be redirected to /dashboard
export const withPublic = (): GetServerSideProps => async ctx => {
  const token = ctx.req.cookies?.token

  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard'
      }
    }
  }

  return {
    props: {}
  }
}

export const PUBLIC_PATHNAMES = ['/', '/signup', '/login']
export const AUTH_PATHNAMES = ['/dashboard', '/profile', '/categories']

export const isPublicPath = (pathname: string) =>
  PUBLIC_PATHNAMES.includes(pathname)
export const isAuthPath = (pathname: string) =>
  AUTH_PATHNAMES.includes(pathname)
