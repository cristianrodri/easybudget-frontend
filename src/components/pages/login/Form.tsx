import { Box, Button, TextField, makeStyles } from '@material-ui/core'
import { useFormik } from 'formik'
import { object, string, SchemaOf } from 'yup'
import { useFocus } from '@hooks/useFocus'

interface FormTypes {
  identifier: string
  password: string
}

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}))

export const Form = () => {
  const ref = useFocus()
  const { textField, button } = useStyles()

  const validationSchema: SchemaOf<FormTypes> = object({
    identifier: string().required('Email or password is required'),
    password: string().required('Password is required')
  })

  const formik = useFormik<FormTypes>({
    initialValues: {
      identifier: '',
      password: ''
    },
    validationSchema,
    onSubmit: async values => {
      console.log(values)
    }
  })

  return (
    <Box
      width="50%"
      bgcolor="white"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      style={{ gap: '1rem' }}
    >
      <h2>Login</h2>
      <Box clone display="flex" flexDirection="column" alignItems="center">
        <form>
          <TextField
            // variant="outlined"
            size="small"
            className={textField}
            id="identifier"
            label="Email or username"
            name="identifier"
            inputRef={ref}
            value={formik.values.identifier}
            onChange={formik.handleChange}
            error={
              formik.touched.identifier && Boolean(formik.errors.identifier)
            }
            helperText={formik.touched.identifier && formik.errors.identifier}
          />
          <TextField
            // variant="outlined"
            size="small"
            id="password"
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={button}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Loading...' : 'sign up'}
          </Button>
        </form>
      </Box>
    </Box>
  )
}
