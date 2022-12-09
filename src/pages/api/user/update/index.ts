import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'
import { ApiResponse, UpdateUser } from '@custom-types'
import { api, jsonResponseError, jsonResponseSuccess } from '@utils/api'
import { serverPutApi } from '@config/api_server'

type DataResponse = UpdateUser

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<DataResponse>>
) =>
  api.put(req, res, async () => {
    try {
      const { data, status } = await serverPutApi<DataResponse>(
        'users/me',
        req.body,
        req.cookies.token,
        {
          params: {
            id: req.query.id
          }
        }
      )

      res.status(status).json(jsonResponseSuccess(data))
    } catch (error) {
      const err = error as AxiosError

      const { status, message } = errorResponse(
        err,
        err.response?.data.message[0].messages[0].message
      )

      res.status(status).json(jsonResponseError(message))
    }
  })
