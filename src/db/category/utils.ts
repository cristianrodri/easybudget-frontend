import { BudgetType } from '@utils/enums'
import { textCapitalize } from '@utils/string'
import Category from './model'

export const verifyCategoryWithNameAndType = async (
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
}

export const verifyCategoryId = async (categoryId: string, userId: string) => {
  const category = await Category.findOne({ _id: categoryId, user: userId })

  if (!category) throw new Error('The category id is not found')

  return category
}
