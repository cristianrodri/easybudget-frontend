import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'
import { ApiResponse, Budget } from '@custom-types'
import { Status } from '@utils/enums'
import {
  jsonResponseError,
  jsonResponseSuccess,
  methodNotAllowedMessage
} from '@utils/api'
import { serverPostApi } from '@config/api_server'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Budget>>
) => {
  if (req.method === 'POST') {
    try {
      const { data } = await serverPostApi(
        'budgets',
        req.body,
        req.cookies.token
      )

      res.status(Status.CREATED).json(jsonResponseSuccess(data))
    } catch (error) {
      const err = error as AxiosError

      const { status, message } = errorResponse(err, err.response?.data.error)

      res.status(status).json(jsonResponseError(message))
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.statusCode = Status.METHOD_NOT_ALLOWED

    res.json(jsonResponseError(methodNotAllowedMessage(req.method)))
  }
}
