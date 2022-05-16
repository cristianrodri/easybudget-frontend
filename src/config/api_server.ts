import { BodyRequest, RequestConfig, Token, Url } from '@custom-types'
import { apiHeaders } from './api_headers'
import { serverInstance as api } from './axios'

// Utility function for server GET api
export const serverGetApi = <T>(
  URL: Url,
  token: Token,
  config?: RequestConfig
) => api.get<T>(`/${URL}`, apiHeaders(token, config))

// Utility function for server POST api
export const serverPostApi = <T, R = unknown>(
  url: Url,
  body: R,
  token?: Token
) => api.post<T>(`/${url}`, body, token ? apiHeaders(token) : undefined)

// Utility function for server PUT api
export const serverPutApi = <T>(
  url: Url,
  body: BodyRequest,
  token: Token,
  config?: RequestConfig
) => api.put<T>(`/${url}`, body, apiHeaders(token, config))

// Utility function for server DELETE api
export const serverDeleteApi = <T>(
  url: Url,
  token: Token,
  config?: RequestConfig
) => api.delete<T>(`/${url}`, apiHeaders(token, config))
