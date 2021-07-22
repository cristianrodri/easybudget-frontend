import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { axiosInstance as axios } from '@config/axios'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { data, status } = await axios.post('/auth/local/register', req.body)

    if (status === 200) {
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

      res.status(200).json({ success: true, user: data.user })
    } else {
      res
        .status(data.statusCode)
        .json({ success: false, message: data.message[0].messages[0].message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
