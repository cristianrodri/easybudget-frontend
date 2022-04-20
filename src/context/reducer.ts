import { Action, SnackbarType } from '@utils/enums'
import { ActionType } from './actions'

export interface ContextProps {
  snackbarOpen: boolean
  snackbarMessage: string
  snackbarType: SnackbarType
}

const initialState: ContextProps = {
  snackbarOpen: false,
  snackbarMessage: '',
  snackbarType: null
}

const { OPEN_SNACKBAR } = Action

export const reducer = (
  state: ContextProps = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpen: true,
        snackbarMessage: action.payload.message,
        snackbarType: action.payload.type
      }
  }
}
