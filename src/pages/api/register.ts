import { NextApiRequest, NextApiResponse } from 'next'
import { SET, Status } from '@utils/enums'
import { ApiResponse, IUserDocument } from '@custom-types'
import { api, jsonResponseError, jsonResponseSuccess } from '@utils/api'
import { signupLocal } from '@db/user/signup'
import { createCookie } from '@utils/cookie'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<IUserDocument>>
) =>
  api.post(req, res, async () => {
    try {
      const user = await signupLocal(req.body)
      const token = user.generateAuthToken()

      res.setHeader(SET.COOKIE, createCookie(token))

      res.status(Status.CREATED).json(jsonResponseSuccess(user))
    } catch (error) {
      if (error.message.includes('E11000 duplicate key')) {
        return res
          .status(400)
          .json(jsonResponseError('Email is already in use'))
      }

      res.status(400).json(jsonResponseError(error.message))
    }
  })
