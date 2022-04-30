import { useContext } from 'react'
import { Budget, Url } from '@custom-types'
import useSWR from 'swr'
import { clientGetApi } from '@config/api_client'
import { Context } from '@context/GlobalContext'
import { budgetHasBeenDeleted, isDeletingBudget } from '@context/actions'

const fetcher = (url: Url) =>
  clientGetApi<Budget[]>(url).then(res => res.success === true && res.data)

export const useSWRLatestBudgets = () => {
  const LIMIT_BUDGETS = 5
  const API_URL = `api/budget/get?_sort=date:DESC&_limit=${LIMIT_BUDGETS}&_categorydata=true`
  const { dispatch } = useContext(Context)
  const { data, mutate } = useSWR(API_URL, fetcher)

  // This function will be called after a budget is created in post API
  const mutateByAddingNewBudget = (newBudget: Budget) => {
    const updatedBudgets = [newBudget, ...data.slice(0, LIMIT_BUDGETS - 1)]

    mutate(updatedBudgets, false)
  }

  // This function will be called to delete a budget by mutating it if some budget has been deleted
  const mutateBydeletingBudget = (budget: Budget) => {
    const filteredBudgets = data.filter(b => b.id !== budget.id)

    // Check if budget has been deleted by comparing the current length with the new length
    if (filteredBudgets.length !== data.length) {
      mutate(async prevBudgets => {
        dispatch(isDeletingBudget())

        const res = await clientGetApi<Budget[]>(API_URL)

        return res.success === true ? res.data : prevBudgets
      }).then(() => dispatch(budgetHasBeenDeleted()))
    }
  }

  return { data, mutate, mutateByAddingNewBudget, mutateBydeletingBudget }
}
