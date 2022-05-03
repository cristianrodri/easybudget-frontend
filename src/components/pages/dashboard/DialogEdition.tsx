import { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { MoneyFormat } from './form/MoneyFormat'
import { BudgetType } from '@utils/enums'
import { BudgetTypeRadio } from './form/BudgetTypeRadio'
import { EditTypes, useBudgetFormik } from '@hooks/useBudgetFormik'
import { CategorySelect } from './form/CategorySelect'
import { Description } from './form/Description'
import { Context } from '@context/GlobalContext'
import { closeDialogEdition } from '@context/actions'
import { AddCategory } from '@custom-types'
import { DatePickerBudget } from './DatePickerBudget'

export const DialogEdition = () => {
  const { values, dispatch } = useContext(Context)
  const { budgetToUpdate: budget, dialogEditionOpen } = values
  const [budgetType, setBudgetType] = useState<
    BudgetType.INCOME | BudgetType.EXPENSE
  >(null)

  useEffect(() => {
    formik.setFieldValue('description', budget?.description)
    formik.setFieldValue('money', budget?.money)
    formik.setFieldValue('categoryId', (budget?.category as AddCategory)?.id)
    setBudgetType((budget?.category as AddCategory)?.type)
    formik.setFieldValue('date', budget ? new Date(budget.date) : null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budget])

  const formik = useBudgetFormik('update', async () => {
    return
  })

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
          gap: theme => theme.spacing(3)
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
          date={(formik.values as EditTypes).date}
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
