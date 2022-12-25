import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse, IBudget } from '@custom-types'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import { Status } from '@utils/enums'
import { deleteBudget } from '@db/budget/delete'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<IBudget>>
) =>
  api.delete(req, res, async userId => {
    try {
      const budget = await deleteBudget(userId, req)

      res.json(jsonResponseSuccess(budget))
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error))
    }
  })
