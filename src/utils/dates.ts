import { WalletDate } from '@context/types'
import { Budget } from '@custom-types'

export const isAllTime = (walletDate: WalletDate) => walletDate.year === 'all'
const isCompleteYear = (walletDate: WalletDate) => walletDate.month === 'all'

// This function return a start ISO date and an end ISO date, which is useful when need to add api params to get budgets by specific date in database
export const getCustomDate = (walletDate: WalletDate) => {
  const { year, month } = walletDate

  // If the wallet year is 'all', return and empty string to start and end
  if (isAllTime(walletDate)) {
    return {
      start: '',
      end: ''
    }
  }

  // Otherwise if the wallet month is 'all', return the complete year date
  if (isCompleteYear(walletDate)) {
    return {
      start: new Date(year as number, 0).toISOString(),
      end: new Date((year as number) + 1, 0).toISOString()
    }
  }

  // Otherwise just return the "provided year" and first day of the "provided month" with "provided year" and first day of the next "provided month"
  return {
    start: new Date(year as number, month as number).toISOString(),
    end: new Date(year as number, (month as number) + 1).toISOString()
  }
}

export const getDateWithZero = (date: Date | string) =>
  +`0${new Date(date).getDate()}`.slice(-2)

export const getMonthName = (date: Date | string) =>
  new Date(date).toLocaleString('en-us', { month: 'long' })

export const getDayAndMonth = (date: Date | string) =>
  `${getDateWithZero(date)} ${getMonthName(date)}`

// This function add a custom title to dashboard date title and dialog date title.
export const dateTitle = (walletDate: WalletDate) => {
  // If wallet year is 'all', show'All time' to the title
  if (isAllTime(walletDate)) return 'All time'
  // Otherwise if the wallet month is 'all', show only the year to the title
  else if (isCompleteYear(walletDate)) return walletDate.year

  // If none of them are 'all', then show 'Month Year' to the title
  return `${getMonthName(
    new Date(walletDate.year as number, walletDate.month as number)
  )} ${walletDate.year as number}`
}

// Check if the first date of the parameter is less than the second date of the parameter
export const isBeforeDate = (
  firstDate: Date | string,
  secondDate: Date | string
) => new Date(firstDate).getTime() < new Date(secondDate).getTime()

// Sort budgets by date in descending order
export const sortBudgetsByDescDate = (a: Budget, b: Budget) =>
  new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1

// Check if the provided budget date is between into the wallet date
export const dateIsBetween = (walletDate: WalletDate, budgetDate: string) => {
  const { start, end } = getCustomDate(walletDate)

  // If start and end are equals to empty, return automatically true because wallet date covers all the user budgets
  if (start === '' && end === '') return true

  // If the budget date is greater than or equal to the "start wallet date" and is less than or equal to "end wallet date" return true because the budget date matches the wallet date
  if (
    new Date(budgetDate).getTime() >= new Date(start).getTime() &&
    new Date(budgetDate).getTime() <= new Date(end).getTime()
  )
    return true

  return false
}
