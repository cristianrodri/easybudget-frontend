import { AxiosResponse } from 'axios'
import {
  ApiResponse,
  ApiResponseError,
  ApiResponseSuccess,
  RequestConfig,
  Url
} from '@custom-types'
import { clientInstance as api } from './axios'
import { Status } from '@utils/enums'

const gatewayErrorResponse: ApiResponseError = {
  success: false,
  message: 'Server was slepping. Please try again'
}

const unauthorizedErrorResponse = (
  message: string,
  status: number
): ApiResponseError => {
  return { success: false, message, status }
}

const handleError = (err: ApiResponseError) => err

const handleSuccessResponse = <T>(
  response: AxiosResponse<ApiResponseSuccess<T>>
) => {
  if (response.status === Status.GATEWAY_TIMEOUT) {
    return gatewayErrorResponse
  } else if (response.status === Status.UNAUTHORIZED) {
    return unauthorizedErrorResponse('Unauthorized', response.status)
  }

  return response.data
}

// Utility function for client GET api
export const clientGetApi = <T>(url: Url, config?: RequestConfig) =>
  api
    .get<ApiResponseSuccess<T>>(`/${url}`, config)
    .then(handleSuccessResponse)
    .catch(handleError)

// Utility function for client POST api
export const clientPostApi = <T, R>(url: Url, bodyRequest?: R) =>
  api
    .post<ApiResponse<T>>(`/${url}`, bodyRequest)
    .then(handleSuccessResponse)
    .catch(handleError)

// Utility function for client PUT api
export const clientPutApi = <T, R = unknown>(
  url: Url,
  bodyRequest: R,
  config?: RequestConfig
) =>
  api
    .put<ApiResponseSuccess<T>>(`/${url}`, bodyRequest, config)
    .then(handleSuccessResponse)
    .catch(handleError)

// Utility function for client DELETE api
export const clientDeleteApi = <T>(url: Url) =>
  api
    .delete<ApiResponseSuccess<T>>(`/${url}`)
    .then(handleSuccessResponse)
    .catch(handleError)
