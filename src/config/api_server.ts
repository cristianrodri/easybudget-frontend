import { apiHeaders } from './api_headers'
import { serverInstance as axios } from './axios'

export const serverDeleteApi = async (
  URL: string,
  id: string | string[],
  token: string
) => {
  const res = await axios.delete(`/${URL}/${id}`, apiHeaders(token))

  return res
}
