import { ApiResponseError, ApiResponseSuccess } from '@custom-types'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApiMethod, Status } from '@utils/enums'
import { connectDB } from '@db/mongoose'
import { cleanRequestBody } from './clean'

type MethodParams = (
  req: NextApiRequest,
  res: NextApiResponse,
  cb: () => Promise<void> | void
) => void

type ApiMethodObj = {
  get: MethodParams
  post: MethodParams
  put: MethodParams
  delete: MethodParams
}

const apiMethods: ApiMethodObj = {
  async get(req, res, cb) {
    // If the method belongs to GET, the callback is called
    if (req.method === ApiMethod.GET) {
      await connectDB()
      await cb()
    } else {
      methodNotAllowedResponse(req, res, ApiMethod.GET)
    }
  },
  async post(req, res, cb) {
    // If the method belongs to POST, the callback is called
    if (req.method === ApiMethod.POST) {
      cleanRequestBody(req)
      await connectDB()
      await cb()
    } else {
      methodNotAllowedResponse(req, res, ApiMethod.POST)
    }
  },
  async put(req, res, cb) {
    // If the method belongs to PUT, the callback is called
    if (req.method === ApiMethod.PUT) {
      cleanRequestBody(req)
      await connectDB()
      await cb()
    } else {
      methodNotAllowedResponse(req, res, ApiMethod.PUT)
    }
  },
  async delete(req, res, cb) {
    // If the method belongs to DELETE, the callback is called
    if (req.method === ApiMethod.DELETE) {
      await connectDB()
      await cb()
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
