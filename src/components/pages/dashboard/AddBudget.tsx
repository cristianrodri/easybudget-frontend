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
import { ChangeEvent, forwardRef, ReactElement, Ref, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import NumberFormat from 'react-number-format'
import { number, object, SchemaOf, string } from 'yup'
import { useFormik } from 'formik'
import { BudgetType, CustomCategory } from '@custom-types'
import { clientInstance as axios } from '@config/axios'

interface Props {
  openDialog: boolean
  handleClose: () => void
  categories: CustomCategory[]
}

interface FormTypes {
  description: string
  money: number
  category: number | ''
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

const AddBudget = ({ openDialog, handleClose, categories }: Props) => {
  const classes = useStyles()
  const [budgetType, setBudgetType] = useState<
    BudgetType.INCOME | BudgetType.EXPENSE
  >(null)

  const validationSchema: SchemaOf<FormTypes> = object({
    description: string()
      .required('Description is required')
      .min(2, 'Description must be at least 2 characters')
      .max(50, 'Description must be at most 50 characters'),
    money: number()
      .transform(value => (isNaN(value) ? undefined : value))
      .required('Amount is required')
      .min(1, 'Amount must be greater than 0'),
    category: number().required('Category is required')
  })

  const formik = useFormik<FormTypes>({
    initialValues: {
      description: '',
      money: null,
      category: ''
    },
    validationSchema,
    onSubmit: async values => {
      const res = await axios.post('/api/create-budget', values)

      console.log(res.data)
    }
  })

  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setBudgetType(e.target.value as BudgetType)
    // when budget type is changed in radio button, select the first budget type into select element
    const firstBudgetType = categories.find(
      category => category.type === e.target.value
    )
    formik.setFieldValue('category', firstBudgetType.id)
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
            Add New Budget
          </Typography>
          <Button
            type="submit"
            autoFocus
            color="inherit"
            form="add-budget-form"
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
          <FormLabel component="legend">Gender</FormLabel>
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
            id="category"
            name="category"
            value={formik.values.category}
            defaultValue={''}
            onChange={formik.handleChange}
            label="Category"
            error={formik.touched.category && Boolean(formik.errors.category)}
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
            {formik.touched.category && formik.errors.category}
          </FormHelperText>
        </FormControl>
      </form>
    </Dialog>
  )
}

export default AddBudget
