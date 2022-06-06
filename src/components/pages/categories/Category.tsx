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
import { DialogEdition } from './DialogEdition'
import { textCapitalize } from '@utils/string'

interface Props {
  budgetType: BudgetType
  categories: GetCategory[]
}

export const Category = ({ budgetType, categories }: Props) => {
  const { data: categoriesData } = useSWRCategories(categories)
  const [openDialogDeletion, setOpenDialogDeletion] = useState(false)
  const [openDialogEdition, setOpenDialogEdition] = useState(false)
  const [category, setCategory] = useState<GetCategory>(null)
  const filteredCategories = categoriesData.filter(c => c.type === budgetType)

  /* HANDLE DELETE DIALOG */
  const handleDelete = (category: GetCategory) => () => {
    setCategory(category)
    setOpenDialogDeletion(true)
  }

  const handleCloseDeletion = () => {
    setCategory(null)
    setOpenDialogDeletion(false)
  }

  /* HANDLE EDIT DIALOG */
  const handleEdit = (category: GetCategory) => () => {
    setCategory(category)
    setOpenDialogEdition(true)
  }

  const handleCloseEdition = () => {
    setCategory(null)
    setOpenDialogEdition(false)
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
              <ListItemText primary={textCapitalize(category.name)} />
              <ListItemSecondaryAction
                sx={{ right: theme => theme.spacing(1) }}
              >
                <ActionData
                  actionType="edit"
                  handleClick={handleEdit(category)}
                />
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
          handleClose={handleCloseDeletion}
          category={category}
          setCategory={setCategory}
        />
      )}

      {openDialogEdition && (
        <DialogEdition
          open={openDialogEdition}
          handleClose={handleCloseEdition}
          category={category}
          setCategory={setCategory}
        />
      )}
    </>
  )
}
