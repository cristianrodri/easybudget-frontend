import { Stack, Typography } from '@mui/material'
import useSWR from 'swr'
import { clientInstance as axios } from '@config/axios'
import { Budget } from '@custom-types'
import { BudgetDescription } from './Budget'

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

  console.log(data)

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
        {/* <Stack direction="row" spacing={2}>
          <Stack color="success.main">{'+'}</Stack>
          <Stack flexGrow={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={2}
              fontWeight={theme => theme.typography.fontWeightRegular}
              color="success.main"
            >
              <Box
                component="span"
                sx={{ '&::first-letter': { textTransform: 'uppercase' } }}
              >
                salary
              </Box>
              <Box component="span">$ 1.000.000</Box>
            </Stack>
            <Typography
              component="span"
              variant="caption"
              color="success.light"
            >
              28 March
            </Typography>
          </Stack>
        </Stack> */}
      </Stack>
    </Stack>
  )
}

export default LatestBudgets
