import { useState } from 'react'
import { Box, Fab, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Layout } from '@components/Layout'
import { withAuthentication } from '@utils/middleware'
import AddBudget from '@components/pages/dashboard/AddBudget'
import { Header } from '@components/pages/dashboard/Header'
import LatestBudgets from '@components/pages/dashboard/budgets/LatestBudgets'
import { Summary } from '@components/pages/dashboard/summary/Container'
import { Categories } from '@components/pages/dashboard/categories/Container'
import { DialogBudgets } from '@components/pages/dashboard/Dialog'

const Dashboard = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Layout title="Dashboard">
      <Stack
        my={2}
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        spacing={1}
      >
        <Stack>
          <Header />
          <Summary />
          <Categories />
        </Stack>
        <LatestBudgets />
      </Stack>
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
      <AddBudget openDialog={open} handleClose={handleClose} />
      <DialogBudgets />
    </Layout>
  )
}

export const getServerSideProps = withAuthentication()

export default Dashboard
