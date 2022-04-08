import { Stack } from '@mui/material'
import { BudgetType } from '@utils/enums'
import { Category } from './Category'
import { useUserData } from '@hooks/useSWRUser'
import { currentMonth } from '@utils/dates'
import { CategoryTypes } from '@custom-types'

// Order categories in descending way by money
const sortedCategories = (a: CategoryTypes, b: CategoryTypes) =>
  b.money - a.money

export const Categories = () => {
  const { data } = useUserData(currentMonth)

  const incomeData = data?.categories
    .filter(category => category.type === BudgetType.INCOME)
    .sort(sortedCategories)

  const expenseData = data?.categories
    .filter(category => category.type === BudgetType.EXPENSE)
    .sort(sortedCategories)

  return (
    <Stack mb={3}>
      <Category type={BudgetType.INCOME} categories={incomeData} />
      <Category type={BudgetType.EXPENSE} categories={expenseData} />
    </Stack>
  )
}
