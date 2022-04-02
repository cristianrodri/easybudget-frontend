import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

// Function that will be called in getServerSideProps in PRIVATE pages to verify if the user is logged. If the NO auth user tries to browse private pages, it should be redirected to /login
export const withAuthentication =
  <P, Q extends ParsedUrlQuery = ParsedUrlQuery>(
    getServerSidePropsFn?: GetServerSideProps<P, Q>
  ): GetServerSideProps<P, Q> =>
  async ctx => {
    const token = ctx.req.cookies?.token

    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: '/login'
        }
      }
    }

    // If getServerSidePropsFn function is not provided, return empty props
    if (!getServerSidePropsFn) {
      return {
        props: {} as undefined
      }
    }

    return getServerSidePropsFn(ctx)
  }

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
