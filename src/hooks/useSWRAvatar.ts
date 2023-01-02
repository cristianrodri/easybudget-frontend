import { clientGetApi } from '@config/api_client'
import { UploadApiResponse } from 'cloudinary'
import useSWR from 'swr'

// Fetcher function when useSWR hook api is called
const fetcher = (url: string) =>
  clientGetApi<UploadApiResponse>(url).then(res =>
    res.success === true ? res.data : null
  )

export const useUserAvatar = (avatar?: UploadApiResponse) => {
  const { data, mutate } = useSWR(`api/avatar/get`, fetcher, {
    fallbackData: avatar
    // revalidateOnFocus: false
  })

  // Add or edit avatar by mutating
  const mutateAvatarByAdding = (newAvatar: UploadApiResponse) => {
    mutate(newAvatar, false)
  }

  // Delete avatar by mutating
  const mutateAvatarByDeleting = () => {
    mutate(null, false)
  }

  return { data, mutate, mutateAvatarByAdding, mutateAvatarByDeleting }
}
