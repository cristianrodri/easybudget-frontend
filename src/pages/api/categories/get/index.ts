import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse, GetCategory } from '@custom-types'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import { Status } from '@utils/enums'
import Category from '@db/category/model'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<GetCategory[]>>
) =>
  api.get(req, res, async userId => {
    try {
      const categories = await Category.find({ owner: userId })

      res.json(jsonResponseSuccess(categories as unknown as GetCategory[]))
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error.message))
    }
  })
