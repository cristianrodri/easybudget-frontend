import { GetCategory } from '@custom-types'
import useSWR from 'swr'
import { clientInstance as axios } from '@config/axios'

export const useSWRCategories = (fallbackData: GetCategory[]) => {
  const { data, mutate } = useSWR<GetCategory[]>(
    '/api/categories/get',
    async (url: string) => {
      const res = await axios.get(url)

      return res.data?.categories
    },
    {
      fallbackData
    }
  )

  return { data, mutate }
}
