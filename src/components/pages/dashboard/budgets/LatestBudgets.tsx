import { Stack, Typography } from '@mui/material'
import { BudgetDescription } from '../BudgetDescription'
import { Loading } from './Loading'
import { useSWRLatestBudgets } from '@hooks/useSWRLatestBudgets'
import { useContext } from 'react'
import { Context } from '@context/GlobalContext'

const LatestBudgets = () => {
  const { data } = useSWRLatestBudgets()
  const {
    values: { isReloadingBudget }
  } = useContext(Context)

  return (
    <Stack
      width={420}
      sx={{ backgroundColor: theme => theme.palette.grey[200] }}
      alignSelf="baseline"
    >
      <Typography component="h3" variant="h6" align="center" gutterBottom>
        Latest Budgets
      </Typography>
      {/* Budgets Container */}
      <Stack px={4} py={2} spacing={2}>
        {!isReloadingBudget &&
          data?.map(budget => (
            <BudgetDescription key={budget.id} budget={budget} />
          ))}
        {!data || isReloadingBudget
          ? Array.from({ length: 5 }, (_, i) => <Loading key={i} />)
          : null}
      </Stack>
    </Stack>
  )
}

export default LatestBudgets
