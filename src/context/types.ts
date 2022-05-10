import { Budget, CategoryTypes } from '@custom-types'
import { DateType, SnackbarType } from '@utils/enums'
import { Action } from './enum'

export type WalletDateValue = number | 'all'

export interface WalletDate {
  year: WalletDateValue
  month: WalletDateValue
}
export interface ContextValues {
  // Snackbar state
  snackbarOpen: boolean
  snackbarMessage: string
  snackbarType: SnackbarType

  // Wallet date state
  walletDate: WalletDate

  // Category dialog state
  categoryDialog: CategoryTypes
  categoryDialogOpen: boolean

  // Budget deletion dialog
  dialogDeletionOpen: boolean
  budgetToDelete: Budget
  isReloadingBudget: boolean

  // Budget edition dialog
  dialogEditionOpen: boolean
  budgetToUpdate: Budget
}

export type OpenSnackbar = {
  type: Action.OPEN_SNACKBAR
  payload: {
    message: string
    type: SnackbarType
  }
}

export type CloseSnackbar = {
  type: Action.CLOSE_SNACKBAR
}

export type ChangeWalletDate = {
  type: Action.CHANGE_WALLET_DATE
  payload: { dateType: DateType; value: WalletDateValue }
}

export type ShowCategoryDialog = {
  type: Action.OPEN_CATEGORY_DIALOG
  payload: CategoryTypes
}

export type CloseCategoryDialog = {
  type: Action.CLOSE_CATEGORY_DIALOG
}

export type DialogDeletionOpen = {
  type: Action.DIALOG_DELETION_OPEN
  payload: Budget
}

export type DialogDeletionClose = {
  type: Action.DIALOG_DELETION_CLOSE
}

export type IsReloadingBudget = {
  type: Action.IS_RELOADING_BUDGET
}

export type BudgetHasBeenReloaded = {
  type: Action.BUDGET_HAS_BEEN_RELOADED
}

export type DialogEditionOpen = {
  type: Action.DIALOG_EDITION_OPEN
  payload: Budget
}

export type DialogEditionClose = {
  type: Action.DIALOG_EDITION_CLOSE
}

export type ClearGlobalState = {
  type: Action.CLEAR_GLOBAL_STATE
}
