import Category from './model'
import { BudgetType } from '@utils/enums'
import { textCapitalize } from '@utils/string'
import { ObjectId } from 'mongoose'

export const addCategory = async (
  userId: string,
  name: string,
  type: BudgetType
) => {
  if (!name) throw new Error('Name must be provided')
  if (!type) throw new Error('Type must be provided')

  const category = await Category.findOne({
    user: userId,
    name,
    type
  })

  if (category)
    throw new Error(
      `${textCapitalize(name)} already exists in ${type} category`
    )

  // Add the new category if the both name and type doesn't exist together
  const newCategory = new Category({ name, type })
  newCategory.user = userId as unknown as ObjectId

  await newCategory.save()

  return newCategory
}
