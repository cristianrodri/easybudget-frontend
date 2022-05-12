import { Box, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { AddBudgetDialog } from './AddBudgetDialog'

export const AddBudgetIcon = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box
        position="fixed"
        right="0"
        bottom="0"
        sx={{
          paddingBottom: {
            xs: 2,
            sm: 3
          },
          paddingRight: {
            xs: 2,
            sm: 3
          }
        }}
      >
        <Fab
          color="primary"
          aria-label="add"
          title="Create Budget"
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </Box>

      <AddBudgetDialog openDialog={open} handleClose={handleClose} />
    </>
  )
}
