import { apiHeaders } from './api_headers'
import { serverInstance as axios } from './axios'

export const serverDeleteApi = async <T>(
  URL: string,
  id: string | string[],
  token: string
) => {
  const res = await axios.delete<T>(`/${URL}/${id}`, apiHeaders(token))

  return res
}
