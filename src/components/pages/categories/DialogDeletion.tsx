import { Dispatch, SetStateAction, useContext } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { Context } from '@context/GlobalContext'
import { clientDeleteApi } from '@config/api_client'
import { CategoryApi, GetCategory } from '@custom-types'
import { useSWRCategories } from '@hooks/useSWRCategories'
import { openSnackbar } from '@context/actions'
import { SnackbarType } from '@utils/enums'

interface Props {
  open: boolean
  handleClose: () => void
  category: GetCategory
  setCategory: Dispatch<SetStateAction<GetCategory>>
}

export const DialogDeletion = ({
  open,
  handleClose,
  category,
  setCategory
}: Props) => {
  const { dispatch } = useContext(Context)
  const { data: categoriesData, mutate } = useSWRCategories()

  const handleDeletion = async () => {
    // if money is greater than 0, this category has budget related to it, therefore it cannot be deleted.
    if (category.money > 0) {
      dispatch(
        openSnackbar(
          'You cannot delete this category because it has budget data related to it.',
          SnackbarType.ERROR
        )
      )
      return
    }

    // Close this dialog inmediately after a user clicked delete button
    handleClose()

    const updatedCategories = categoriesData.filter(
      category => category.id !== category.id
    )

    mutate(updatedCategories, false)

    const res = await clientDeleteApi<CategoryApi>(
      `api/categories/delete/${category.id}`
    )

    if (res.success === true)
      dispatch(openSnackbar(`${res.data.name} deleted!`, SnackbarType.SUCCESS))
    else dispatch(openSnackbar(res.message, SnackbarType.ERROR))

    setCategory(null)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this category?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeletion} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
