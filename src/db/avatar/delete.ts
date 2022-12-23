import cloudinary from './config'

export const deleteAvatar = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId)
}
