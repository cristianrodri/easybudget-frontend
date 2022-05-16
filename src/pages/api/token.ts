import { NextApiRequest, NextApiResponse } from 'next'
import { ApiMethod, Status } from '@utils/enums'
import { ApiResponse } from '@custom-types'
import {
  jsonResponseError,
  jsonResponseSuccess,
  methodNotAllowedMessage
} from '@utils/api'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ token: string }>>
) => {
  if (req.method === ApiMethod.GET) {
    res
      .status(Status.SUCCESS)
      .json(jsonResponseSuccess({ token: req.cookies.token }))
  } else {
    res.setHeader('Allow', [ApiMethod.GET])
    res.statusCode = Status.METHOD_NOT_ALLOWED

    res.json(jsonResponseError(methodNotAllowedMessage(req.method)))
  }
}
