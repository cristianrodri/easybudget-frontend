import { NextApiRequest, NextApiResponse } from 'next'
import { deleteCookie } from '@utils/cookie'
import { Status } from '@utils/enums'
import { ApiResponse } from '@custom-types'
import { api, jsonResponseSuccess } from '@utils/api'

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<never>>
) =>
  api.post(req, res, () => {
    // Destroy cookie
    res.setHeader('Set-Cookie', deleteCookie())

    res.status(Status.SUCCESS).json(jsonResponseSuccess())
  })
