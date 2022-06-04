import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'
import { serverGetApi } from '@config/api_server'
import { ApiResponse, AvatarUser } from '@custom-types'
import { ApiMethod, Status } from '@utils/enums'
import {
  jsonResponseError,
  jsonResponseSuccess,
  methodNotAllowedMessage
} from '@utils/api'

type DataResponse = AvatarUser

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<DataResponse>>
) => {
  if (req.method === ApiMethod.GET) {
    try {
      const { data, status } = await serverGetApi<DataResponse>(
        `upload/files/user`,
        req.cookies.token
      )

      res.status(status).json(jsonResponseSuccess(data))
    } catch (error) {
      const err = error as AxiosError

      const { status, message } = errorResponse(err, err.response?.data.message)

      res.status(status).json(jsonResponseError(message))
    }
  } else {
    res.setHeader('Allow', [ApiMethod.GET])
    res.statusCode = Status.METHOD_NOT_ALLOWED

    res.json(jsonResponseError(methodNotAllowedMessage(req.method)))
  }
}
