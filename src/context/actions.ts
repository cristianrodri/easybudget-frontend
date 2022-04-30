import {
  BudgetHasBeenDeleted,
  CategoryDialog,
  ChangeWalletDate,
  CloseCategoryDialog,
  CloseSnackbar,
  DialogDeletionClose,
  DialogDeletionOpen,
  IsDeletingBudget,
  OpenSnackbar,
  ShowCategoryDialog
} from './types'
import { Action } from './enum'
import { SnackbarType } from '@utils/enums'
import { Budget } from '@custom-types'

export const openSnackbar = (
  message: string,
  type: SnackbarType
): OpenSnackbar => {
  return {
    type: Action.OPEN_SNACKBAR,
    payload: {
      message,
      type
    }
  }
}

export const closeSnackbar = (): CloseSnackbar => {
  return { type: Action.CLOSE_SNACKBAR }
}

export const changeWalletDate = (
  date: string,
  allMonths?: boolean,
  allTime?: boolean
): ChangeWalletDate => {
  return {
    type: Action.CHANGE_WALLET_DATE,
    payload: {
      year: allTime ? 'all' : new Date(date).getFullYear(),
      month: allMonths ? 'all' : new Date(date).getMonth()
    }
  }
}

export const showCategoryDialog = (
  category: CategoryDialog
): ShowCategoryDialog => {
  return {
    type: Action.OPEN_CATEGORY_DIALOG,
    payload: category
  }
}

export const closeCategoryDialog = (): CloseCategoryDialog => {
  return { type: Action.CLOSE_CATEGORY_DIALOG }
}

export const openDialogDeletion = (budget: Budget): DialogDeletionOpen => {
  return { type: Action.DIALOG_DELETION_OPEN, payload: budget }
}

export const closeDialogDeletion = (): DialogDeletionClose => {
  return { type: Action.DIALOG_DELETION_CLOSE }
}

export const isDeletingBudget = (): IsDeletingBudget => {
  return { type: Action.IS_DELETING_BUDGET }
}

export const budgetHasBeenDeleted = (): BudgetHasBeenDeleted => {
  return { type: Action.BUDGET_HAS_BEEN_DELETED }
}

export type ActionType =
  | OpenSnackbar
  | CloseSnackbar
  | ChangeWalletDate
  | ShowCategoryDialog
  | CloseCategoryDialog
  | DialogDeletionOpen
  | DialogDeletionClose
  | IsDeletingBudget
  | BudgetHasBeenDeleted
