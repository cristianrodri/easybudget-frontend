import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse, ICategory } from '@custom-types'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import { Status } from '@utils/enums'
import { updateCategory } from '@db/category/update'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ICategory>>
) =>
  api.put(req, res, async userId => {
    try {
      const category = await updateCategory(userId, req)

      res.json(jsonResponseSuccess(category))
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error))
    }
  })
