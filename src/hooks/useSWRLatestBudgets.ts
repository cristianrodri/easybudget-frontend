import { useContext } from 'react'
import { Budget } from '@custom-types'
import useSWR from 'swr'
import { clientGetApi } from '@config/api_client'
import { Context } from '@context/GlobalContext'
import { EditBudgetTypes } from './useBudgetFormik'
import { isBeforeDate, sortBudgetsByDescDate } from '@utils/dates'
import { getCategoryDataFromBudget } from '@utils/budget'
import { useUserData } from './useSWRUser'
import { budgetHasBeenReloaded, isReloadingBudget } from '@context/actions'
import { useFetcher } from './useFetcher'

export const useSWRLatestBudgets = () => {
  const LIMIT_BUDGETS = 5
  const { fetcher } = useFetcher<Budget[]>()
  const API_URL = `api/budget/get?limit=${LIMIT_BUDGETS}`
  const { values, dispatch } = useContext(Context)
  const { budgetToUpdate } = values
  const { data: userData } = useUserData()
  const { data, mutate } = useSWR(API_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  const reloadLatestBudgetsAPI = async () => {
    return mutate(async prevBudgets => {
      const res = await clientGetApi<Budget[]>(API_URL)

      return res.success === true ? res.data : prevBudgets
    }).then(() => dispatch(budgetHasBeenReloaded()))
  }

  // Reload Latest Budgets component by dispatching isReloadingBudget from global state
  const reloadLatestBudgets = () => {
    dispatch(isReloadingBudget())
  }

  /* MUTATE BY ADDING */
  // This function will be called after a budget is created in post API
  const mutateByAddingNewBudget = (newBudget: Budget) => {
    const updatedBudgets = [newBudget, ...data.slice(0, LIMIT_BUDGETS - 1)]

    mutate(updatedBudgets, false)
  }

  /* MUTATE BY DELETING */
  // Check if some budget has been deleted by comparing the current length with the new length
  const isDeletedBudgetFromLatest = (budget: Budget) => {
    const filteredBudgets = data.filter(b => b.id !== budget.id)

    if (filteredBudgets.length !== data.length) return true

    return false
  }

  // This function make Latest Budgets loading if deleted budget comes from "Latest Budgets"
  const loadLatestBudgetsByDeleting = (budget: Budget) => {
    if (isDeletedBudgetFromLatest(budget)) {
      reloadLatestBudgets()
    }
  }

  /* MUTATE BY EDITING */

  // Check if the updated budget date is moved backwards from the last budget date into the "Latest Budgets"
  const isDateBudgetMovedBackwards = (updatedBudgetDate: Date | string) => {
    const lastBudget = data[LIMIT_BUDGETS - 1]

    if (isBeforeDate(updatedBudgetDate, lastBudget.date)) return true

    return false
  }

  // This function will be called to update a budget by mutating it if the updated budgets belongs to latest budgets data
  const mutateByEditionBudget = (budgetEditionForm: EditBudgetTypes) => {
    const mutatedData = [...data]
    const foundBudget = mutatedData.find(
      budget => budget.id === budgetToUpdate.id
    )

    /*
      If budgetToUpdate id is found into the Latest budgets data (by foundBudget):
        - firstly verify if the date of the budgetEditionForm is before than the last budget of the Latest budgets data, if it is, call the reloadLatestBudgets function make the LatestBudgets component loading . Otherwise update the latest budget data by mapping the latest budgets and then mutate it
    */
    if (foundBudget) {
      if (isDateBudgetMovedBackwards(budgetEditionForm.date)) {
        reloadLatestBudgets()
        return
      }

      const updatedBudgets = mutatedData
        .map(budget => {
          if (budget.id === budgetToUpdate.id) {
            budget.category = getCategoryDataFromBudget(
              budgetEditionForm.category as string,
              userData.categories
            )
            budget.date = new Date(budgetEditionForm.date).toISOString()
            budget.description = budgetEditionForm.description
            budget.money = budgetEditionForm.money

            return budget
          }

          return budget
        })
        .sort(sortBudgetsByDescDate)

      mutate(updatedBudgets, false)
    }
  }

  return {
    data,
    mutate,
    mutateByAddingNewBudget,
    loadLatestBudgetsByDeleting,
    mutateByEditionBudget,
    isDeletedBudgetFromLatest,
    isDateBudgetMovedBackwards,
    reloadLatestBudgetsAPI
  }
}
