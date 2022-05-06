import { useContext } from 'react'
import useSWR from 'swr'
import { Budget, CategoryTypes, User } from '@custom-types'
import { clientGetApi } from '@config/api_client'
import { Context } from '@context/GlobalContext'
import { dateIsBetween, getCustomDate, isAllTime } from '@utils/dates'
import { showCategoryDialog } from '@context/actions'
import { EditBudgetTypes } from './useBudgetFormik'
import {
  addBudgetToCategory,
  deleteBudgetFromCategory,
  getCategoryDataFromBudget,
  updateBudgetFromCategory
} from '@utils/budget'

// Fetcher function when useSWR hook api is called
const fetcher = (url: string) =>
  clientGetApi<User>(url).then(res => (res.success === true ? res.data : null))

// Custom hook which get user data by useSWR hook
export const useUserData = () => {
  const {
    values: { walletDate, categoryDialog, categoryDialogOpen, budgetToUpdate },
    dispatch
  } = useContext(Context)

  const customDate = getCustomDate(walletDate)

  // If wallet year is all, it means that the API should receive all the budgets from the categories
  const API =
    walletDate.year !== 'all'
      ? `api/user/get?budgets_date_start=${customDate.start}&budgets_date_end=${customDate.end}`
      : 'api/user/get'

  const { data, mutate } = useSWR(API, fetcher)

  // Check if the budget which will be updated, its date belongs to the wallet date
  const budgetExistInCategories = () => {
    // If the walletDate is all time, the budgets automatically exists into the categories data
    if (isAllTime(walletDate)) return true

    const budgetExist = data.categories.some(c =>
      c.budgets.some(b => b.id === budgetToUpdate.id)
    )

    return budgetExist
  }

  const updateCategoryDialogData = (category: CategoryTypes) => {
    if (categoryDialogOpen) {
      // Update the category dialog with the "updated category data" ONLY if the category dialog is open, because the only purpose of dispatching the category dialog is for updating the category data doing before by deleting the budget and subtracting the money
      dispatch(showCategoryDialog(category))
    }
  }

  // This function will be called before a budget is created in post API
  const mutateByAddingBudgetToCategory = (newBudget: Budget) => {
    const mutatedData = { ...data }

    mutatedData.categories.map(c => {
      // If the category is related with the new budget, add it to budgets array and update the money
      if (
        c.id ===
        getCategoryDataFromBudget(newBudget.category, mutatedData.categories).id
      )
        return addBudgetToCategory(c, newBudget)
    })

    mutate(mutatedData, false)
  }

  // This function will be called before a budget is deleted in delete API
  const mutateCategoryByDeletingBudget = (budget: Budget) => {
    const mutatedData = { ...data }

    // Search for the category which the budget belongs to
    mutatedData.categories.map(c => {
      const updatedBudgets = c.budgets.filter(b => b.id !== budget.id)

      // If the updated budgets is less than the previous budgets, the deleted budget belongs to this category, then the budgets property should be updated and the money property should be subtracted
      if (updatedBudgets.length < c.budgets.length) {
        // Update the budgets property with the filtered budgets and subtract the money of deleted budget
        c.budgets = updatedBudgets
        c.money -= budget.money

        updateCategoryDialogData(c)
      }

      return c
    })

    mutate(mutatedData, false)
  }

  // This function will be called before a budget is updated in update API
  const mutateCategoryByEditingBudget = (budgetForm: EditBudgetTypes) => {
    const mutatedData = { ...data }

    if (budgetExistInCategories()) {
      // If the date of the updated budget is no longer between wallet date, delete that budget from category
      if (!dateIsBetween(walletDate, budgetForm.date)) {
        mutateCategoryByDeletingBudget(budgetToUpdate)

        return
      }

      // Otherwise the date of the updated budget still belongs to the wallet date, therefore update the necessary categories, the one which the budget is added, the one which the budget is deleted or the one which the budget is updated
      mutatedData.categories.map(c => {
        const hasBudget = c.budgets.some(b => b.id === budgetToUpdate.id)

        // If one category has the budget into its budgets property and the updated budget has another category id, then the budget of the current category must be deleted
        if (hasBudget && c.id !== budgetForm.category) {
          const category = deleteBudgetFromCategory(c, budgetToUpdate)

          if (categoryDialog.id === c.id) updateCategoryDialogData(category)
          return category

          // The current category didn't have the updated budget but now the budget belongs to it. In this case add the budget to budgets property and sum the money
        } else if (!hasBudget && c.id === budgetForm.category) {
          const category = addBudgetToCategory(c, {
            ...budgetForm,
            id: budgetToUpdate.id,
            category: budgetForm.category
          })

          if (categoryDialog.id === c.id) updateCategoryDialogData(category)
          return category

          // The current category have the updated budget and the updated budget have the same category. In this case only update the budgets property by updating the related budget and update the money
        } else if (hasBudget && c.id === budgetForm.category) {
          const category = updateBudgetFromCategory(c, budgetToUpdate, {
            ...budgetForm,
            id: budgetToUpdate.id,
            category: budgetForm.category
          })

          if (categoryDialog.id === c.id) updateCategoryDialogData(category)
          return category
        }

        return c
      })

      mutate(mutatedData, false)
      return
    }

    // If the budget does not exist into category, but the updated date matches the wallet date, the budget should be added into its category. This time the updated budget comes from LatestBudgets component
    mutatedData.categories.map(c => {
      if (c.id === budgetForm.category) {
        return addBudgetToCategory(c, {
          ...budgetForm,
          id: budgetToUpdate.id,
          category: budgetForm.category
        })
      }
    })

    mutate(mutatedData, false)
  }

  return {
    data,
    mutate,
    mutateByAddingBudgetToCategory,
    mutateCategoryByDeletingBudget,
    mutateCategoryByEditingBudget
  }
}
