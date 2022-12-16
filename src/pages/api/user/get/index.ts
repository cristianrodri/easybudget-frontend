import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'

export default (req: NextApiRequest, res: NextApiResponse) =>
  api.get(req, res, async () => {
    try {
      res.status(200).json(jsonResponseSuccess({ cookies: req.cookies }))
    } catch (error) {
      const err = error as AxiosError

      const { status, message } = errorResponse(err, err.response?.data.error)

      res.status(status).json(jsonResponseError(message))
    }
  })
