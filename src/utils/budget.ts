import { AddCategory, GetCategory } from '@custom-types'

// As category property into budget may be a number (related to category id) or AddCategory type which is related to some category data, this function try to get the category data in the same way, no matter the type of category is received by parameter
export const getCategoryDataFromBudget = (
  category: number | AddCategory,
  categories: GetCategory[]
): AddCategory => {
  // If the category type is a number, get the data by categories data which may come from user data
  if (typeof category === 'number') {
    const matchedCategory = categories.find(c => c.id === category)

    return {
      id: matchedCategory.id,
      type: matchedCategory.type,
      name: matchedCategory.name
    }
  }

  return { id: category.id, type: category.type, name: category.name }
}

// Get the id and the type
