import cookie from 'cookie'

export const createCookie = (jwt: string) =>
  cookie.serialize('token', jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 6, // 6 hours
    sameSite: 'strict',
    path: '/'
  })
