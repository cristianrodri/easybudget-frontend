import { Stack, Typography } from '@mui/material'
import { useUserData } from '@hooks/useSWRUser'
import { currentMonth } from '@utils/dates'

export const Summary = () => {
  const { data } = useUserData(currentMonth)

  return (
    <Stack>
      {data?.categories.map(category => (
        <div key={category.id}>
          <Typography
            sx={{ fontWeight: theme => theme.typography.fontWeightBold }}
          >
            {category.name}
          </Typography>
          {category.budgets.map(budget => (
            <Stack ml={3} key={budget.id}>
              {budget.description} {budget.money}
            </Stack>
          ))}
        </div>
      ))}
    </Stack>
  )
}
