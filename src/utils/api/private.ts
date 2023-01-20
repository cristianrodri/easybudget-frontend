import { NextApiRequest, NextApiResponse } from 'next'
import { ApiMethod, Status } from '@utils/enums'
import { allowedMethod, ApiMethodObj, CbPrivate, MethodParams } from './methods'
import { jsonResponseError } from '@utils/api/responses'
import { getUserId } from './token'

// Vefiries if the token exists in the cookies and return the user _id (string). Otherwise return unauthorized (void).
const authorization = (
  req: NextApiRequest,
  res: NextApiResponse
): string | void => {
  if (!req.cookies?.token) {
    res.status(Status.UNAUTHORIZED).json(jsonResponseError('Unauthorized'))
  } else {
    const userId = getUserId(req)

    return userId
  }
}

// Private methods
const privateMethods: ApiMethodObj<MethodParams<CbPrivate>> = {
  // GET
  async get(req, res, cb) {
    const userId = authorization(req, res)

    if (typeof userId === 'string')
      await allowedMethod(req, res, ApiMethod.GET, async () => await cb(userId))
  },

  // POST
  async post(req, res, cb) {
    const userId = authorization(req, res) as string

    if (typeof userId === 'string')
      await allowedMethod(
        req,
        res,
        ApiMethod.POST,
        async () => await cb(userId)
      )
  },

  // PUT
  async put(req, res, cb) {
    const userId = authorization(req, res) as string

    if (typeof userId === 'string')
      await allowedMethod(req, res, ApiMethod.PUT, async () => await cb(userId))
  },

  // DELETE
  async delete(req, res, cb) {
    const userId = authorization(req, res) as string

    if (typeof userId === 'string')
      await allowedMethod(
        req,
        res,
        ApiMethod.DELETE,
        async () => await cb(userId)
      )
  }
}

export { privateMethods as api }
