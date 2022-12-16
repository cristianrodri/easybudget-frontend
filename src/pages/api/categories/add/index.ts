import { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { errorResponse } from '@utils/error'
import { ApiResponse, CategoryTypes } from '@custom-types'
import { Status } from '@utils/enums'
import { serverPostApi } from '@config/api_server'
import { api } from '@utils/api/private'
import { jsonResponseError, jsonResponseSuccess } from '@utils/api/responses'

type DataResponse = CategoryTypes[]

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<DataResponse>>
) =>
  api.post(req, res, async () => {
    try {
      const { data } = await serverPostApi<DataResponse>(
        `categories`,
        req.body,
        req.cookies.token
      )

      res.status(Status.CREATED).json(jsonResponseSuccess(data))
    } catch (error) {
      const err = error as AxiosError

      const { status, message } = errorResponse(err, err.response?.data.message)

      res.status(status).json(jsonResponseError(message))
    }
  })
