import { RequestConfig } from '@custom-types'

export const apiHeaders = (
  token: string,
  config?: RequestConfig
): RequestConfig => {
  return {
    headers: {
      Authorization: 'Bearer ' + token
    },
    // Axios config can be added into the parameters
    ...config
  }
}
