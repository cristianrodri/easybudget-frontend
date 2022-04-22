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
  categoryDialog: {
    budgets: [],
    money: 0,
    name: '',
    type: null
  }
}

export const reducer = (state = initialState, action: ActionType) => {
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

    case Action.CATEGORY_DIALOG:
      return {
        ...state,
        categoryDialog: action.payload
      }

    default:
      return state
  }
}
