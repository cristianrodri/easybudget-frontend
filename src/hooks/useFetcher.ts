import { clientGetApi } from '@config/api_client'

export const useFetcher = <T>() => {
  // Fetcher function when useSWR hook api is called
  const fetcher = (url: string) =>
    clientGetApi<T>(url).then(res => {
      if (res.success === true) {
        return res.data
      }
    })

  return { fetcher }
}
