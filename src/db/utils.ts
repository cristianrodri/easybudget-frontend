import bcrypt from 'bcryptjs'

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
