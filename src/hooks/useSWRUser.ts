import useSWR from 'swr'
import { AddCategory, ApiResponseSuccess, Budget, User } from '@custom-types'
import { clientGetApi } from '@config/api_client'

interface Dates {
  start: string
  end: string
}

// Fetcher function when useSWR hook api is called
const fetcher = (url: string) =>
  clientGetApi<ApiResponseSuccess<User>>(url).then(res => res.data.data)

// Custom hook which get user data by useSWR hook
export const useUserData = (date?: Dates) => {
  const API = date
    ? `api/user/get?budgets_date_start=${date.start}&budgets_date_end=${date.end}`
    : 'api/user/get'

  const { data, mutate } = useSWR(API, fetcher)

  // This function will be called after a budget is created in post API
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

  return { data, mutate, mutateByAddingBudgetToCategory }
}
