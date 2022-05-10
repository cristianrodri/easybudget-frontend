import {
  BudgetHasBeenReloaded,
  ChangeWalletDate,
  ClearGlobalState,
  CloseCategoryDialog,
  CloseSnackbar,
  DialogDeletionClose,
  DialogDeletionOpen,
  DialogEditionClose,
  DialogEditionOpen,
  IsReloadingBudget,
  OpenSnackbar,
  ShowCategoryDialog,
  WalletDateValue
} from './types'
import { Action } from './enum'
import { DateType, SnackbarType } from '@utils/enums'
import { Budget, CategoryTypes } from '@custom-types'

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
  dateType: DateType,
  value: WalletDateValue
): ChangeWalletDate => {
  return {
    type: Action.CHANGE_WALLET_DATE,
    payload: { dateType, value }
  }
}

export const showCategoryDialog = (
  category: CategoryTypes
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

export const isReloadingBudget = (): IsReloadingBudget => {
  return { type: Action.IS_RELOADING_BUDGET }
}

export const budgetHasBeenReloaded = (): BudgetHasBeenReloaded => {
  return { type: Action.BUDGET_HAS_BEEN_RELOADED }
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
  | IsReloadingBudget
  | BudgetHasBeenReloaded
  | DialogEditionOpen
  | DialogEditionClose
  | ClearGlobalState
