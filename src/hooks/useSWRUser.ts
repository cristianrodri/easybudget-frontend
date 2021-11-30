import { User } from '@custom-types'
import useSWR from 'swr'
import { clientInstance as axios } from '@config/axios'

export const useSWRUser = (user: User) => {
  const { data, mutate } = useSWR<User>(
    '/api/user',
    async (url: string) => {
      const res = await axios.get(url)
      return res.data.user
    },
    {
      fallbackData: user
    }
  )

  return { data, mutate }
}
