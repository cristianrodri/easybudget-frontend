import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'
import { serverDeleteApi } from '@config/api_server'
import { ApiResponse, CategoryApi } from '@custom-types'
import { ApiMethod, Status } from '@utils/enums'
import {
  jsonResponseError,
  jsonResponseSuccess,
  methodNotAllowedMessage
} from '@utils/api'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<CategoryApi>>
) => {
  if (req.method === ApiMethod.DELETE) {
    try {
      const { data, status } = await serverDeleteApi(
        'categories',
        req.cookies.token,
        {
          params: req.query.id
        }
      )

      res.status(status).json(jsonResponseSuccess(data))
    } catch (error) {
      const err = error as AxiosError

      const { status, message } = errorResponse(err, err.response?.data.message)

      res.status(status).json(jsonResponseError(message))
    }
  } else {
    res.setHeader('Allow', [ApiMethod.DELETE])
    res.statusCode = Status.METHOD_NOT_ALLOWED

    res.json(jsonResponseError(methodNotAllowedMessage(req.method)))
  }
}
