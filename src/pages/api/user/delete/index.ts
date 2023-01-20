import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse, IUserDocument } from '@custom-types'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import { Status } from '@utils/enums'
import User from '@db/user/model'
import { deleteUser } from '@db/user/delete'

type DataResponse = IUserDocument

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<DataResponse>>
) =>
  api.delete(req, res, async userId => {
    try {
      const user = await User.findOne({ _id: userId })
      const deletedUser = await deleteUser(user, req)

      res.json(jsonResponseSuccess(deletedUser))
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error))
    }
  })
