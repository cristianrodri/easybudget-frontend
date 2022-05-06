import { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { MoneyFormat } from './form/MoneyFormat'
import { BudgetType, SnackbarType } from '@utils/enums'
import { BudgetTypeRadio } from './form/BudgetTypeRadio'
import { EditBudgetTypes, useBudgetFormik } from '@hooks/useBudgetFormik'
import { CategorySelect } from './form/CategorySelect'
import { Description } from './form/Description'
import { Context } from '@context/GlobalContext'
import { closeDialogEdition, openSnackbar } from '@context/actions'
import { DatePickerBudget } from './DatePickerBudget'
import { useUserData } from '@hooks/useSWRUser'
import { getCategoryDataFromBudget } from '@utils/budget'
import { useSWRLatestBudgets } from '@hooks/useSWRLatestBudgets'
import { clientPutApi } from '@config/api_client'
import { Budget } from '@custom-types'

export const DialogEdition = () => {
  const { values, dispatch } = useContext(Context)
  const { data, mutateCategoryByEditingBudget } = useUserData()
  const {
    mutateByEditionBudget,
    isDateBudgetMovedBackwards,
    reloadLatestBudgetsAPI
  } = useSWRLatestBudgets()
  const { budgetToUpdate: budget, dialogEditionOpen } = values
  const [budgetType, setBudgetType] = useState<
    BudgetType.INCOME | BudgetType.EXPENSE
  >(null)

  const formik = useBudgetFormik('update', async (values: EditBudgetTypes) => {
    // The latest budgets will be using loading component if the date of the updated budget has been changed backwards
    mutateByEditionBudget(values)

    mutateCategoryByEditingBudget(values)

    dispatch(closeDialogEdition())

    const res = await clientPutApi<Budget>(
      `api/budget/update/${budget.id}`,
      values
    )

    if (res.success === true) {
      // If the date of the updated budget has been moved backwards, call the API to update the data and keep using the loading component into the "Latest Budgets" component
      if (isDateBudgetMovedBackwards(values.date)) {
        await reloadLatestBudgetsAPI()
      }

      dispatch(
        openSnackbar(
          `${res.data.description} has been updated`,
          SnackbarType.SUCCESS
        )
      )
    } else dispatch(openSnackbar(res.message, SnackbarType.ERROR))
  })

  useEffect(() => {
    if (budget) {
      const budgetCategory = getCategoryDataFromBudget(
        budget.category,
        data.categories
      )

      formik.setFieldValue('description', budget.description)
      formik.setFieldValue('money', budget.money)
      formik.setFieldValue('category', budgetCategory.id)
      setBudgetType(budgetCategory.type)
      formik.setFieldValue('date', new Date(budget.date))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budget])

  const handleEdit = () => {
    formik.handleSubmit()
  }

  const handleClose = () => {
    dispatch(closeDialogEdition())
  }

  return (
    <Dialog
      open={dialogEditionOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Edit Budget</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme => theme.spacing(3),
          '& > :first-of-type': {
            mt: theme => theme.spacing(1)
          }
        }}
      >
        <Description
          description={formik.values.description}
          handleChange={formik.handleChange}
          touched={formik.touched.description}
          error={formik.errors.description}
        />
        <MoneyFormat
          money={formik.values.money}
          setFieldValue={formik.setFieldValue}
          touched={formik.touched.money}
          error={formik.errors.money}
        />
        <BudgetTypeRadio
          budgetType={budgetType}
          setBudgetType={setBudgetType}
          setFieldValue={formik.setFieldValue}
        />
        <CategorySelect
          categoryId={formik.values.category}
          handleChange={formik.handleChange}
          touched={formik.touched.category}
          error={formik.errors.category}
          budgetType={budgetType}
        />
        <DatePickerBudget
          date={(formik.values as EditBudgetTypes).date}
          setFieldValue={formik.setFieldValue}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleEdit}>Edit</Button>
      </DialogActions>
    </Dialog>
  )
}
