import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse, IBudget } from '@custom-types'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import { Status } from '@utils/enums'
import { findBudgets } from '@db/budget/find'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<IBudget[]>>
) =>
  api.get(req, res, async userId => {
    try {
      const budgets = await findBudgets(userId, req)

      res.json(jsonResponseSuccess(budgets))
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error))
    }
  })
