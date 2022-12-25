import { NextApiRequest } from 'next'
import Budget from './model'

export const findBudgets = async (userId: string, req: NextApiRequest) => {
  const { budgets_date_start: start, budgets_date_end: end } = req.query

  const budgets = await Budget.find({
    user: userId,
    ...(!start || !end ? {} : { date: { $gte: start, $lt: end } })
  })

  return budgets
}
