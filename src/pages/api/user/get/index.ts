import { NextApiRequest, NextApiResponse } from 'next'
import { serverInstance as axios } from '@config/axios'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'
import { ApiMethod, Status } from '@utils/enums'
import { ApiResponse, User } from '@custom-types'
import {
  jsonResponseError,
  jsonResponseSuccess,
  methodNotAllowedMessage
} from '@utils/api'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<User>>
) => {
  if (req.method === ApiMethod.GET) {
    try {
      const { data, status } = await axios.get('/users/me', {
        headers: {
          Authorization: 'Bearer ' + req.cookies.token
        },
        params: {
          budgets_date_start: req.query.budgets_date_start,
          budgets_date_end: req.query.budgets_date_end
        }
      })

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
