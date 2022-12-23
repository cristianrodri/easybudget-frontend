import { File, IncomingForm } from 'formidable'
import { NextApiRequest } from 'next'
import cloudinary from 'cloudinary'
import { IUserDocument } from '@custom-types'

type AvatarFile = { files: { avatar: File } }

const getRequestFile = async (req: NextApiRequest) => {
  const fData = await new Promise((resolve, reject) => {
    const form = new IncomingForm({
      multiples: false
    })
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      const avatar = files.avatar as File

      if (avatar.size > 1_000_000) reject('File limit exceeded (1MB)')
      resolve({ fields, files })
    })
  })

  return fData as AvatarFile
}

export const uploadAvatar = async (
  req: NextApiRequest,
  user: IUserDocument
) => {
  const file = await getRequestFile(req)

  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  })

  const data = await cloudinary.v2.uploader.upload(file.files.avatar.filepath, {
    folder: 'easy-budget',
    transformation: [{ fetch_format: 'auto', width: 250 }],
    unique_filename: true,
    public_id: user.username
  })

  return data
}
