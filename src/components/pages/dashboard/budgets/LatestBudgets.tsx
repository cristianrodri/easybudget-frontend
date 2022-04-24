import { Stack, Typography } from '@mui/material'
import { BudgetDescription } from '../BudgetDescription'
import { Loading } from './Loading'
import { useSWRLatestBudgets } from '@hooks/useSWRLatestBudgets'

const LatestBudgets = () => {
  const { data } = useSWRLatestBudgets()

  return (
    <Stack
      width={380}
      sx={{ backgroundColor: theme => theme.palette.grey[200] }}
      alignSelf="baseline"
    >
      <Typography component="h3" variant="h6" align="center" gutterBottom>
        Latest Budgets
      </Typography>
      {/* Budgets Container */}
      <Stack px={4} py={2} spacing={2}>
        {data?.map(budget => (
          <BudgetDescription key={budget.id} {...budget} />
        ))}
        {!data && Array.from({ length: 5 }, (_, i) => <Loading key={i} />)}
      </Stack>
    </Stack>
  )
}

export default LatestBudgets
