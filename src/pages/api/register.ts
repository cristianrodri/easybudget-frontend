import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { serverInstance as axios } from '@config/axios'
import { AxiosError } from 'axios'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { data } = await axios.post('/auth/local/register', req.body)

      // Set Cookie
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 6, // 6 hours
          sameSite: 'strict',
          path: '/'
        })
      )

      res.status(201).json({ success: true, user: data.user })
    } catch (error) {
      const err = error as AxiosError
      res.json({
        success: false,
        message: err.response.data.message[0].messages[0].message
      })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
