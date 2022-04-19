import useSWR from 'swr'
import { clientInstance as axios } from '@config/axios'
import { AddCategory, Budget, User } from '@custom-types'

interface Dates {
  start: string
  end: string
}

interface ApiResponse {
  success: boolean
  user: User
}

// Fetcher function when useSWR hook api is called
const fetcher = (url: string) =>
  axios.get<ApiResponse>(url).then(res => res.data.user)

// Custom hook which get user data by useSWR hook
export const useUserData = (date?: Dates) => {
  const API = date
    ? `/api/user/get?budgets_date_start=${date.start}&budgets_date_end=${date.end}`
    : '/api/user/get'

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
