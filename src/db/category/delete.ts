import { NextApiRequest } from 'next'
import Category from './model'
import { verifyCategoryId } from './utils'

export const deleteCategory = async (userId: string, req: NextApiRequest) => {
  await verifyCategoryId(req.query.id as string, userId)

  const category = await Category.findOneAndDelete({
    _id: req.query.id,
    user: userId
  })

  return category
}
