import { ApiResponseSuccess, GetCategory } from '@custom-types'
import useSWR from 'swr'
import { clientInstance as axios } from '@config/axios'

// Fetcher function when useSWR hook api is called
const fetcher = (url: string) =>
  axios.get<ApiResponseSuccess<GetCategory[]>>(url).then(res => res.data.data)

export const useSWRCategories = (fallbackData: GetCategory[]) => {
  const { data, mutate } = useSWR<GetCategory[]>(
    '/api/categories/get',
    fetcher,
    {
      fallbackData
    }
  )

  return { data, mutate }
}
