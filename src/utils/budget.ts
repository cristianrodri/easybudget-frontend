import { AddCategory, Budget, CategoryTypes, GetCategory } from '@custom-types'
import { sortBudgetsByDescDate } from './dates'

// As category property into budget may be a number (related to category id) or AddCategory type which is related to some category data, this function try to get the category data in the same way, no matter the type of category is received by parameter
export const getCategoryDataFromBudget = (
  category: string | AddCategory,
  categories: GetCategory[]
): AddCategory => {
  // If the category type is a string, get the data by categories data which may come from user data
  if (typeof category === 'string') {
    const matchedCategory = categories.find(c => c.id === category)

    return {
      id: matchedCategory.id,
      type: matchedCategory.type,
      name: matchedCategory.name
    }
  }

  return { id: category.id, type: category.type, name: category.name }
}

// Add a budget into some category budgets property
export const addBudgetToCategory = (
  category: CategoryTypes,
  budget: Budget
) => {
  category.budgets = [...category.budgets, budget].sort(sortBudgetsByDescDate)
  category.money += budget.money

  return category
}

// Update a budget into budgets property from category
export const updateBudgetFromCategory = (
  category: CategoryTypes,
  prevBudget: Budget,
  updatedBudget: Budget
) => {
  category.budgets = category.budgets.map(b => {
    if (b.id === updatedBudget.id) {
      return {
        ...updatedBudget,
        id: b.id,
        date: new Date(updatedBudget.date).toISOString()
      }
    }

    return b
  })
  category.money -= prevBudget.money
  category.money += updatedBudget.money

  return category
}

// Delete a budget into budgets property from category
export const deleteBudgetFromCategory = (
  category: CategoryTypes,
  budget: Budget
) => {
  category.budgets = category.budgets.filter(b => b.id !== budget.id)
  category.money -= budget.money

  return category
}
