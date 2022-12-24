import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse, ICategory } from '@custom-types'
import { Status } from '@utils/enums'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import { addCategory } from '@db/category/add'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ICategory>>
) =>
  api.post(req, res, async userId => {
    try {
      const { name, type } = req.body

      const category = await addCategory(userId, name, type)

      res.status(Status.CREATED).json(jsonResponseSuccess(category))
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error))
    }
  })
