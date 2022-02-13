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
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slide,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import {
  ChangeEvent,
  forwardRef,
  ReactElement,
  Ref,
  useContext,
  useState
} from 'react'
import CloseIcon from '@material-ui/icons/Close'
import NumberFormat from 'react-number-format'
import { number, object, SchemaOf, string } from 'yup'
import { useFormik } from 'formik'
import { AddCategory, Budget, User } from '@custom-types'
import { clientInstance as axios } from '@config/axios'
import { BudgetType, SnackbarType } from '@utils/enums'
import { Context } from '@context/GlobalContext'
import { useSWRUser } from '@hooks/useSWRUser'

interface Props {
  openDialog: boolean
  handleClose: () => void
  user: User
}

type FormTypes = Omit<Budget, 'id' | 'date' | 'categoryId'> & {
  categoryId: number | string
}

const useStyles = makeStyles(theme => ({
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
  return <Slide direction="up" ref={ref} {...props} />
})

const AddBudget = ({ openDialog, handleClose, user }: Props) => {
  const { openSnackbar } = useContext(Context)
  const classes = useStyles()
  const { data, mutate } = useSWRUser(user)
  const [budgetType, setBudgetType] = useState<
    BudgetType.INCOME | BudgetType.EXPENSE
  >(null)

  const categories: AddCategory[] = data.categories.map(
    ({ id, type, name }) => ({
      id,
      name,
      type
    })
  )

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
    onSubmit: async (values, helpers) => {
      const res = await axios.post<
        { success: true; data: Budget } | { success: false; message: string }
      >('/api/budget/add', values)

      if (res.data.success === true) {
        const categoryId = res.data.data.categoryId
        const newBudget = res.data.data

        helpers.resetForm({
          values: {
            description: '',
            money: 0,
            categoryId: ''
          }
        })

        // Mutate SWR data by adding new budget into related category
        const mutatedData = { ...data }

        mutatedData.categories.map(c => {
          if (c.id === categoryId) {
            c.budgets = [...c.budgets, newBudget]
            c.money += newBudget.money
          }

          return c
        })

        mutate(mutatedData, false)

        openSnackbar(
          `${res.data.data.description} added!`,
          SnackbarType.SUCCESS
        )

        // Close the dialog
        handleClose()
      } else {
        res.data.success
        openSnackbar(res.data.message, SnackbarType.ERROR)
      }
    }
  })

  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setBudgetType(e.target.value as BudgetType)
    // when budget type is changed in radio button, select the first budget type into select element
    const firstBudgetType = categories.find(
      category => category.type === e.target.value
    )
    formik.setFieldValue('categoryId', firstBudgetType.id)
  }

  return (
    <Dialog fullScreen open={openDialog} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
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
            {categories.map(category => (
              <MenuItem
                key={category.id}
                value={category.id}
                style={{ display: budgetType !== category.type ? 'none' : '' }}
              >
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText style={{ color: '#f44336' }}>
            {formik.touched.categoryId && formik.errors.categoryId}
          </FormHelperText>
        </FormControl>
      </form>
    </Dialog>
  )
}

export default AddBudget
