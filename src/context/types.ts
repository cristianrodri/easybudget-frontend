import { CategoryTypes } from '@custom-types'
import { SnackbarType } from '@utils/enums'
import { Action } from './enum'

// Context
export type CategoryDialog = Omit<CategoryTypes, 'id'>

interface WalletDate {
  year: number | string
  month: number | string
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
  type: Action.CATEGORY_DIALOG
  payload: CategoryDialog
}
