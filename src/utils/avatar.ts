import { AvatarUser } from '@custom-types'

export const getAvatarThumbnail = (avatar: AvatarUser) =>
  avatar?.formats?.thumbnail?.url ?? avatar?.url
