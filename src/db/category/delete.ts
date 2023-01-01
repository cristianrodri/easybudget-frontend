import { NextApiRequest } from 'next'
import Category from './model'
import { verifyCategoryId } from './utils'

export const deleteCategory = async (userId: string, req: NextApiRequest) => {
  const verifiedCategory = await verifyCategoryId(
    req.query.id as string,
    userId,
    true
  )

  if (verifiedCategory.budgets.length > 0)
    throw new Error('Categories with related budgets cannot be deleted')

  const category = await Category.findOneAndDelete({
    _id: req.query.id,
    user: userId
  })

  return category
}
