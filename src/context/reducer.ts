import { CategoryTypes } from '@custom-types'
import { SnackbarType } from '@utils/enums'
import { ActionType } from './actions'
import { CATEGORY_DIALOG, CHANGE_WALLET_DATE, OPEN_SNACKBAR } from './names'

export interface ContextProps {
  // Snackbar state
  snackbarOpen: boolean
  snackbarMessage: string
  snackbarType: SnackbarType

  // Wallet date state
  walletDate: {
    year: number
    month: number
  }

  // Category dialog state
  categoryDialog: Omit<CategoryTypes, 'id'>
}

export const initialState: ContextProps = {
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
    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpen: true,
        snackbarMessage: action.payload,
        snackbarType: action.payload
      }

    case CHANGE_WALLET_DATE:
      return {
        ...state,
        walletDate: action.payload
      }

    case CATEGORY_DIALOG:
      return {
        ...state,
        categoryDialog: action.payload
      }

    default:
      return state
  }
}
