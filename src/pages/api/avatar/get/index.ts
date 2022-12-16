import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'
import { serverGetApi } from '@config/api_server'
import { ApiResponse, AvatarUser } from '@custom-types'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'

type DataResponse = AvatarUser

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<DataResponse>>
) =>
  api.get(req, res, async () => {
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
  })
