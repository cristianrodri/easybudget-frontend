import { Skeleton, Stack, Typography } from '@mui/material'
import useSWR from 'swr'
import { clientInstance as axios } from '@config/axios'
import { Budget } from '@custom-types'
import { BudgetDescription } from './Budget'
import { Loading } from './Loading'

interface ApiResponse {
  success: boolean
  data: Budget[]
}

const fetcher = (url: string) =>
  axios.get<ApiResponse>(url).then(res => res.data.data)

const LatestBudgets = () => {
  const { data } = useSWR(
    '/api/budget/get?_sort=date:DESC&_limit=5&_categorydata=true',
    fetcher
  )

  return (
    <Stack
      width={350}
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
