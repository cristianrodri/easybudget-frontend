import {
  BudgetHasBeenDeleted,
  CategoryDialog,
  ChangeWalletDate,
  ClearGlobalState,
  CloseCategoryDialog,
  CloseSnackbar,
  DialogDeletionClose,
  DialogDeletionOpen,
  DialogEditionClose,
  DialogEditionOpen,
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

export const openDialogEdition = (budget: Budget): DialogEditionOpen => {
  return { type: Action.DIALOG_EDITION_OPEN, payload: budget }
}

export const closeDialogEdition = (): DialogEditionClose => {
  return { type: Action.DIALOG_EDITION_CLOSE }
}

export const clearGlobalState = (): ClearGlobalState => {
  return { type: Action.CLEAR_GLOBAL_STATE }
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
  | DialogEditionOpen
  | DialogEditionClose
  | ClearGlobalState
