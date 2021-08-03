import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

export const withAuthentication =
  <P, Q extends ParsedUrlQuery = ParsedUrlQuery>(
    getServerSidePropsFn: GetServerSideProps<P, Q>
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

    return getServerSidePropsFn(ctx)
  }

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
