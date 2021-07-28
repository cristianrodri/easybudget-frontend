import { NextApiRequest, NextApiResponse } from 'next'
import { serverInstance as axios } from '@config/axios'
import { AxiosError } from 'axios'
import { createCookie } from 'utils/cookie'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { data } = await axios.post('/auth/local/register', req.body)

      // Set Cookie
      res.setHeader('Set-Cookie', createCookie(data.jwt))

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
