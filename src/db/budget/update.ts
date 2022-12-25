import { verifyCategoryId } from '@db/category/utils'
import { updateAllowedProperties } from '@utils/api/clean'
import { NextApiRequest } from 'next'
import Budget from './model'
import { verifyBudgetId } from './utils'

export const updateBudget = async (userId: string, req: NextApiRequest) => {
  // Verify if the given bugdet id (req.query.id) belongs to the authenticated user
  await verifyBudgetId(req.query.id as string, userId)

  // If the category property is modified, verify if it's existed in the user categories
  if (req.body?.category) await verifyCategoryId(req.body.category, userId)

  const budget = await Budget.findOne({ _id: req.query.id, user: userId })
  updateAllowedProperties(
    ['money', 'description', 'date', 'category'],
    req,
    budget
  )

  await budget.save()

  return budget
}
