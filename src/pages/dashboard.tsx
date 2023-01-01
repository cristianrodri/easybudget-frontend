import { SWRConfig } from 'swr'
import { Stack } from '@mui/material'
import { Header } from '@components/pages/dashboard/Header'
import LatestBudgets from '@components/pages/dashboard/budgets/LatestBudgets'
import { Summary } from '@components/pages/dashboard/summary/Container'
import { Categories } from '@components/pages/dashboard/categories/Container'
import { DialogCategory } from '@components/pages/dashboard/DialogCategory'
import { DialogDeletion } from '@components/pages/dashboard/DialogDeletion'
import { DialogEdition } from '@components/pages/dashboard/DialogEdition'
import { AlertCategory } from '@components/pages/dashboard/AlertCategory'
import { AddBudgetIcon } from '@components/pages/dashboard/AddBudgetIcon'
import { LayoutAuth } from '@components/LayoutAuth'
import { useContext, useEffect } from 'react'
import { Context } from '@context/GlobalContext'
import { changeWalletDate } from '@context/actions'
import { DateType } from '@utils/enums'
import Category from '@db/category/model'
import { getUserId } from '@utils/api/token'
import Budget from '@db/budget/model'
import { connectDB } from '@db/mongoose'

interface Props {
  categoriesCount: number
  oldestBudgetDate: string
}

const Dashboard = ({ categoriesCount, oldestBudgetDate }: Props) => {
  const { dispatch } = useContext(Context)

  useEffect(() => {
    // Set the wallet date year with the current year and this action set the month with the current month
    dispatch(changeWalletDate(DateType.YEAR, new Date().getFullYear()))
  }, [dispatch])

  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <LayoutAuth title="Dashboard">
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
      </LayoutAuth>
    </SWRConfig>
  )
}

export const getServerSideProps = async ({ req }) => {
  const userId = getUserId(req)
  await connectDB()

  // Get the categories count
  const categories = await Category.find({ user: userId })

  // Get the oldest budget
  const oldestBudget = await Budget.find({ user: userId })
    .sort({ date: 1 })
    .limit(1)

  return {
    props: {
      categoriesCount: categories.length,
      oldestBudgetDate: oldestBudget[0]
        ? JSON.parse(JSON.stringify(oldestBudget[0]))?.date
        : new Date().toISOString()
    }
  }
}

export default Dashboard
