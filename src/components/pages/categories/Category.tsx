import {
  Box,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from '@mui/material'
import { useState } from 'react'
import { GetCategory } from '@custom-types'
import { BudgetType } from '@utils/enums'
import { DialogDeletion } from './DialogDeletion'
import { useSWRCategories } from '@hooks/useSWRCategories'
import { ActionData } from '@components/common/ActionData'

interface Props {
  budgetType: BudgetType
  categories: GetCategory[]
}

export const Category = ({ budgetType, categories }: Props) => {
  const { data: categoriesData } = useSWRCategories(categories)
  const [openDialogDeletion, setOpenDialogDeletion] = useState(false)
  const [category, setCategory] = useState<GetCategory>(null)
  const filteredCategories = categoriesData.filter(c => c.type === budgetType)

  const handleDelete = (category: GetCategory) => () => {
    setCategory(category)

    setOpenDialogDeletion(true)
  }

  const handleClose = () => {
    setOpenDialogDeletion(false)
  }

  return (
    <>
      <Box>
        <List>
          {filteredCategories.map(category => (
            <ListItem
              key={category.id}
              sx={{
                backgroundColor: theme => theme.palette.grey[300],
                width: 200,
                '&:not(:last-of-type)': {
                  borderBottom: theme => `1px solid ${theme.palette.grey[400]}`
                }
              }}
            >
              <ListItemText primary={category.name} />
              <ListItemSecondaryAction
                sx={{ right: theme => theme.spacing(1) }}
              >
                <ActionData actionType="edit" handleClick={() => ''} />
                <ActionData
                  actionType="delete"
                  handleClick={handleDelete(category)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>

      {openDialogDeletion && (
        <DialogDeletion
          open={openDialogDeletion}
          handleClose={handleClose}
          category={category}
          setCategory={setCategory}
        />
      )}
    </>
  )
}
