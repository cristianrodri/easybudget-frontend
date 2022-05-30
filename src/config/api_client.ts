import {
  ApiResponseError,
  ApiResponseSuccess,
  RequestConfig,
  Url
} from '@custom-types'
import { clientInstance as api } from './axios'
import { Status } from '@utils/enums'

type ApiError = {
  error: {
    code: number
    message: string
  }
}

const handleError = (err: ApiError): ApiResponseError => {
  // If the api received a gateway timeout error, add a custom error message
  const message =
    err.error.code === Status.GATEWAY_TIMEOUT
      ? 'Server was slepping. Please try again'
      : err.error.message

  return {
    success: false,
    message
  }
}

// Utility function for client GET api
export const clientGetApi = <T>(url: Url, config?: RequestConfig) =>
  api
    .get<ApiResponseSuccess<T>>(`/${url}`, config)
    .then(response => response.data)
    .catch(handleError)

// Utility function for client POST api
export const clientPostApi = <T, R>(url: Url, bodyRequest?: R) =>
  api
    .post<ApiResponseSuccess<T>>(`/${url}`, bodyRequest)
    .then(response => {
      // eslint-disable-next-line
      console.log(response)
      return response.data
    })
    .catch(handleError)

// Utility function for client PUT api
export const clientPutApi = <T, R = unknown>(
  url: Url,
  bodyRequest: R,
  config?: RequestConfig
) =>
  api
    .put<ApiResponseSuccess<T>>(`/${url}`, bodyRequest, config)
    .then(response => response.data)
    .catch(handleError)

// Utility function for client DELETE api
export const clientDeleteApi = <T>(url: Url) =>
  api
    .delete<ApiResponseSuccess<T>>(`/${url}`)
    .then(response => response.data)
    .catch(handleError)
