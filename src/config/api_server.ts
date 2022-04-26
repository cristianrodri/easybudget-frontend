import { AxiosRequestConfig } from 'axios'
import { apiHeaders } from './api_headers'
import { serverInstance as axios } from './axios'

// Utility function for server GET api
export const serverGetApi = async <T>(
  URL: string,
  token: string,
  axiosConfig?: AxiosRequestConfig
) => {
  const res = await axios.get<T>(`/${URL}`, apiHeaders(token, axiosConfig))

  return res
}

// Utility function for server POST api
export const serverPostApi = async <T>(
  URL: string,
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

// Utility function for server PUT api
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

// Utility function for server DELETE api
export const serverDeleteApi = async <T>(
  URL: string,
  token: string,
  axiosConfig?: AxiosRequestConfig
) => {
  const res = await axios.delete<T>(`/${URL}`, apiHeaders(token, axiosConfig))

  return res
}
