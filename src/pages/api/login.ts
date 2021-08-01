import { NextApiRequest, NextApiResponse } from 'next'
import { serverInstance as axios } from '@config/axios'
import { AxiosError } from 'axios'
import { createCookie } from 'utils/cookie'
import { errorResponse } from './../../utils/error'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { data } = await axios.post('/auth/local', req.body)

      // Set Cookie
      res.setHeader('Set-Cookie', createCookie(data.jwt))

      res.status(200).json({ success: true, user: data.user })
    } catch (error) {
      const err = error as AxiosError

      const { status, message } = errorResponse(
        err,
        err.response?.data.message[0].messages[0].message
      )

      res.status(status).json({
        success: false,
        message
      })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
