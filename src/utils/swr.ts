export const getAllBudgets = () => '/api/user/get'

export const getBudgetsByDate = (start: string, end: string) => {
  return () =>
    `/api/user/get?budgets_date_start=${start}&budgets_date_end=${end}`
}
