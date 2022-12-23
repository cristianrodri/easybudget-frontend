import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from '@custom-types'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import User from '@db/user/model'
import { deleteAvatar } from '@db/avatar/delete'
import { Status } from '@utils/enums'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ result: string }>>
) =>
  api.delete(req, res, async userId => {
    try {
      const user = await User.findOne({ _id: userId })

      if (!user?.avatar) throw new Error('There is no avatar to delete')

      const deletion: { result: string } = await deleteAvatar(
        user.avatar.public_id
      )

      // Make avatar property as undefined in mongodb
      user.avatar = undefined
      await user.save()

      res.json(jsonResponseSuccess(deletion))
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error.message))
    }
  })
