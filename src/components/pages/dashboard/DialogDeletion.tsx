import { useContext } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { Context } from '@context/GlobalContext'
import { closeDialogDeletion } from '@context/actions'
import { useSWRLatestBudgets } from '@hooks/useSWRLatestBudgets'

export const DialogDeletion = () => {
  const { values, dispatch } = useContext(Context)
  const { dialogDeletionOpen, budgetIdToDelete } = values
  const { mutateBydeletingBudget } = useSWRLatestBudgets()

  const handleClose = () => {
    dispatch(closeDialogDeletion())
  }

  const handleDeletion = async () => {
    mutateBydeletingBudget(budgetIdToDelete)
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
        <Button onClick={handleDeletion}>Agree</Button>
      </DialogActions>
    </Dialog>
  )
}
