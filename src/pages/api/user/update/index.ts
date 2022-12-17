import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse, IUserDocument } from '@custom-types'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import { Status } from '@utils/enums'
import User from '@db/user/model'
import { updateAllowedProperties } from '@utils/api/clean'

type DataResponse = IUserDocument

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<DataResponse>>
) =>
  api.put(req, res, async userId => {
    try {
      const user = await User.findOne({ _id: userId })
      updateAllowedProperties(['username', 'email'], req, user)

      await user.save()

      res.json(jsonResponseSuccess(user))
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error.message))
    }
  })
