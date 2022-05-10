import { useContext, useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import { Context } from '@context/GlobalContext'
import { dateTitle, getMonths, getPrevYears } from '@utils/dates'
import { DateSelect } from './DateSelect'
import { Budget } from '@custom-types'
import { clientGetApi } from '@config/api_client'
import { DateType } from '@utils/enums'

export const Header = () => {
  const { values } = useContext(Context)
  const { walletDate } = values
  const currentYear = new Date().getFullYear()
  // The years state will store an array of the current year until the oldest budget year. The initial state starts with one value which is the current year.
  const [years, setYears] = useState([currentYear])
  const [months, setMonths] = useState(getMonths('from-current'))

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

  useEffect(() => {
    // Change the month select values in base of the selected year
    if (walletDate.year !== currentYear) setMonths(getMonths('all'))
    else if (walletDate.year === currentYear)
      setMonths(getMonths('from-current'))
  }, [walletDate.year, currentYear])

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
        Wallet - {dateTitle(walletDate)}
      </Typography>
      <Stack direction="row" spacing={2}>
        {/* Select year */}
        {/* If the years length is one, that means that years array only contains current year, therefore it's not necessary to show year select component*/}
        {years.length > 1 ? (
          <DateSelect dateType={DateType.YEAR} data={years} />
        ) : null}
        {/* Select month */}
        {/* If the wallet date year is 'all', it means that is not necessary to show the month select component because the dashboard is showing all the user budgets */}
        {walletDate.year !== 'all' ? (
          <DateSelect dateType={DateType.MONTH} data={months} />
        ) : null}
      </Stack>
    </Stack>
  )
}
