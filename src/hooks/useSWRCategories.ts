import { GetCategory } from '@custom-types'
import useSWR from 'swr'
import { useFetcher } from './useFetcher'

type CategoriesDataResponse = GetCategory[]

export const useSWRCategories = (fallbackData?: CategoriesDataResponse) => {
  const { fetcher } = useFetcher<CategoriesDataResponse>()
  const { data, mutate } = useSWR('api/categories/get', fetcher, {
    fallbackData
  })

  return { data, mutate }
}
