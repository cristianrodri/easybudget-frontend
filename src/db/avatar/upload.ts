import { File, IncomingForm } from 'formidable'
import { NextApiRequest } from 'next'
import { IUserDocument } from '@custom-types'
import cloudinary from './config'
import { CLOUDINARY } from '@utils/enums'

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

  const data = await cloudinary.uploader.upload(file.files.avatar.filepath, {
    folder: CLOUDINARY.FOLDER,
    transformation: [{ fetch_format: 'auto', width: 250 }],
    unique_filename: true,
    public_id: user.username
  })

  return data
}
