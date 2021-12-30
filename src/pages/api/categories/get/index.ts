import { NextApiRequest, NextApiResponse } from 'next'
import { serverInstance as axios } from '@config/axios'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { data } = await axios.get('/categories', {
        headers: {
          Authorization: 'Bearer ' + req.cookies.token
        }
      })

      res.status(200).json({ success: true, categories: data })
    } catch (error) {
      const err = error as AxiosError

      console.log(err.response)

      const { status, message } = errorResponse(err, err.response?.data.error)

      res.status(status).json({
        success: false,
        message
      })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
