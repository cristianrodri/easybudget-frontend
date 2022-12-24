import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse, IBudget } from '@custom-types'
import { Status } from '@utils/enums'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import { createBudget } from '@db/budget/add'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<IBudget>>
) =>
  api.post(req, res, async userId => {
    try {
      const budget = await createBudget(userId, req)

      res.status(Status.CREATED).json(jsonResponseSuccess(budget))
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error))
    }
  })
