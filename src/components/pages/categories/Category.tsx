import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { GetCategory } from '@custom-types'
import { clientInstance as axios } from '@config/axios'
import { BudgetType, SnackbarType } from '@utils/enums'
import { useContext, useState } from 'react'
import { Context } from '@context/GlobalContext'
import { DialogConfirm } from './DialogConfirm'
import { useSWRCategories } from '@hooks/useSWRCategories'

const useStyles = makeStyles(theme => ({
  listItem: {
    backgroundColor: theme.palette.grey[300],
    width: 200
  },
  listItemBorder: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`
  }
}))

interface Props {
  budgetType: BudgetType
  categories: GetCategory[]
}

export const Category = ({ budgetType, categories }: Props) => {
  const { data: categoriesData, mutate } = useSWRCategories(categories)
  const { openSnackbar } = useContext(Context)
  const classes = useStyles()
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
    const res = await axios.delete(`/api/categories/delete/${idToDelete}`)

    if (res.data.success)
      openSnackbar(`${res.data.data.name} deleted!`, SnackbarType.SUCCESS)
    else openSnackbar(res.data.message, SnackbarType.ERROR)

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
          {category.map(({ id, name, money }, i, arr) => (
            <ListItem
              key={id}
              className={`${classes.listItem}${
                i < arr.length - 1 ? ' ' + classes.listItemBorder : ''
              }`}
            >
              <ListItemText primary={name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={handleDelete(id, money)}
                >
                  <DeleteIcon />
                </IconButton>
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
