import {
  Box,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Skeleton
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
  const [chosenCategory, setChosenCategory] = useState<GetCategory>(null)
  const filteredCategories = categoriesData.filter(c => c.type === budgetType)
  const [isDeletingCategory, setIsDeletingCategory] = useState(false)

  /* HANDLE DELETE DIALOG */
  const handleDelete = (category: GetCategory) => () => {
    setChosenCategory(category)
    setOpenDialogDeletion(true)
  }

  const handleCloseDeletion = () => {
    setChosenCategory(null)
    setOpenDialogDeletion(false)
  }

  /* HANDLE EDIT DIALOG */
  const handleEdit = (category: GetCategory) => () => {
    setChosenCategory(category)
    setOpenDialogEdition(true)
  }

  const handleCloseEdition = () => {
    setChosenCategory(null)
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
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: theme => theme.palette.grey[300],
                  opacity: '0.6',
                  display: isDeletingCategory ? 'block' : 'none'
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {openDialogDeletion && (
        <DialogDeletion
          open={openDialogDeletion}
          handleClose={handleCloseDeletion}
          category={chosenCategory}
          setCategory={setChosenCategory}
          setIsDeletingCategory={setIsDeletingCategory}
        />
      )}

      {openDialogEdition && (
        <DialogEdition
          open={openDialogEdition}
          handleClose={handleCloseEdition}
          category={chosenCategory}
          setCategory={setChosenCategory}
        />
      )}
    </>
  )
}
