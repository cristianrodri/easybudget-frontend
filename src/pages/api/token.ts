import { NextApiRequest, NextApiResponse } from 'next'
import { Status } from '@utils/enums'
import { ApiResponse } from '@custom-types'
import { api, jsonResponseSuccess } from '@utils/api'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ token: string }>>
) =>
  api.get(req, res, () => {
    res
      .status(Status.SUCCESS)
      .json(jsonResponseSuccess({ token: req.cookies.token }))
  })
