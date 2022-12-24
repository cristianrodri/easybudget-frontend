import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'
import { getAuthUser } from '@db/user/get_one'
import { Status } from '@utils/enums'

export default (req: NextApiRequest, res: NextApiResponse) =>
  api.get(req, res, async userId => {
    try {
      // should return the user data with categories. Inside the categories should be given the related budgets of the current month. The current month date should be provided by query params
      const user = await getAuthUser(userId)

      res.json(jsonResponseSuccess(user))
    } catch (error) {
      res.status(Status.BAD_REQUEST).json(jsonResponseError(error))
    }
  })
