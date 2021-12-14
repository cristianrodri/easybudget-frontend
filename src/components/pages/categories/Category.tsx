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
import { User } from '@custom-types'
import { clientInstance as axios } from '@config/axios'
import { BudgetType, DialogType } from '@utils/enums'
import { useSWRUser } from '@hooks/useSWRUser'
import { useContext, useState } from 'react'
import { Context } from '@context/GlobalContext'
import { DialogConfirm } from './DialogConfirm'

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
  user: User
}

export const Category = ({ budgetType, user }: Props) => {
  const { data, mutate } = useSWRUser(user)
  const { openDialog } = useContext(Context)
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [idToDelete, setIdToDelete] = useState(null)
  // The below money variable is used to ckeck when some category is trying to delete
  const [money, setMoney] = useState(null)
  const category = data.categories.filter(c => c.type === budgetType)

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

    const updatedCategories = data.categories.filter(
      category => category.id !== idToDelete
    )
    const updatedData = { ...data, categories: updatedCategories }

    mutate(updatedData, false)
    const res = await axios.delete(`/api/categories/delete/${idToDelete}`)

    if (res.data.success)
      openDialog(`${res.data.data.name} deleted!`, DialogType.SUCCESS)
    else openDialog(res.data.message, DialogType.ERROR)

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
