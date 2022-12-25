import { NextApiRequest } from 'next'
import Budget from './model'
import { verifyBudgetId } from './utils'

export const deleteBudget = async (userId: string, req: NextApiRequest) => {
  await verifyBudgetId(req.query.id as string, userId)

  const budget = await Budget.findOneAndDelete({
    _id: req.query.id,
    user: userId
  })

  return budget
}
