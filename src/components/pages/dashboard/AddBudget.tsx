import {
  AppBar,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slide,
  TextField,
  Theme,
  Toolbar,
  Typography
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions/transition'
import {
  ChangeEvent,
  forwardRef,
  ReactElement,
  Ref,
  useContext,
  useState
} from 'react'
import CloseIcon from '@mui/icons-material/Close'
import NumberFormat from 'react-number-format'
import { number, object, SchemaOf, string } from 'yup'
import { useFormik } from 'formik'
import { Budget } from '@custom-types'
import { clientInstance as axios } from '@config/axios'
import { BudgetType, SnackbarType } from '@utils/enums'
import { Context } from '@context/GlobalContext'
import { useUserData } from '@hooks/useSWRUser'
import { makeStyles } from '@mui/styles'
import { currentMonth } from '@utils/dates'
import { useSWRLatestBudgets } from '@hooks/useSWRLatestBudgets'

interface Props {
  openDialog: boolean
  handleClose: () => void
}

type FormTypes = Omit<Budget, 'id' | 'date' | 'category'> & {
  categoryId: number | string
}

type ApiResponse =
  | { success: true; data: Budget }
  | { success: false; message: string }

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
  const { openSnackbar } = useContext(Context)
  const classes = useStyles()
  const { data, mutateByAddingBudgetToCategory } = useUserData(currentMonth)
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
      const res = await axios.post<ApiResponse>('/api/budget/add', values)

      if (res.data.success === true) {
        const newBudget = res.data.data

        // Mutate SWR data by adding new budget into related category
        mutateByAddingBudgetToCategory(newBudget)

        // Mutate Latest budgets data by adding new budget to SWR data
        mutateByAddingNewBudget(newBudget)

        openSnackbar(
          `${res.data.data.description} added!`,
          SnackbarType.SUCCESS
        )

        // Close the dialog
        handleDialogClose()
      } else {
        openSnackbar(res.data.message, SnackbarType.ERROR)
      }
    }
  })

  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setBudgetType(e.target.value as BudgetType)
    // When budget type is changed in radio button, display the first "budget type" into the select
    const firstBudgetType = categories.find(
      category => category.type === e.target.value
    )
    formik.setFieldValue('categoryId', firstBudgetType.id)
  }

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
        <TextField
          id="description"
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          variant="outlined"
          fullWidth
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <NumberFormat
          id="money"
          label="Amount"
          name="money"
          value={formik.values.money}
          onValueChange={e => formik.setFieldValue('money', e.floatValue)}
          customInput={TextField}
          variant="outlined"
          fullWidth
          error={formik.touched.money && Boolean(formik.errors.money)}
          helperText={formik.touched.money && formik.errors.money}
          thousandSeparator="."
          decimalSeparator=","
          isNumericString
          prefix="$"
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Budget Type</FormLabel>
          <RadioGroup
            row
            aria-label="Type"
            name="type"
            onChange={handleChangeRadio}
          >
            <FormControlLabel
              value="income"
              control={<Radio />}
              label="Income"
            />
            <FormControlLabel
              value="expense"
              control={<Radio />}
              label="Expense"
            />
          </RadioGroup>
        </FormControl>
        <FormControl className={classes.formControlSelect}>
          <InputLabel id="select-label">Category</InputLabel>
          <Select
            labelId="select-label"
            id="categoryId"
            name="categoryId"
            value={formik.values.categoryId}
            defaultValue={''}
            onChange={formik.handleChange}
            label="Category"
            error={
              formik.touched.categoryId && Boolean(formik.errors.categoryId)
            }
          >
            {categories?.map(category => (
              <MenuItem
                key={category.id}
                value={category.id}
                style={{ display: budgetType !== category.type ? 'none' : '' }}
              >
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
            {formik.touched.categoryId && formik.errors.categoryId}
          </FormHelperText>
        </FormControl>
      </form>
    </Dialog>
  )
}

export default AddBudget
