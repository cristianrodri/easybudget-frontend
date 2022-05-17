import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'

interface Props {
  dialogOpen: boolean
  closeDialog: () => void
  handleDelete: () => void
}

export const DialogAvatarDeletion = ({
  dialogOpen,
  closeDialog,
  handleDelete
}: Props) => {
  return (
    <Dialog
      open={dialogOpen}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete this avatar?
      </DialogTitle>
      <DialogActions>
        <Button onClick={closeDialog}>Disagree</Button>
        <Button onClick={handleDelete} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}
