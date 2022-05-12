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
import { DialogCategory } from '@components/pages/dashboard/DialogCategory'
import { DialogDeletion } from '@components/pages/dashboard/DialogDeletion'
import { DialogEdition } from '@components/pages/dashboard/DialogEdition'
import { serverGetApi } from '@config/api_server'
import { AlertCategory } from '@components/pages/dashboard/AlertCategory'

interface Props {
  categoriesCount: number
}

const Dashboard = ({ categoriesCount }: Props) => {
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
        {/* If the user has no categories yet, show an alert to urge the user create some */}
        {categoriesCount === 0 ? <AlertCategory /> : null}
        <Stack flex={1} sx={{ minWidth: '70%' }}>
          <Header />
          <Summary />
          <Categories />
        </Stack>
        <LatestBudgets />
      </Stack>
      {/* Only show the add budget icon if the user has categories */}
      {categoriesCount > 0 ? (
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

          <AddBudget openDialog={open} handleClose={handleClose} />
        </>
      ) : null}
      <DialogCategory />
      <DialogDeletion />
      <DialogEdition />
    </Layout>
  )
}

export const getServerSideProps = withAuthentication<Props>(async ({ req }) => {
  const res = await serverGetApi<number>('categories/count', req.cookies.token)

  return {
    props: {
      categoriesCount: res.data
    }
  }
})

export default Dashboard
