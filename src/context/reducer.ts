import { ContextValues } from './types'
import { ActionType } from './actions'
import { Action } from './enum'

export const initialState: ContextValues = {
  snackbarOpen: false,
  snackbarMessage: '',
  snackbarType: null,
  walletDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  },
  categoryDialogOpen: false,
  categoryDialog: {
    budgets: [],
    money: 0,
    name: '',
    type: null
  },
  dialogDeletionOpen: false,
  budgetToDelete: null,
  isReloadingBudget: false,
  dialogEditionOpen: false,
  budgetToUpdate: null
}

export const reducer = (
  state = initialState,
  action: ActionType
): ContextValues => {
  switch (action.type) {
    case Action.OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpen: true,
        snackbarMessage: action.payload.message,
        snackbarType: action.payload.type
      }

    case Action.CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpen: false
      }

    case Action.CHANGE_WALLET_DATE:
      return {
        ...state,
        walletDate: action.payload
      }

    case Action.OPEN_CATEGORY_DIALOG:
      return {
        ...state,
        categoryDialogOpen: true,
        categoryDialog: action.payload
      }

    case Action.CLOSE_CATEGORY_DIALOG:
      return {
        ...state,
        categoryDialogOpen: false
      }

    case Action.DIALOG_DELETION_OPEN:
      return {
        ...state,
        dialogDeletionOpen: true,
        budgetToDelete: action.payload
      }

    case Action.DIALOG_DELETION_CLOSE:
      return {
        ...state,
        dialogDeletionOpen: false,
        budgetToDelete: null
      }

    case Action.IS_RELOADING_BUDGET:
      return {
        ...state,
        isReloadingBudget: true
      }

    case Action.BUDGET_HAS_BEEN_RELOADED:
      return {
        ...state,
        isReloadingBudget: false,
        budgetToDelete: null
      }

    case Action.DIALOG_EDITION_OPEN:
      return {
        ...state,
        dialogEditionOpen: true,
        budgetToUpdate: action.payload
      }

    case Action.DIALOG_EDITION_CLOSE:
      return {
        ...state,
        dialogEditionOpen: false,
        budgetToUpdate: null
      }

    case Action.CLEAR_GLOBAL_STATE:
      return initialState

    default:
      return state
  }
}
