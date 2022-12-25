import jwt from 'jsonwebtoken'
import { NextApiRequest } from 'next'

type TokenResponse = {
  _id: string
}

export const getUserId = (req: NextApiRequest) => {
  const token = jwt.verify(
    req.cookies.token,
    process.env.JWT_KEY
  ) as TokenResponse

  return token._id
}
