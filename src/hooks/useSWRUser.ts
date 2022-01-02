import useSWR from 'swr'
import { DateTime } from 'luxon'
import { clientInstance as axios } from '@config/axios'
import { User } from '@custom-types'

interface Dates {
  dateStart: string
  dateEnd: string
}

const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone

const monthStart = DateTime.now().setZone(tzid).startOf('month').toISO()
const monthEnd = DateTime.now().setZone(tzid).endOf('month').toISO()

const currentMonth: Dates = {
  dateStart: monthStart,
  dateEnd: monthEnd
}

export const useSWRUser = (
  fallbackData?: User,
  dates: Dates = currentMonth
) => {
  const { data, mutate } = useSWR<User>(
    '/api/user/get',
    async (url: string) => {
      const res = await axios.get(url, {
        params: {
          budgets_date_start: dates.dateStart,
          budgets_date_end: dates.dateEnd
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
