import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  makeStyles,
  Slide,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import { forwardRef, ReactElement, Ref } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import NumberFormat from 'react-number-format'

interface Props {
  openDialog: boolean
  handleClose: () => void
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
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
    padding: theme.spacing(2)
  }
}))

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const NumberFormatCustom = forwardRef<NumberFormat, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={values => {
          onChange({
            target: {
              name: props.name,
              value: values.value
            }
          })
        }}
        thousandSeparator="."
        decimalSeparator=","
        isNumericString
        prefix="$"
      />
    )
  }
)

const AddBudget = ({ openDialog, handleClose }: Props) => {
  const classes = useStyles()

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
          <Button autoFocus color="inherit" onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <form className={classes.form}>
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          fullWidth
          // value={values.description}
        />
        <TextField
          label="Amount"
          name="amount"
          // value={values.amount}
          // onChange={handleChange}
          fullWidth
          variant="outlined"
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: NumberFormatCustom as any
          }}
        />
      </form>
    </Dialog>
  )
}

export default AddBudget
