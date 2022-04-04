import { Stack, Typography } from '@mui/material'
import { useUserData } from '@hooks/useSWRUser'
import { getCustomDate } from '@utils/dates'

export const Summary = () => {
  const currentMonth = getCustomDate(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getFullYear(),
    new Date().getMonth() + 1
  )

  const { data } = useUserData(currentMonth)

  return (
    <Stack>
      {data?.categories.map(category => (
        <div key={category.id}>
          <Typography>{category.name}</Typography>
          {category.budgets.map(budget => (
            <div key={budget.id}>
              {budget.description} {budget.money}
            </div>
          ))}
        </div>
      ))}
    </Stack>
  )
}
