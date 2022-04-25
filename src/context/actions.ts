import {
  CategoryDialog,
  ChangeWalletDate,
  CloseCategoryDialog,
  CloseSnackbar,
  DialogDeletionClose,
  DialogDeletionOpen,
  OpenSnackbar,
  ShowCategoryDialog
} from './types'
import { Action } from './enum'
import { SnackbarType } from '@utils/enums'

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

export const openDialogDeletion = (): DialogDeletionOpen => {
  return { type: Action.DIALOG_DELETION_OPEN }
}

export const closeDialogDeletion = (): DialogDeletionClose => {
  return { type: Action.DIALOG_DELETION_CLOSE }
}

export type ActionType =
  | OpenSnackbar
  | CloseSnackbar
  | ChangeWalletDate
  | ShowCategoryDialog
  | CloseCategoryDialog
  | DialogDeletionOpen
  | DialogDeletionClose
