import bcrypt from 'bcryptjs'

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const matchedPassword = await bcrypt.compare(password, hashedPassword)

  if (!matchedPassword) {
    throw new Error('Wrong password!')
  }
}
