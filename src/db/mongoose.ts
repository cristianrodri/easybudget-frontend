import chalk from 'chalk'
import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI)

    // eslint-disable-next-line no-console
    console.log(chalk.cyan.underline('Mongoose Connected to database'))

    return db
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message)
  }
}

export { connectDB }
