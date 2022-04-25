import { ApiResponseSuccess, Budget } from '@custom-types'
import useSWR from 'swr'
import { clientInstance as axios } from '@config/axios'

const fetcher = (url: string) =>
  axios.get<ApiResponseSuccess<Budget[]>>(url).then(res => res.data.data)

export const useSWRLatestBudgets = () => {
  const LIMIT_BUDGETS = 5

  const { data, mutate } = useSWR(
    `/api/budget/get?_sort=date:DESC&_limit=${LIMIT_BUDGETS}&_categorydata=true`,
    fetcher
  )

  // This function will be called after a budget is created in post API
  const mutateByAddingNewBudget = (newBudget: Budget) => {
    const updatedBudgets = [newBudget, ...data.slice(0, LIMIT_BUDGETS - 1)]

    mutate(updatedBudgets, false)
  }

  return { data, mutate, mutateByAddingNewBudget }
}
