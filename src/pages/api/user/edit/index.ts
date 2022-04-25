import { NextApiRequest, NextApiResponse } from 'next'
import { serverInstance as axios } from '@config/axios'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'
import { ApiMethod, Status } from '@utils/enums'
import { ApiResponse, UpdateUser } from '@custom-types'
import {
  jsonResponseError,
  jsonResponseSuccess,
  methodNotAllowedMessage
} from '@utils/api'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<UpdateUser>>
) => {
  if (req.method === ApiMethod.PUT) {
    try {
      const { data, status } = await axios.put('/users/me', req.body, {
        headers: {
          Authorization: 'Bearer ' + req.cookies.token
        },
        params: {
          id: req.query.id
        }
      })

      res.status(status).json(jsonResponseSuccess(data))
    } catch (error) {
      const err = error as AxiosError

      const { status, message } = errorResponse(
        err,
        err.response?.data.message[0].messages[0].message
      )

      res.status(status).json(jsonResponseError(message))
    }
  } else {
    res.setHeader('Allow', [ApiMethod.PUT])
    res.statusCode = Status.METHOD_NOT_ALLOWED

    res.json(jsonResponseError(methodNotAllowedMessage(req.method)))
  }
}
