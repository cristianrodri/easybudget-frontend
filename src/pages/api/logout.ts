import { NextApiRequest, NextApiResponse } from 'next'
import { deleteCookie } from '@utils/cookie'
import { SET } from '@utils/enums'
import { ApiResponse } from '@custom-types'
import { api } from '@utils/api/private'
import { jsonResponseSuccess } from '@utils/api/responses'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<never>>
) =>
  api.post(req, res, () => {
    // Destroy cookie
    res.setHeader(SET.COOKIE, deleteCookie())

    res.json(jsonResponseSuccess())
  })
