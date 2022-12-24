import { NextApiRequest, NextApiResponse, PageConfig } from 'next'
import { ApiResponse } from '@custom-types'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import { Status } from '@utils/enums'
import { uploadAvatar } from '@db/avatar/upload'
import { UploadApiResponse } from 'cloudinary'
import User from '@db/user/model'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<UploadApiResponse>>
) =>
  api.post(req, res, async userId => {
    try {
      const user = await User.findOne({ _id: userId })

      const avatar = await uploadAvatar(req, user)

      user.avatar = avatar
      await user.save()

      res.status(Status.CREATED).json(jsonResponseSuccess(avatar))
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error))
    }
  })

export const config: PageConfig = {
  api: {
    bodyParser: false
  }
}
