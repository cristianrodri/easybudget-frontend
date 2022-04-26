import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'
import { ApiMethod, Status } from '@utils/enums'
import { ApiResponse, User } from '@custom-types'
import {
  jsonResponseError,
  jsonResponseSuccess,
  methodNotAllowedMessage
} from '@utils/api'
import { serverGetApi } from '@config/api_server'

type DataResponse = User

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<DataResponse>>
) => {
  if (req.method === ApiMethod.GET) {
    try {
      const { data, status } = await serverGetApi<DataResponse>(
        'users/me',
        req.cookies.token,
        {
          params: {
            budgets_date_start: req.query.budgets_date_start,
            budgets_date_end: req.query.budgets_date_end
          }
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
