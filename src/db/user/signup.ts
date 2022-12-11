import { IUser } from '@custom-types'
import User from './model'

export const signupLocal = async (reqBody: IUser) => {
  const user = new User({ ...reqBody })
  user.provider = 'local'
  user.blocked = false
  user.confirmed = true

  const data = await user.save()

  return data
}
