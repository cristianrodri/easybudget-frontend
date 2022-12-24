import Category from './model'
import { BudgetType } from '@utils/enums'
import { ObjectId } from 'mongoose'
import { verifyCategoryWithNameAndType } from './utils'

export const addCategory = async (
  userId: string,
  name: string,
  type: BudgetType
) => {
  await verifyCategoryWithNameAndType(userId, name, type)

  // Add the new category if the both name and type doesn't exist together
  const category = new Category({ name, type })
  category.user = userId as unknown as ObjectId

  await category.save()

  return category
}
