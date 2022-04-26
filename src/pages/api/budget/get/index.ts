import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'
import { ApiResponse, Budget } from '@custom-types'
import { ApiMethod, Status } from '@utils/enums'
import {
  jsonResponseError,
  jsonResponseSuccess,
  methodNotAllowedMessage
} from '@utils/api'
import { serverGetApi } from '@config/api_server'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Budget[]>>
) => {
  if (req.method === ApiMethod.GET) {
    try {
      const { data, status } = await serverGetApi<Budget[]>(
        '/categories',
        req.cookies.token,
        {
          params: req.query
        }
      )

      res.status(status).json(jsonResponseSuccess(data))
    } catch (error) {
      const err = error as AxiosError

      const { status, message } = errorResponse(err, err.response?.data.error)

      res.status(status).json(jsonResponseError(message))
    }
  } else {
    res.setHeader('Allow', [ApiMethod.GET])
    res.statusCode = Status.METHOD_NOT_ALLOWED

    res.json(jsonResponseError(methodNotAllowedMessage(req.method)))
  }
}
