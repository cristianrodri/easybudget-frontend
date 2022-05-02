import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DatePicker from './DatePicker'
import { MoneyFormat } from './form/MoneyFormat'
import { BudgetType } from '@utils/enums'
import { BudgetTypeRadio } from './form/BudgetTypeRadio'
import { useBudgetFormik } from '@hooks/useBudgetFormik'
import { CategorySelect } from './form/CategorySelect'
import { Description } from './form/Description'

export const DialogEdition = () => {
  const [open, setOpen] = useState(true)
  const [budgetType, setBudgetType] = useState<
    BudgetType.INCOME | BudgetType.EXPENSE
  >(null)

  const formik = useBudgetFormik(
    {
      description: '',
      money: null,
      categoryId: ''
    },
    async () => {
      return
    }
  )

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
        <DatePicker />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Edit</Button>
      </DialogActions>
    </Dialog>
  )
}
