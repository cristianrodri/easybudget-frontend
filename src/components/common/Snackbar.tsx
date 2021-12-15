import { useContext } from 'react'
import { Snackbar as SnackbarMaterial } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Context } from '@context/GlobalContext'

export const Snackbar = () => {
  const { snackbarOpen, snackbarMessage, snackbarType, handleCloseSnackbar } =
    useContext(Context)

  return (
    <SnackbarMaterial
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
    </SnackbarMaterial>
  )
}
