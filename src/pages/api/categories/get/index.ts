import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'
import { ApiResponse, GetCategory } from '@custom-types'
import { api, jsonResponseError, jsonResponseSuccess } from '@utils/api'
import { serverGetApi } from '@config/api_server'

type DataResponse = GetCategory[]

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<DataResponse>>
) =>
  api.get(req, res, async () => {
    try {
      const { data, status } = await serverGetApi<DataResponse>(
        'categories',
        req.cookies.token
      )

      res.status(status).json(jsonResponseSuccess(data))
    } catch (error) {
      const err = error as AxiosError

      const { status, message } = errorResponse(err, err.response?.data.error)

      res.status(status).json(jsonResponseError(message))
    }
  })
