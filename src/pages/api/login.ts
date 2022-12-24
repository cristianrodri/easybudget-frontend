import { NextApiRequest, NextApiResponse } from 'next'
import { createCookie } from '@utils/cookie'
import { ApiResponse, IUserDocument } from '@custom-types'
import { SET, Status } from '@utils/enums'
import { loginUser } from '@db/user/login'
import { api } from '@utils/api/public'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'

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
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error))
    }
  })
