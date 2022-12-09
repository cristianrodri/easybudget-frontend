import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { createCookie } from '@utils/cookie'
import { errorResponse } from '@utils/error'
import { ApiResponse, AuthResponse, User } from '@custom-types'
import { api, jsonResponseError, jsonResponseSuccess } from '@utils/api'
import { serverPostApi } from '@config/api_server'

export default (req: NextApiRequest, res: NextApiResponse<ApiResponse<User>>) =>
  api.post(req, res, async () => {
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

      const { status, message } = errorResponse(
        err,
        err.response?.data.message[0].messages[0].message
      )

      res.status(status).json(jsonResponseError(message))
    }
  })
