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
import { BudgetType } from '@utils/enums'
import { useSWRUser } from '@hooks/useSWRUser'

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
  const classes = useStyles()
  const category = data.categories.filter(c => c.type === budgetType)

  const handleDelete = (id: number, money: number) => async () => {
    // if money is greater than 0, this category has budget related to it, therefore it cannot be deleted yet.
    if (money > 0) {
      alert(
        'You cannot delete this category because it has budget data related to it.'
      )
      return
    }

    const confirmed = confirm('Are you sure you want to delete this category')

    if (confirmed) {
      const updatedCategories = data.categories.filter(
        category => category.id !== id
      )
      const updatedData = { ...data, categories: updatedCategories }

      mutate(updatedData, false)
      const res = await axios.delete(`/api/categories/delete/${id}`)
      console.log(res)
    }
  }

  return (
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
  )
}
