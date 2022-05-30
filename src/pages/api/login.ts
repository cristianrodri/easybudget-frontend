import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { createCookie } from '@utils/cookie'
import { errorResponse } from '@utils/error'
import { ApiResponse, AuthResponse, User } from '@custom-types'
import { ApiMethod, Status } from '@utils/enums'
import {
  jsonResponseError,
  jsonResponseSuccess,
  methodNotAllowedMessage
} from '@utils/api'
import { serverPostApi } from '@config/api_server'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<User>>
) => {
  if (req.method === ApiMethod.POST) {
    try {
      const { data, status } = await serverPostApi<AuthResponse>(
        'auth/local',
        req.body
      )

      // Set Cookie
      res.setHeader('Set-Cookie', createCookie(data.jwt))

      res.status(status).json(jsonResponseSuccess())
    } catch (error) {
      const err = error as AxiosError

      console.log(err) // eslint-disable-line no-console
      console.log(err.response) // eslint-disable-line no-console
      console.log(err.response.data) // eslint-disable-line no-console
      console.log(err.response.data.message) // eslint-disable-line no-console

      const { status, message } = errorResponse(
        err,
        err.response?.data.message[0].messages[0].message
      )

      res.status(status).json(jsonResponseError(message))
    }
  } else {
    res.setHeader('Allow', [ApiMethod.POST])
    res.statusCode = Status.METHOD_NOT_ALLOWED

    res.json(jsonResponseError(methodNotAllowedMessage(req.method)))
  }
}
