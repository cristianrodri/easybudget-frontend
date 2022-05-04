import { useContext } from 'react'
import { Budget, Url } from '@custom-types'
import useSWR from 'swr'
import { clientGetApi } from '@config/api_client'
import { Context } from '@context/GlobalContext'
import { EditBudgetTypes } from './useBudgetFormik'
import { isBeforeDate } from '@utils/dates'
import { getCategoryDataFromBudget } from '@utils/budget'
import { useUserData } from './useSWRUser'
import { budgetHasBeenReloaded, isReloadingBudget } from '@context/actions'

const fetcher = (url: Url) =>
  clientGetApi<Budget[]>(url).then(res => res.success === true && res.data)

export const useSWRLatestBudgets = () => {
  const LIMIT_BUDGETS = 5
  const API_URL = `api/budget/get?_sort=date:DESC&_limit=${LIMIT_BUDGETS}&_categorydata=true`
  const { values, dispatch } = useContext(Context)
  const { budgetToUpdate } = values
  const { data: userData } = useUserData()
  const { data, mutate } = useSWR(API_URL, fetcher)

  const reloadAPI = () => {
    mutate(async prevBudgets => {
      dispatch(isReloadingBudget())

      const res = await clientGetApi<Budget[]>(API_URL)

      return res.success === true ? res.data : prevBudgets
    }).then(() => dispatch(budgetHasBeenReloaded()))
  }

  /* MUTATE BY ADDING */
  // This function will be called after a budget is created in post API
  const mutateByAddingNewBudget = (newBudget: Budget) => {
    const updatedBudgets = [newBudget, ...data.slice(0, LIMIT_BUDGETS - 1)]

    mutate(updatedBudgets, false)
  }

  /* MUTATE BY DELETING */
  // This function will be called to delete a budget by mutating it if some budget has been deleted
  const mutateBydeletingBudget = (budget: Budget) => {
    const filteredBudgets = data.filter(b => b.id !== budget.id)

    // Check if budget has been deleted by comparing the current length with the new length
    if (filteredBudgets.length !== data.length) {
      reloadAPI()
    }
  }

  /* MUTATE BY EDITING */
  // This function will be called to update a budget by mutating it if the updated budgets belongs to latest budgets data
  const mutateByEditionBudget = (budgetEditionForm: EditBudgetTypes) => {
    const foundBudget = data.find(budget => budget.id === budgetToUpdate.id)

    /*
      If budgetToUpdate id is found into the Latest budgets data (by foundBudget):
        - firstly verify if the date of the budgetEditionForm is before than the last budget of the Latest budgets data, if it is, then just update the LatestBudgets by reloading the API. Otherwise update the latest budget data by mapping the latest budgets and then mutate it
    */
    if (foundBudget) {
      const lastBudget = data[LIMIT_BUDGETS - 1]

      if (isBeforeDate(budgetEditionForm.date, lastBudget.date)) {
        reloadAPI()
        return
      }

      const updatedBudgets = data.map(budget => {
        if (budget.id === budgetToUpdate.id) {
          budget.category = getCategoryDataFromBudget(
            budgetEditionForm.categoryId as number,
            userData.categories
          )
          budget.date = new Date(budgetEditionForm.date).toISOString()
          budget.description = budgetEditionForm.description
          budget.money = budgetEditionForm.money

          return budget
        }

        return budget
      })

      mutate(updatedBudgets, false)
    }
  }

  return {
    data,
    mutate,
    mutateByAddingNewBudget,
    mutateBydeletingBudget,
    mutateByEditionBudget
  }
}
