import Budget from './model'

export const verifyBudgetId = async (budgetId: string, userId: string) => {
  const budget = await Budget.findOne({ _id: budgetId, user: userId })

  if (!budget) throw new Error('The budget id is not found')
}
