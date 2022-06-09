import { clientGetApi } from '@config/api_client'
import { Status } from '@utils/enums'
import { useLogout } from './useLogout'

export const useFetcher = <T>() => {
  const { logout } = useLogout()

  // Fetcher function when useSWR hook api is called
  const fetcher = (url: string) =>
    clientGetApi<T>(url).then(res => {
      if (res.success === true) {
        return res.data
      }

      if (res.status === Status.UNAUTHORIZED) {
        // If the status response is unauthorized (401), remove the cookie by calling logout api
        logout('login')
      }
    })

  return { fetcher }
}
