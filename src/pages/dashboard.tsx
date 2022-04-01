import { useState } from 'react'
import { Box, Fab, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Layout } from '@components/Layout'
import { withAuthentication } from '@utils/middleware'
import AddBudget from '@components/pages/dashboard/AddBudget'
import { Header } from '@components/pages/dashboard/Header'
import LatestBudgets from '@components/pages/dashboard/LatestBudgets'
import { Summary } from '@components/pages/dashboard/Summary'

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
        mt={2}
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        spacing={1}
      >
        <Stack flex={1} minWidth={350}>
          <Header />
          <Summary />
        </Stack>
        <LatestBudgets />
      </Stack>
      <Box position="absolute" right="0" bottom="0" paddingBottom={2}>
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
    </Layout>
  )
}

export const getServerSideProps = withAuthentication()

export default Dashboard
