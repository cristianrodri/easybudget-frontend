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
