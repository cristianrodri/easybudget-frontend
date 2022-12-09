import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'
import { ApiResponse, User } from '@custom-types'
import { api, jsonResponseError, jsonResponseSuccess } from '@utils/api'
import { serverGetApi } from '@config/api_server'

type DataResponse = User

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<DataResponse>>
) =>
  api.get(req, res, async () => {
    try {
      const { data, status } = await serverGetApi<DataResponse>(
        'users/me',
        req.cookies.token,
        {
          params: {
            budgets_date_start: req.query.budgets_date_start,
            budgets_date_end: req.query.budgets_date_end
          }
        }
      )

      res.status(status).json(jsonResponseSuccess(data))
    } catch (error) {
      const err = error as AxiosError

      const { status, message } = errorResponse(err, err.response?.data.error)

      res.status(status).json(jsonResponseError(message))
    }
  })
