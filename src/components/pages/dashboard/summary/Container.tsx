import { Stack } from '@mui/material'
import { useUserData } from '@hooks/useSWRUser'
import { currentMonth } from '@utils/dates'
import { Budget } from './Budget'
import { BudgetType } from '@utils/enums'

export const Summary = () => {
  const { data, isValidating } = useUserData(currentMonth)

  // Get all INCOME budgets of the provided date
  const moneyIncome = data?.categories.reduce(
    (prev, category) =>
      category.type === BudgetType.INCOME ? prev + category.money : prev,
    0
  )

  // Get all EXPENSE budgets of the provided date
  const moneyExpense = data?.categories.reduce(
    (prev, category) =>
      category.type === BudgetType.EXPENSE ? prev + category.money : prev,
    0
  )

  const moneyBudget = moneyIncome - moneyExpense

  return (
    <Stack
      my={3}
      p={2}
      sx={{ backgroundColor: theme => theme.palette.grey[50] }}
      direction="row"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      gap={1}
    >
      <Budget
        colorType={BudgetType.INCOME}
        money={moneyIncome}
        isValidating={isValidating}
      />
      <Budget
        colorType={BudgetType.EXPENSE}
        money={moneyExpense}
        isValidating={isValidating}
      />
      <Budget
        colorType="budget"
        money={moneyBudget}
        isValidating={isValidating}
      />
    </Stack>
  )
}
