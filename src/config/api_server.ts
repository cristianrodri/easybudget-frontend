import { AxiosRequestConfig } from 'axios'
import { apiHeaders } from './api_headers'
import { serverInstance as axios } from './axios'

// This type will be used by delete api and post api functions
type UrlType = 'categories' | 'budgets' | 'auth/local/register'

export const serverGetApi = async <T>(
  URL: string,
  token: string,
  axiosConfig?: AxiosRequestConfig
) => {
  const res = await axios.get<T>(`/${URL}`, apiHeaders(token, axiosConfig))

  return res
}

export const serverPostApi = async <T>(
  URL: UrlType,
  body: { [key: string]: string },
  token?: string
) => {
  const res = await axios.post<T>(
    `/${URL}`,
    body,
    token ? apiHeaders(token) : undefined
  )

  return res
}

export const serverPutApi = async <T>(
  URL: string,
  body: { [key: string]: string },
  token: string,
  axiosConfig?: AxiosRequestConfig
) => {
  const res = await axios.put<T>(
    `/${URL}`,
    body,
    apiHeaders(token, axiosConfig)
  )

  return res
}

export const serverDeleteApi = async (
  URL: UrlType,
  id: string | string[],
  token: string
) => {
  const res = await axios.delete(`/${URL}/${id}`, apiHeaders(token))

  return res
}
