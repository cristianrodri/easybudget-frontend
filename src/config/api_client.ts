import { RequestConfig, Url } from '@custom-types'
import { clientInstance as api } from './axios'

// Utility function for client GET api
export const clientGetApi = <T>(url: Url, config?: RequestConfig) =>
  api.get<T>(`/${url}`, config)

// Utility function for client POST api
export const clientPostApi = <T, R>(url: Url, bodyRequest: R) =>
  api.post<T>(`/${url}`, bodyRequest)

// Utility function for client PUT api
export const clientPutApi = <T, R>(
  url: Url,
  bodyRequest: R,
  config: RequestConfig
) => api.put<T>(`/${url}`, bodyRequest, config)

// Utility function for client DELETE api
export const clientDeleteApi = <T>(url: Url) => api.delete<T>(`/${url}`)
