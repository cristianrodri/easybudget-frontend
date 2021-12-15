import { NextApiRequest, NextApiResponse } from 'next'
import { serverInstance as axios } from '@config/axios'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ALLOW_METHOD = 'PUT'

  if (req.method === ALLOW_METHOD) {
    try {
      const { data } = await axios.put('/users/me', req.body, {
        headers: {
          Authorization: 'Bearer ' + req.cookies.token
        },
        params: {
          id: req.query.id
        }
      })

      res.status(200).json({ success: true, user: data })
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
    res.setHeader('Allow', [ALLOW_METHOD])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
