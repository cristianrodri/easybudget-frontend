import { NextApiRequest, NextApiResponse } from 'next'
import { deleteCookie } from '@utils/cookie'
import { SET, Status } from '@utils/enums'
import { ApiResponse } from '@custom-types'
import { api, jsonResponseSuccess } from '@utils/api'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<never>>
) =>
  api.get(req, res, () => {
    // Destroy cookie
    res.setHeader(SET.COOKIE, deleteCookie())

    res.status(Status.SUCCESS).json(jsonResponseSuccess())
  })
