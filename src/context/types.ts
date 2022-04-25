import { CategoryTypes } from '@custom-types'
import { SnackbarType } from '@utils/enums'
import { Action } from './enum'

// Context
export type CategoryDialog = Omit<CategoryTypes, 'id'>

export interface WalletDate {
  year: number | 'all'
  month: number | 'all'
}
export interface ContextValues {
  // Snackbar state
  snackbarOpen: boolean
  snackbarMessage: string
  snackbarType: SnackbarType

  // Wallet date state
  walletDate: WalletDate

  // Category dialog state
  categoryDialog: CategoryDialog
  categoryDialogOpen: boolean

  // Budget deletion dialog
  dialogDeletionOpen: boolean
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
  payload: WalletDate
}

export type ShowCategoryDialog = {
  type: Action.OPEN_CATEGORY_DIALOG
  payload: CategoryDialog
}

export type CloseCategoryDialog = {
  type: Action.CLOSE_CATEGORY_DIALOG
}

export type DialogDeletionOpen = {
  type: Action.DIALOG_DELETION_OPEN
}

export type DialogDeletionClose = {
  type: Action.DIALOG_DELETION_CLOSE
}
