import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse, IUserDocument } from '@custom-types'
import { Status } from '@utils/enums'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import User from '@db/user/model'
import { comparePassword } from '@db/utils'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<IUserDocument>>
) =>
  api.post(req, res, async userId => {
    try {
      const user = await User.findOne({ _id: userId })

      await comparePassword(req.body.password, user.password)

      res.json(jsonResponseSuccess())
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error))
    }
  })
