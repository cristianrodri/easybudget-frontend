import {
  Box,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from '@mui/material'
import { useContext, useState } from 'react'
import { CategoryApi, GetCategory } from '@custom-types'
import { BudgetType, SnackbarType } from '@utils/enums'
import { Context } from '@context/GlobalContext'
import { DialogConfirm } from './DialogConfirm'
import { useSWRCategories } from '@hooks/useSWRCategories'
import { openSnackbar } from '@context/actions'
import { clientDeleteApi } from '@config/api_client'
import { ActionData } from '@components/common/ActionData'

interface Props {
  budgetType: BudgetType
  categories: GetCategory[]
}

export const Category = ({ budgetType, categories }: Props) => {
  const { data: categoriesData, mutate } = useSWRCategories(categories)
  const { dispatch } = useContext(Context)
  const [open, setOpen] = useState(false)
  const [idToDelete, setIdToDelete] = useState(null)
  // The below money variable is used to ckeck when some category is trying to delete
  const [money, setMoney] = useState(null)
  const category = categoriesData.filter(c => c.type === budgetType)

  const handleDelete = (id: number, money: number) => () => {
    setIdToDelete(id)
    setMoney(money)

    setOpen(true)
  }

  const handleDeletion = async () => {
    // if money is greater than 0, this category has budget related to it, therefore it cannot be deleted.
    if (money > 0) {
      alert(
        'You cannot delete this category because it has budget data related to it.'
      )
      return
    }

    handleClose()

    const updatedCategories = categoriesData.filter(
      category => category.id !== idToDelete
    )

    mutate(updatedCategories, false)

    const res = await clientDeleteApi<CategoryApi>(
      `api/categories/delete/${idToDelete}`
    )

    if (res.success === true)
      dispatch(openSnackbar(`${res.data.name} deleted!`, SnackbarType.SUCCESS))
    else dispatch(openSnackbar(res.message, SnackbarType.ERROR))

    setIdToDelete(null)
    setMoney(null)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box>
        <List>
          {category.map(({ id, name, money }) => (
            <ListItem
              key={id}
              sx={{
                backgroundColor: theme => theme.palette.grey[300],
                width: 200,
                '&:not(:last-of-type)': {
                  borderBottom: theme => `1px solid ${theme.palette.grey[400]}`
                }
              }}
            >
              <ListItemText primary={name} />
              <ListItemSecondaryAction
                sx={{ right: theme => theme.spacing(1) }}
              >
                <ActionData actionType="edit" handleClick={() => ''} />
                <ActionData
                  actionType="delete"
                  handleClick={handleDelete(id, money)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>

      {open && (
        <DialogConfirm
          open={open}
          handleClose={handleClose}
          handleDeletion={handleDeletion}
        />
      )}
    </>
  )
}
