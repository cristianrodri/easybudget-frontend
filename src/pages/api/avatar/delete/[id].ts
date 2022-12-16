import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'
import { serverDeleteApi } from '@config/api_server'
import { ApiResponse, AvatarUser } from '@custom-types'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'

type DataResponse = AvatarUser

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<DataResponse>>
) =>
  api.delete(req, res, async () => {
    try {
      const { status } = await serverDeleteApi<DataResponse>(
        `upload/files/${req.query.id}`,
        req.cookies.token
      )

      res.status(status).json(jsonResponseSuccess())
    } catch (error) {
      const err = error as AxiosError

      const { status, message } = errorResponse(err, err.response?.data.message)

      res.status(status).json(jsonResponseError(message))
    }
  })
