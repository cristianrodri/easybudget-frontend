import { ApiResponseError, ApiResponseSuccess } from '@custom-types'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApiMethod, Status } from '@utils/enums'

type MethodParams = (
  req: NextApiRequest,
  res: NextApiResponse,
  cb: () => void
) => void

type ApiMethodObj = {
  get: MethodParams
  post: MethodParams
  put: MethodParams
  delete: MethodParams
}

const apiMethods: ApiMethodObj = {
  get(req, res, cb) {
    // If the method belongs to GET, the callback is called
    if (req.method === ApiMethod.GET) {
      cb()
    } else {
      methodNotAllowedResponse(req, res, ApiMethod.GET)
    }
  },
  post(req, res, cb) {
    // If the method belongs to POST, the callback is called
    if (req.method === ApiMethod.POST) {
      cb()
    } else {
      methodNotAllowedResponse(req, res, ApiMethod.POST)
    }
  },
  put(req, res, cb) {
    // If the method belongs to PUT, the callback is called
    if (req.method === ApiMethod.PUT) {
      cb()
    } else {
      methodNotAllowedResponse(req, res, ApiMethod.PUT)
    }
  },
  delete(req, res, cb) {
    // If the method belongs to DELETE, the callback is called
    if (req.method === ApiMethod.DELETE) {
      cb()
    } else {
      methodNotAllowedResponse(req, res, ApiMethod.DELETE)
    }
  }
}

// Method not allowed response when api is called with wrong method
const methodNotAllowedResponse = (
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

export { apiMethods as api }
