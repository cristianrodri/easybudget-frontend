import { NextApiRequest, NextApiResponse } from 'next'
import { deleteCookie } from '@utils/cookie'
import { ApiMethod, Status } from '@utils/enums'
import { ApiResponse } from '@custom-types'
import {
  jsonResponseError,
  jsonResponseSuccess,
  methodNotAllowedMessage
} from '@utils/api'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<never>>
) => {
  if (req.method === ApiMethod.GET) {
    // Destroy cookie
    res.setHeader('Set-Cookie', deleteCookie())

    res.status(Status.SUCCESS).json(jsonResponseSuccess())
  } else {
    res.setHeader('Allow', [ApiMethod.GET])
    res.statusCode = Status.METHOD_NOT_ALLOWED

    res.json(jsonResponseError(methodNotAllowedMessage(req.method)))
  }
}
