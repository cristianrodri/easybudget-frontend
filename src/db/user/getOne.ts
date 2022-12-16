import User from './model'

export const getAuthUser = async (id: string) => {
  const user = await User.findById(id)

  return user
}
