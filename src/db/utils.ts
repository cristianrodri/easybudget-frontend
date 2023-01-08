import bcrypt from 'bcryptjs'
import { ToObjectOptions } from 'mongoose'

export const comparePassword = async (
  password: string,
  hashedPassword: string,
  errorMessage = 'Wrong password!'
) => {
  const matchedPassword = await bcrypt.compare(password, hashedPassword)

  if (!matchedPassword) {
    throw new Error(errorMessage)
  }
}

export const toJSON: ToObjectOptions = {
  transform(doc, ret) {
    // Change the _id to id in all api responses and remove the password if it exists (user schema)
    ret.id = ret._id
    delete ret._id
  },
  // Remove the __v in all api responses
  versionKey: false,
  virtuals: true
}
