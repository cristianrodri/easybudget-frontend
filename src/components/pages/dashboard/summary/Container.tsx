import { Stack } from '@mui/material'
import { useUserData } from '@hooks/useSWRUser'
import { currentMonth } from '@utils/dates'
import { Budget } from './Budget'
import { BudgetType } from '@utils/enums'

export const Summary = () => {
  const { data } = useUserData(currentMonth)

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
        isLoading={!data}
      />
      <Budget
        colorType={BudgetType.EXPENSE}
        money={moneyExpense}
        isLoading={!data}
      />
      <Budget colorType="budget" money={moneyBudget} isLoading={!data} />
    </Stack>
  )
}
