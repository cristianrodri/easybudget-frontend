import { IUserDocument } from '@custom-types'
import cloudinary from './config'

export const deleteAvatar = async (user: IUserDocument) => {
  if (!user?.avatar) throw new Error('There is no avatar to delete')

  return await cloudinary.uploader.destroy(user.avatar.public_id)
}
