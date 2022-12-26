import { IncomingMessage } from 'http'
import jwt from 'jsonwebtoken'

type TokenResponse = {
  _id: string
}

export const getUserId = (
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string
    }>
  }
) => {
  const token = jwt.verify(
    req.cookies.token,
    process.env.JWT_KEY
  ) as TokenResponse

  return token._id
}
