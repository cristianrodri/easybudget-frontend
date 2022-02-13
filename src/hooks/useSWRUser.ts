import useSWR from 'swr'
import { clientInstance as axios } from '@config/axios'
import { User } from '@custom-types'
import moment from 'moment'

interface Dates {
  start: string
  end: string
}

const currentMonth: Dates = {
  start: moment().startOf('month').format(),
  end: moment().endOf('month').format()
}

export const useSWRUser = (
  fallbackData?: User,
  budgetDates: Dates = currentMonth
) => {
  const { data, mutate } = useSWR<User>(
    '/api/user/get',
    async (url: string) => {
      const res = await axios.get(url, {
        params: {
          budgets_date_start: budgetDates.start,
          budgets_date_end: budgetDates.end
        }
      })
      return res.data?.user
    },
    {
      fallbackData
    }
  )

  return { data, mutate }
}
