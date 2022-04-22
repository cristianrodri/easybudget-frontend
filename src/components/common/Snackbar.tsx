import { useContext } from 'react'
import { Alert, Snackbar as SnackbarMui } from '@mui/material'
import { Context } from '@context/GlobalContext'
import { closeSnackbar } from '@context/actions'

export const Snackbar = () => {
  const { values, dispatch } = useContext(Context)
  const { snackbarOpen, snackbarMessage, snackbarType } = values

  const handleClose = () => {
    dispatch(closeSnackbar())
  }

  return (
    <SnackbarMui
      open={snackbarOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert variant="filled" severity={snackbarType}>
        {snackbarMessage}
      </Alert>
    </SnackbarMui>
  )
}
