import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'
import { serverPutApi } from '@config/api_server'
import { ApiResponse, Budget } from '@custom-types'
import { api, jsonResponseError, jsonResponseSuccess } from '@utils/api'

type DataResponse = Budget

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<DataResponse>>
) =>
  api.put(req, res, async () => {
    try {
      const { data, status } = await serverPutApi<DataResponse>(
        `budgets/${req.query.id}`,
        req.body,
        req.cookies.token
      )

      res.status(status).json(jsonResponseSuccess(data))
    } catch (error) {
      const err = error as AxiosError

      const { status, message } = errorResponse(err, err.response?.data.message)

      res.status(status).json(jsonResponseError(message))
    }
  })
