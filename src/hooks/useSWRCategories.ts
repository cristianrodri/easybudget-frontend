import { ApiResponseSuccess, GetCategory, Url } from '@custom-types'
import useSWR from 'swr'
import { clientGetApi } from '@config/api_client'

type CategoriesDataResponse = GetCategory[]

// Fetcher function when useSWR hook api is called
const fetcher = (url: Url) =>
  clientGetApi<ApiResponseSuccess<CategoriesDataResponse>>(url).then(
    res => res.data.data
  )

export const useSWRCategories = (fallbackData: CategoriesDataResponse) => {
  const { data, mutate } = useSWR('api/categories/get', fetcher, {
    fallbackData
  })

  return { data, mutate }
}
