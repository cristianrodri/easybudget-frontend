import { Dispatch, SetStateAction, useContext, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { GetCategory } from '@custom-types'
import { BudgetTypeFormControl } from '@components/common/BudgetTypeFormControl'
import { BudgetType, SnackbarType } from '@utils/enums'
import { clientPutApi } from '@config/api_client'
import { Context } from '@context/GlobalContext'
import { useSWRCategories } from '@hooks/useSWRCategories'
import { openSnackbar } from '@context/actions'

interface Props {
  open: boolean
  handleClose: () => void
  category: GetCategory
  setCategory: Dispatch<SetStateAction<GetCategory>>
}

export const DialogEdition = ({
  open,
  handleClose,
  category,
  setCategory
}: Props) => {
  const { dispatch } = useContext(Context)
  const { data: categoriesData, mutate } = useSWRCategories()
  const [name, setName] = useState(category.name)
  const [type, setType] = useState(category.type)

  const handleEdit = async () => {
    // if money is greater than 0, this category has budget related to it, therefore it cannot be updated.
    if (category.money > 0 && type !== category.type) {
      dispatch(
        openSnackbar(
          `You cannot change ${category.name} type because it has budget data related to it.`,
          SnackbarType.ERROR
        )
      )

      return
    }

    // Close this dialog inmediately after a user clicked delete button
    handleClose()

    // Update the category by mutating the useSWRCategories data before calling the api
    const updatedCategories = categoriesData.map(c => {
      if (c.id === category.id) {
        c.name = name
        c.type = type

        return c
      }

      return c
    })

    mutate(updatedCategories, false)

    const res = await clientPutApi<GetCategory>(
      `api/categories/update/${category.id}`,
      { name, type }
    )

    if (res.success === true)
      dispatch(openSnackbar(`${res.data.name} updated!`, SnackbarType.SUCCESS))
    else dispatch(openSnackbar(res.message, SnackbarType.ERROR))

    setCategory(null)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Category Name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
          variant="standard"
          sx={{
            mb: theme => theme.spacing(2)
          }}
        />
        <BudgetTypeFormControl
          budgetType={type}
          handleChange={e => setType(e.target.value as BudgetType)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleEdit}>Edit</Button>
      </DialogActions>
    </Dialog>
  )
}
