import { AxiosRequestConfig } from 'axios'

export const apiHeaders = (
  token: string,
  axiosConfig?: AxiosRequestConfig
): AxiosRequestConfig => {
  return {
    headers: {
      Authorization: 'Bearer ' + token
    },
    // Axios config can be added into the parameters
    ...axiosConfig
  }
}
