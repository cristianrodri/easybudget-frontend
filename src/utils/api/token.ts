import jwt from 'jsonwebtoken'
import { NextApiRequest } from 'next'

type TokenResponse = {
  _id: string
}

export const decodeToken = (req: NextApiRequest) =>
  jwt.verify(req.cookies.token, process.env.JWT_KEY) as TokenResponse
