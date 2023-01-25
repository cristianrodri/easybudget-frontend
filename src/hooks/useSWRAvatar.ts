import { UploadApiResponse } from 'cloudinary'
import useSWR from 'swr'
import { useFetcher } from './useFetcher'

export const useUserAvatar = (avatar?: UploadApiResponse) => {
  const { fetcher } = useFetcher<UploadApiResponse>()
  const { data, mutate } = useSWR(`api/avatar/get`, fetcher, {
    fallbackData: avatar
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
