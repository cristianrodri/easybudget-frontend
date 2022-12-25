import { NextApiRequest } from 'next'
import User from './model'

export const getAuthUser = async (id: string, req: NextApiRequest) => {
  const { budgets_date_start: start, budgets_date_end: end } = req.query

  const user = await User.findOne({ _id: id }).populate({
    path: 'categories',
    populate: {
      path: 'budgets',
      ...(!start || !end ? {} : { match: { date: { $gte: start, $lt: end } } }),
      select: '-user'
    }
  })

  return user
}
