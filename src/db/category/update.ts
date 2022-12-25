import { updateAllowedProperties } from '@utils/api/clean'
import { NextApiRequest } from 'next'
import Category from './model'
import { verifyCategoryId, verifyCategoryWithNameAndType } from './utils'

export const updateCategory = async (userId: string, req: NextApiRequest) => {
  const { name, type } = req.body

  // Verify if the given category id (req.query.id) belongs to the authenticated user
  await verifyCategoryId(req.query.id as string, userId)

  // Find out if the category with the given name and type exists. If one is found, throw an error
  await verifyCategoryWithNameAndType(userId, name, type)

  // If no one is found, update the category
  const category = await Category.findOne({ _id: req.query.id, user: userId })
  updateAllowedProperties(['name', 'type'], req, category)

  await category.save()

  return category
}
