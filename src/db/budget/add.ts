import { NextApiRequest } from 'next'
import { verifyCategoryId } from '@db/category/utils'
import Budget from './model'
import { ObjectId } from 'mongoose'
import { AddCategory } from '@custom-types'

export const createBudget = async (userId: string, req: NextApiRequest) => {
  // Verify if the give category id (req.body.category) belongs to the authenticated user
  const category = await verifyCategoryId(req.body.category, userId)

  const budget = new Budget(req.body)
  budget.user = userId as unknown as ObjectId
  budget.date = new Date()

  await budget.save()

  budget.category = category as AddCategory

  return budget
}
