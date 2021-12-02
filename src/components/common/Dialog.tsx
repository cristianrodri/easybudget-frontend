import { useContext } from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Context } from '@context/GlobalContext'

export const Dialog = () => {
  const { dialogOpen, dialogMessage, dialogType, handleCloseDialog } =
    useContext(Context)

  return (
    <Snackbar
      open={dialogOpen}
      autoHideDuration={4000}
      onClose={handleCloseDialog}
    >
      <Alert onClose={handleCloseDialog} variant="filled" severity={dialogType}>
        {dialogMessage}
      </Alert>
    </Snackbar>
  )
}
