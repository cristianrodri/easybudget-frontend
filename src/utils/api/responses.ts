import { ApiResponseError, ApiResponseSuccess } from '@custom-types'
import { ApiMethod, Status } from '@utils/enums'
import { NextApiRequest, NextApiResponse } from 'next'

// Method not allowed response when api is called with wrong method
export const methodNotAllowedResponse = (
  req: NextApiRequest,
  res: NextApiResponse,
  method: ApiMethod
) => {
  res.setHeader('Allow', [method])
  res.statusCode = Status.METHOD_NOT_ALLOWED

  res.json(jsonResponseError(methodNotAllowedMessage(req.method)))
}

export const methodNotAllowedMessage = (method: string) =>
  `Method ${method} not allowed`

export const jsonResponseSuccess = <T>(data?: T): ApiResponseSuccess<T> => {
  return {
    success: true,
    data
  }
}

export const jsonResponseError = (message: string): ApiResponseError => {
  return {
    success: false,
    message
  }
}
