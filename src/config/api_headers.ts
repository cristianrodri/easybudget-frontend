import { AxiosRequestConfig } from 'axios'

export const apiHeaders = (token: string): AxiosRequestConfig => {
  return {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
}
