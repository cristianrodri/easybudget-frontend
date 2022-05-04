import { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { MoneyFormat } from './form/MoneyFormat'
import { BudgetType } from '@utils/enums'
import { BudgetTypeRadio } from './form/BudgetTypeRadio'
import { EditBudgetTypes, useBudgetFormik } from '@hooks/useBudgetFormik'
import { CategorySelect } from './form/CategorySelect'
import { Description } from './form/Description'
import { Context } from '@context/GlobalContext'
import { closeDialogEdition } from '@context/actions'
import { DatePickerBudget } from './DatePickerBudget'
import { useUserData } from '@hooks/useSWRUser'
import { getCategoryDataFromBudget } from '@utils/budget'
import { useSWRLatestBudgets } from '@hooks/useSWRLatestBudgets'

export const DialogEdition = () => {
  const { values, dispatch } = useContext(Context)
  const { data } = useUserData()
  const { mutateByEditionBudget } = useSWRLatestBudgets()
  const { budgetToUpdate: budget, dialogEditionOpen } = values
  const [budgetType, setBudgetType] = useState<
    BudgetType.INCOME | BudgetType.EXPENSE
  >(null)
  const formik = useBudgetFormik('update', async (values: EditBudgetTypes) => {
    mutateByEditionBudget(values)
  })

  useEffect(() => {
    if (budget) {
      const budgetCategory = getCategoryDataFromBudget(
        budget.category,
        data.categories
      )

      formik.setFieldValue('description', budget.description)
      formik.setFieldValue('money', budget.money)
      formik.setFieldValue('categoryId', budgetCategory.id)
      setBudgetType(budgetCategory.type)
      formik.setFieldValue('date', new Date(budget.date))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budget])

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
          categoryId={formik.values.categoryId}
          handleChange={formik.handleChange}
          touched={formik.touched.categoryId}
          error={formik.errors.categoryId}
          budgetType={budgetType}
        />
        <DatePickerBudget
          date={(formik.values as EditBudgetTypes).date}
          setFieldValue={formik.setFieldValue}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Edit</Button>
      </DialogActions>
    </Dialog>
  )
}
