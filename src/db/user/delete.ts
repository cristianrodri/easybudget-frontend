import { IUserDocument } from '@custom-types'
import { NextApiRequest } from 'next'
import User from './model'

export const deleteUser = async (user: IUserDocument, req: NextApiRequest) => {
  // The user must provide the created user date as a query
  if (user.createdAt.toISOString() !== req.query.createdAt)
    throw new Error('User cannot be deleted')

  // Delete the user
  const deletedUser = await User.findOneAndDelete({ _id: user._id })

  return deletedUser
}
