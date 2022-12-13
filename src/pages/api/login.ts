import { NextApiRequest, NextApiResponse } from 'next'
import { createCookie } from '@utils/cookie'
import { ApiResponse, IUserDocument } from '@custom-types'
import { api, jsonResponseError, jsonResponseSuccess } from '@utils/api'
import { SET } from '@utils/enums'
import { loginUser } from '@db/user/login'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<IUserDocument>>
) =>
  api.post(req, res, async () => {
    try {
      const { email, password } = req.body
      const user = await loginUser(email, password)
      const token = user.generateAuthToken()

      // Set Cookie
      res.setHeader(SET.COOKIE, createCookie(token))

      res.json(jsonResponseSuccess(user))
    } catch (error) {
      res.status(400).json(jsonResponseError(error.message))
    }
  })
