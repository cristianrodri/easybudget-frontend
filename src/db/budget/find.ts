import { NextApiRequest } from 'next'
import Budget from './model'

export const findBudgets = async (userId: string, req: NextApiRequest) => {
  const { limit } = req.query

  const budgets = await Budget.find({
    user: userId
  })
    .sort({ date: -1 })
    .limit(+limit)

  return budgets
}
