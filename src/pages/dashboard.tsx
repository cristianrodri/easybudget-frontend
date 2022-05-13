import { SWRConfig } from 'swr'
import { Stack } from '@mui/material'
import { Layout } from '@components/Layout'
import { withAuthentication } from '@utils/middleware'
import { Header } from '@components/pages/dashboard/Header'
import LatestBudgets from '@components/pages/dashboard/budgets/LatestBudgets'
import { Summary } from '@components/pages/dashboard/summary/Container'
import { Categories } from '@components/pages/dashboard/categories/Container'
import { DialogCategory } from '@components/pages/dashboard/DialogCategory'
import { DialogDeletion } from '@components/pages/dashboard/DialogDeletion'
import { DialogEdition } from '@components/pages/dashboard/DialogEdition'
import { serverGetApi } from '@config/api_server'
import { AlertCategory } from '@components/pages/dashboard/AlertCategory'
import { AddBudgetIcon } from '@components/pages/dashboard/AddBudgetIcon'
import { Budget } from '@custom-types'

interface Props {
  categoriesCount: number
  oldestBudgetDate: string
}

const Dashboard = ({ categoriesCount, oldestBudgetDate }: Props) => {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
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
            <Header oldestBudgetDate={oldestBudgetDate} />
            <Summary />
            <Categories />
          </Stack>
          <LatestBudgets />
        </Stack>
        {/* Only show the add budget icon if the user has categories */}
        {categoriesCount > 0 ? <AddBudgetIcon /> : null}
        <DialogCategory />
        <DialogDeletion />
        <DialogEdition />
      </Layout>
    </SWRConfig>
  )
}

export const getServerSideProps = withAuthentication<Props>(async ({ req }) => {
  // Get the categories count
  const { data: categoriesCount } = await serverGetApi<number>(
    'categories/count',
    req.cookies.token
  )

  // Get the oldest budget
  const { data: oldestBudget } = await serverGetApi<Budget[]>(
    'budgets?_sort=date:ASC&_limit=1',
    req.cookies.token
  )

  return {
    props: {
      categoriesCount,
      oldestBudgetDate: oldestBudget[0]?.date ?? new Date().toISOString()
    }
  }
})

export default Dashboard
