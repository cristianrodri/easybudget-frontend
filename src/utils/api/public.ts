import { ApiMethod } from '@utils/enums'
import { allowedMethod, ApiMethodObj, CbPublic, MethodParams } from './methods'

const apiMethods: ApiMethodObj<MethodParams<CbPublic>> = {
  async get(req, res, cb) {
    await allowedMethod(req, res, ApiMethod.GET, async () => await cb())
  },
  async post(req, res, cb) {
    await allowedMethod(req, res, ApiMethod.POST, async () => await cb())
  },
  async put(req, res, cb) {
    await allowedMethod(req, res, ApiMethod.PUT, async () => await cb())
  },
  async delete(req, res, cb) {
    await allowedMethod(req, res, ApiMethod.DELETE, async () => await cb())
  }
}

export { apiMethods as api }
