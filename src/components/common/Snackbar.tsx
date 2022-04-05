import { useContext } from 'react'
import { Alert, Snackbar as SnackbarMui } from '@mui/material'
import { Context } from '@context/GlobalContext'

export const Snackbar = () => {
  const { snackbarOpen, snackbarMessage, snackbarType, handleCloseSnackbar } =
    useContext(Context)

  return (
    <SnackbarMui
      open={snackbarOpen}
      autoHideDuration={4000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        variant="filled"
        severity={snackbarType}
      >
        {snackbarMessage}
      </Alert>
    </SnackbarMui>
  )
}
