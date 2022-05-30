import {
  ApiResponseError,
  ApiResponseSuccess,
  RequestConfig,
  Url
} from '@custom-types'
import { clientInstance as api } from './axios'

const error = (err: ApiResponseError) => {
  console.log(err) // eslint-disable-line no-console
  return err
}

// Utility function for client GET api
export const clientGetApi = <T>(url: Url, config?: RequestConfig) =>
  api
    .get<ApiResponseSuccess<T>>(`/${url}`, config)
    .then(response => response.data)
    .catch(error)

// Utility function for client POST api
export const clientPostApi = <T, R>(url: Url, bodyRequest?: R) =>
  api
    .post<ApiResponseSuccess<T>>(`/${url}`, bodyRequest)
    .then(response => response.data)
    .catch(error)

// Utility function for client PUT api
export const clientPutApi = <T, R = unknown>(
  url: Url,
  bodyRequest: R,
  config?: RequestConfig
) =>
  api
    .put<ApiResponseSuccess<T>>(`/${url}`, bodyRequest, config)
    .then(response => response.data)
    .catch(error)

// Utility function for client DELETE api
export const clientDeleteApi = <T>(url: Url) =>
  api
    .delete<ApiResponseSuccess<T>>(`/${url}`)
    .then(response => response.data)
    .catch(error)
