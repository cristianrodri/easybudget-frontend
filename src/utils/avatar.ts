import { AvatarUser } from '@custom-types'

export const getAvatarThumbnail = (avatar: AvatarUser) =>
  avatar?.formats?.thumbnail?.url ?? avatar?.url

export const getLighestAvatar = (avatar: AvatarUser) =>
  avatar?.formats?.small?.url ??
  avatar?.formats?.medium?.url ??
  avatar?.formats?.large?.url ??
  avatar?.url
