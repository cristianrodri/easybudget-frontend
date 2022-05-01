import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Theme,
  Toolbar,
  Typography
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions/transition'
import { forwardRef, ReactElement, Ref, useContext, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { number, object, SchemaOf, string } from 'yup'
import { useFormik } from 'formik'
import { Budget } from '@custom-types'
import { BudgetType, SnackbarType } from '@utils/enums'
import { Context } from '@context/GlobalContext'
import { useUserData } from '@hooks/useSWRUser'
import { makeStyles } from '@mui/styles'
import { useSWRLatestBudgets } from '@hooks/useSWRLatestBudgets'
import { openSnackbar } from '@context/actions'
import { clientPostApi } from '@config/api_client'
import { MoneyFormat } from './form/MoneyFormat'
import { Description } from './form/Description'
import { BudgetTypeRadio } from './form/BudgetTypeRadio'
import { CategorySelect } from './form/CategorySelect'

interface Props {
  openDialog: boolean
  handleClose: () => void
}

type FormTypes = Omit<Budget, 'id' | 'date' | 'category'> & {
  categoryId: number | string
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  form: {
    padding: theme.spacing(2),
    display: 'grid',
    gridGap: theme.spacing(2)
  },
  formControlSelect: {
    display: 'flex',
    width: 'min(100%, 200px)',
    marginTop: theme.spacing(-2)
  }
}))

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement },
  ref: Ref<unknown>
) {
  return (
    <Slide direction="up" ref={ref} {...props}>
      {props.children}
    </Slide>
  )
})

const AddBudget = ({ openDialog, handleClose }: Props) => {
  const { dispatch } = useContext(Context)
  const classes = useStyles()
  const { data, mutateByAddingBudgetToCategory } = useUserData()
  const { mutateByAddingNewBudget } = useSWRLatestBudgets()
  const [budgetType, setBudgetType] = useState<
    BudgetType.INCOME | BudgetType.EXPENSE
  >(null)

  const categories = data?.categories.map(({ id, type, name }) => ({
    id,
    name,
    type
  }))

  const validationSchema: SchemaOf<FormTypes> = object({
    description: string()
      .required('Description is required')
      .min(2, 'Description must be at least 2 characters')
      .max(50, 'Description must be at most 50 characters'),
    money: number()
      .transform(value => (isNaN(value) ? undefined : value))
      .required('Amount is required')
      .min(1, 'Amount must be greater than 0'),
    categoryId: number().required('Category is required')
  })

  const formik = useFormik<FormTypes>({
    initialValues: {
      description: '',
      money: null,
      categoryId: ''
    },
    validationSchema,
    onSubmit: async values => {
      const res = await clientPostApi<Budget, FormTypes>(
        'api/budget/add',
        values
      )

      if (res.success === true) {
        const newBudget = res.data

        // Mutate SWR data by adding new budget into related category
        mutateByAddingBudgetToCategory(newBudget)

        // Mutate Latest budgets data by adding new budget to SWR data
        mutateByAddingNewBudget(newBudget)

        dispatch(
          openSnackbar(`${res.data.description} added!`, SnackbarType.SUCCESS)
        )

        // Close the dialog
        handleDialogClose()
      } else {
        dispatch(openSnackbar(res.message, SnackbarType.ERROR))
      }
    }
  })

  const handleDialogClose = () => {
    formik.resetForm()

    handleClose()
  }

  return (
    <Dialog
      fullScreen
      open={openDialog}
      TransitionComponent={Transition}
      onClose={handleDialogClose}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDialogClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {formik.isSubmitting ? 'Adding new budget...' : 'Add New Budget'}
          </Typography>
          <Button
            type="submit"
            autoFocus
            color="inherit"
            form="add-budget-form"
            disabled={formik.isSubmitting}
          >
            save
          </Button>
        </Toolbar>
      </AppBar>
      <form
        className={classes.form}
        onSubmit={formik.handleSubmit}
        id="add-budget-form"
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
          categories={categories}
          setFieldValue={formik.setFieldValue}
        />
        <CategorySelect
          categoryId={formik.values.categoryId}
          categories={categories}
          handleChange={formik.handleChange}
          touched={formik.touched.categoryId}
          error={formik.errors.categoryId}
          budgetType={budgetType}
        />
      </form>
    </Dialog>
  )
}

export default AddBudget
