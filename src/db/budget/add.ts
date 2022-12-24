import { NextApiRequest } from 'next'
import { verifyCategoryId } from '@db/category/utils'
import Budget from './model'
import { ObjectId } from 'mongoose'

export const createBudget = async (userId: string, req: NextApiRequest) => {
  await verifyCategoryId(req.body.category, userId)

  const budget = new Budget(req.body)
  budget.user = userId as unknown as ObjectId

  await budget.save()

  return budget
}
