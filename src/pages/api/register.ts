import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { createCookie } from 'utils/cookie'
import { Status } from '@utils/enums'
import { ApiResponse, AuthResponse, User } from '@custom-types'
import { api, jsonResponseError, jsonResponseSuccess } from '@utils/api'
import { errorResponse } from '@utils/error'
import { serverPostApi } from '@config/api_server'

export default (req: NextApiRequest, res: NextApiResponse<ApiResponse<User>>) =>
  api.post(req, res, async () => {
    try {
      const { data } = await serverPostApi<AuthResponse>(
        'auth/local/register',
        req.body
      )

      // Set Cookie
      res.setHeader('Set-Cookie', createCookie(data.jwt))

      res.status(Status.CREATED).json(jsonResponseSuccess())
    } catch (error) {
      const err = error as AxiosError

      const { status, message } = errorResponse(
        err,
        err.response?.data.message[0].messages[0].message
      )

      res.status(status).json(jsonResponseError(message))
    }
  })
