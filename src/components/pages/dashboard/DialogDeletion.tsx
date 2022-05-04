import { useContext } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { Context } from '@context/GlobalContext'
import { closeDialogDeletion, openSnackbar } from '@context/actions'
import { useSWRLatestBudgets } from '@hooks/useSWRLatestBudgets'
import { useUserData } from '@hooks/useSWRUser'
import { clientDeleteApi } from '@config/api_client'
import { Budget } from '@custom-types'
import { SnackbarType } from '@utils/enums'

export const DialogDeletion = () => {
  const { values, dispatch } = useContext(Context)
  const { dialogDeletionOpen, budgetToDelete } = values
  const {
    loadLatestBudgets,
    isDeletedBudgetFromLatest,
    reloadLatestBudgetsAPI
  } = useSWRLatestBudgets()
  const { mutateCategoryByDeletingBudget } = useUserData()

  const handleClose = () => {
    dispatch(closeDialogDeletion())
  }

  const handleDeletion = async () => {
    dispatch(closeDialogDeletion())

    // The latest budgets will be using loading component if the deleted budget is within
    loadLatestBudgets(budgetToDelete)

    // Mutate categories by deleting the budget and updating the money
    mutateCategoryByDeletingBudget(budgetToDelete)

    const res = await clientDeleteApi<Budget>(
      `api/budget/delete/${budgetToDelete.id}`
    )

    if (res.success === true) {
      // If deleted budget comes from latest budgets, call the API to update the data and keep using the loading component
      if (isDeletedBudgetFromLatest(budgetToDelete)) {
        await reloadLatestBudgetsAPI()
      }

      dispatch(
        openSnackbar(
          `${res.data.description} has been deleted successfully`,
          SnackbarType.SUCCESS
        )
      )
    } else dispatch(openSnackbar(`${res.message}`, SnackbarType.ERROR))
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
