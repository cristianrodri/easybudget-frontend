// export const isApiSucceded = (req: Request, res: Response)

import { ApiResponseError, ApiResponseSuccess } from '@custom-types'

export const methodNotAllowedMessage = (method: string) =>
  `Method ${method} not allowed`

export const jsonResponseSuccess = <T>(data?: T): ApiResponseSuccess<T> => {
  return {
    success: true,
    data
  }
}

export const jsonResponseError = (message: string): ApiResponseError => {
  return {
    success: false,
    message
  }
}
