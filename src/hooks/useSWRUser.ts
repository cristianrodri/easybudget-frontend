import { useContext } from 'react'
import useSWR from 'swr'
import { AddCategory, Budget, User } from '@custom-types'
import { clientGetApi } from '@config/api_client'
import { Context } from '@context/GlobalContext'
import { getCustomDate } from '@utils/dates'
import { showCategoryDialog } from '@context/actions'

// Fetcher function when useSWR hook api is called
const fetcher = (url: string) =>
  clientGetApi<User>(url).then(res => (res.success === true ? res.data : null))

// Custom hook which get user data by useSWR hook
export const useUserData = () => {
  const {
    values: { walletDate, categoryDialogOpen },
    dispatch
  } = useContext(Context)

  const customDate = getCustomDate(walletDate)

  const API =
    walletDate.year !== 'all'
      ? `api/user/get?budgets_date_start=${customDate.start}&budgets_date_end=${customDate.end}`
      : 'api/user/get'

  const { data, mutate } = useSWR(API, fetcher)

  // This function will be called before a budget is created in post API
  const mutateByAddingBudgetToCategory = (newBudget: Budget) => {
    const mutatedData = { ...data }

    mutatedData.categories.map(c => {
      // If the category is related with the new budget, add it to budgets array and update the money
      if (c.id === (newBudget.category as AddCategory).id) {
        c.budgets = [...c.budgets, newBudget]
        c.money += newBudget.money
      }

      return c
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

        if (categoryDialogOpen) {
          // Update the category dialog with the "updated category data" ONLY if the category dialog is open, because the only purpose of dispatching the category dialog is for updating the category data doing before by deleting the budget and subtracting the money
          dispatch(showCategoryDialog(c))
        }
      }

      return c
    })

    mutate(mutatedData, false)
  }

  return {
    data,
    mutate,
    mutateByAddingBudgetToCategory,
    mutateCategoryByDeletingBudget
  }
}
