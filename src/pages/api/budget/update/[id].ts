import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse, IBudget } from '@custom-types'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import { Status } from '@utils/enums'
import Budget from '@db/budget/model'
import { updateAllowedProperties } from '@utils/api/clean'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<IBudget>>
) =>
  api.put(req, res, async userId => {
    try {
      const budget = await Budget.findOne({ _id: req.query.id, user: userId })
      updateAllowedProperties(
        ['money', 'description', 'date', 'category'],
        req,
        budget
      )

      await budget.save()

      res.json(jsonResponseSuccess(budget))
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error))
    }
  })
