import { apiHeaders } from './api_headers'
import { serverInstance as axios } from './axios'

type UrlType = 'categories' | 'budgets'

export const serverDeleteApi = async (
  URL: UrlType,
  id: string | string[],
  token: string
) => {
  const res = await axios.delete(`/${URL}/${id}`, apiHeaders(token))

  return res
}

export const serverPostApi = async <T>(
  URL: UrlType,
  body: T,
  token: string
) => {
  const res = await axios.post(`/${URL}`, body, apiHeaders(token))

  return res
}
