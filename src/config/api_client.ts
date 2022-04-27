import { BodyRequest, RequestConfig, Url } from '@custom-types'
import { clientInstance as api } from './axios'

// Utility function for client GET api
export const clientGetApi = <T>(url: Url, config: RequestConfig) =>
  api.get<T>(`/${url}`, config)

// Utility function for client POST api
export const clientPostApi = <T>(url: Url, body: BodyRequest) =>
  api.post<T>(`/${url}`, body)

// Utility function for client PUT api
export const clientPutApi = <T>(url: Url, body: BodyRequest) =>
  api.put<T>(`/${url}`, body)

// Utility function for client DELETE api
export const clientDeleteApi = <T>(url: Url) => api.delete<T>(`/${url}`)
