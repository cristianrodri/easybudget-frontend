import { connectDB } from '@db/mongoose'
import { cleanRequestBody } from '@utils/clean'
import { ApiMethod } from '@utils/enums'
import { NextApiRequest, NextApiResponse } from 'next'
import { methodNotAllowedResponse } from './responses'

export type CbPublic = () => Promise<void> | void
export type CbPrivate = (userId: string) => Promise<void> | void

export type MethodParams<T> = (
  req: NextApiRequest,
  res: NextApiResponse,
  cb: T
) => void

export type ApiMethodObj<T> = {
  get: T
  post: T
  put: T
  delete: T
}

export const allowedMethod = async (
  req: NextApiRequest,
  res: NextApiResponse,
  method: ApiMethod,
  cb: () => Promise<void> | void
) => {
  // If the request method belongs to method params, the request body is cleaned, the database is called and the callback function is called
  if (req.method === method) {
    cleanRequestBody(req)
    await connectDB()
    await cb()
  } else {
    methodNotAllowedResponse(req, res, method)
  }
}
