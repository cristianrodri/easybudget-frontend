import { useContext, useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import { Context } from '@context/GlobalContext'
import { dateTitle, getMonths, getPrevYears } from '@utils/dates'
import { DateSelect } from './DateSelect'
import { Budget } from '@custom-types'
import { clientGetApi } from '@config/api_client'

export const Header = () => {
  const { values } = useContext(Context)
  // The initYear will store the current year until the oldest budget year. That date will be received by calling an api below. Meanwhile, the initYear will store the current year
  const [years, setYears] = useState([new Date().getFullYear()])

  useEffect(() => {
    const API_URL = `api/budget/get?_sort=date:ASC&_limit=1`

    clientGetApi<Budget[]>(API_URL).then(res => {
      if (res.success === true) {
        const oldestBudgetDate = res.data[0].date
        setYears([...years, ...getPrevYears(oldestBudgetDate)])
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      spacing={4}
      gap={2}
      sx={{
        justifyContent: {
          xs: 'center',
          md: 'space-between'
        }
      }}
    >
      <Typography variant="h4" component="h1">
        Wallet - {dateTitle(values.walletDate)}
      </Typography>
      <Stack direction="row" spacing={2}>
        {/* Select year */}
        {/* If the years length is one, that means that years array only contains current year, therefore it's not necessary to show year select component*/}
        {years.length > 1 ? <DateSelect dateType="year" data={years} /> : null}
        {/* Select month */}
        <DateSelect dateType="month" data={getMonths()} />
      </Stack>
    </Stack>
  )
}
