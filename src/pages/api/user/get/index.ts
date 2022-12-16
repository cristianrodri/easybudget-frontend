import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import { getAuthUser } from '@db/user/getOne'

export default (req: NextApiRequest, res: NextApiResponse) =>
  api.get(req, res, async userId => {
    try {
      // should return the user data with categories. Inside the categories should be given the related budgets of the current month. The current month date should be provided by query params
      const user = await getAuthUser(userId)

      res.json(jsonResponseSuccess(user))
    } catch (error) {
      res.status(400).json(jsonResponseError(error.message))
    }
  })
