import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from '@custom-types'
import { Status } from '@utils/enums'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import User from '@db/user/model'
import { comparePassword } from '@db/utils'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<string>>
) =>
  api.put(req, res, async userId => {
    try {
      const user = await User.findOne({ _id: userId })

      await comparePassword(
        req.body.currentPassword,
        user.password,
        'Your current password is wrong'
      )

      user.password = req.body.newPassword

      await user.save()

      res.json(jsonResponseSuccess('Password updated successfully'))
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error))
    }
  })
