import { NextApiRequest, NextApiResponse } from 'next'
import { serverInstance as axios } from '@config/axios'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    try {
      const { data } = await axios.delete(`/categories/${req.query.id}`, {
        headers: {
          Authorization: 'Bearer ' + req.cookies.token
        }
      })

      res.status(200).json({ success: true, user: data })
    } catch (error) {
      const err = error as AxiosError

      const { status, message } = errorResponse(err, err.response?.data.message)

      res.status(status).json({
        success: false,
        message
      })
    }
  } else {
    res.setHeader('Allow', ['DELETE'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}