import { AxiosError } from 'axios'

type Response = {
  status: number
  message: string
}

// Customize error response when the connection to server is failed
export const errorResponse = (err: AxiosError, message: string): Response => {
  return {
    status: err.response?.status ?? 500,
    message: err.response ? message : 'No connection'
  }
}
