import { clientGetApi } from '@config/api_client'
import { AvatarUser } from '@custom-types'
import useSWR from 'swr'

// Fetcher function when useSWR hook api is called
const fetcher = (url: string) =>
  clientGetApi<AvatarUser>(url).then(res =>
    res.success === true ? res.data : null
  )

export const useSWRAvatar = (avatar?: AvatarUser) => {
  const { data, mutate } = useSWR(`api/avatar/get`, fetcher, {
    fallbackData: avatar
  })

  // Add or edit avatar by mutating
  const mutateAvatarByAdding = (newAvatar: AvatarUser) => {
    mutate(newAvatar, false)
  }

  // Delete avatar by mutating
  const mutateAvatarByDeleting = () => {
    mutate(null, false)
  }

  return { data, mutate, mutateAvatarByAdding, mutateAvatarByDeleting }
}
