import { User } from '@custom-types'

export const getAvatarThumbnail = (user: User) =>
  user?.avatar
    ? user.avatar?.formats
      ? user.avatar.formats.thumbnail.url
      : user.avatar.url
    : user?.username.charAt(0).toUpperCase()
