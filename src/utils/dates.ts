// this function return a start ISO date and an end ISO date, which is useful when need to add api params to get budgets by specific date in database
export const getCustomDate = (
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number
) => {
  return {
    start: new Date(startYear, startMonth).toISOString(),
    end: new Date(endYear, endMonth).toISOString()
  }
}

export const getDateWithZero = (date: Date | string) =>
  +`0${new Date(date).getDate()}`.slice(-2)

export const getMonthName = (date: Date | string) =>
  new Date(date).toLocaleString('en-us', { month: 'long' })

export const getDayAndMonth = (date: Date | string) =>
  `${getDateWithZero(date)} ${getMonthName(date)}`

// Get first date and the last day of the current month
export const currentMonth = getCustomDate(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getFullYear(),
  new Date().getMonth() + 1
)
