import { useContext } from 'react'
import useSWR from 'swr'
import { AddCategory, Budget, User } from '@custom-types'
import { clientGetApi } from '@config/api_client'
import { Context } from '@context/GlobalContext'
import { getCustomDate } from '@utils/dates'

// Fetcher function when useSWR hook api is called
const fetcher = (url: string) =>
  clientGetApi<User>(url).then(res => res.success === true && res.data)

// Custom hook which get user data by useSWR hook
export const useUserData = () => {
  const {
    values: { walletDate }
  } = useContext(Context)

  const customDate = getCustomDate(walletDate)

  const API =
    walletDate.year !== 'all'
      ? `api/user/get?budgets_date_start=${customDate.start}&budgets_date_end=${customDate.end}`
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
