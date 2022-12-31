import { NextApiRequest } from 'next'
import '@db/category/model'
import Budget from './model'

export const findBudgets = async (userId: string, req: NextApiRequest) => {
  const { limit } = req.query

  const budgets = await Budget.find({
    user: userId
  })
    .populate('category')
    .sort({ date: -1 })
    .limit(+limit)

  return budgets
}
