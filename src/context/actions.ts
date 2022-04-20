import { Action, SnackbarType } from '@utils/enums'

const { OPEN_SNACKBAR } = Action

export const openSnackbar = (message: string, type: SnackbarType) => {
  return {
    type: OPEN_SNACKBAR,
    payload: {
      message,
      type
    }
  }
}

export type ActionType = ReturnType<typeof openSnackbar>
