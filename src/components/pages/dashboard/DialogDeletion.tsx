import { useContext } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { Context } from '@context/GlobalContext'
import { closeDialogDeletion } from '@context/actions'

export const DialogDeletion = () => {
  const { values, dispatch } = useContext(Context)
  const { dialogDeletionOpen } = values

  const handleClose = () => {
    dispatch(closeDialogDeletion())
  }

  return (
    <Dialog
      open={dialogDeletionOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete this budget?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Disagree
        </Button>
        <Button onClick={handleClose}>Agree</Button>
      </DialogActions>
    </Dialog>
  )
}
