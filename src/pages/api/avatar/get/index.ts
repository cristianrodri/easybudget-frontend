import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from '@custom-types'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import { Status } from '@utils/enums'
import { UploadApiResponse } from 'cloudinary'
import User from '@db/user/model'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<UploadApiResponse>>
) =>
  api.get(req, res, async userId => {
    try {
      const user = await User.findOne({ _id: userId })

      res.json(jsonResponseSuccess(user.avatar))
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error))
    }
  })
