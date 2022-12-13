import User from './model'

export const loginUser = async (email: string, password: string) => {
  const user = await User.findByCredentials(email, password)

  return user
}
