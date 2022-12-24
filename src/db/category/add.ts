import Category from './model'
import { BudgetType } from '@utils/enums'
import { textCapitalize } from '@utils/string'

export const addCategory = async (
  userId: string,
  name: string,
  type: BudgetType
) => {
  if (!name) throw new Error('Name must be provided')
  if (!type) throw new Error('Type must be provided')

  const category = await Category.findOne({
    owner: userId,
    name,
    type
  })

  if (category)
    throw new Error(
      `${textCapitalize(name)} already exists in ${type} category`
    )

  // Add the new category if the both name and type doesn't exist together
  const newCategory = new Category({ owner: userId, name, type })

  await newCategory.save()

  return newCategory
}
