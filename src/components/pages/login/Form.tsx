import {
  Box,
  Button,
  TextField,
  Theme,
  Typography,
  useTheme
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useContext } from 'react'
import { useFormik } from 'formik'
import { object, string, SchemaOf } from 'yup'
import { useRouter } from 'next/router'
import { useFocus } from '@hooks/useFocus'
import { FormLink } from '@components/common/FormLink'
import { Context } from '@context/GlobalContext'
import { SnackbarType } from '@utils/enums'
import { makeStyles } from '@mui/styles'
import { openSnackbar } from '@context/actions'
import { clientPostApi } from '@config/api_client'

interface FormTypes {
  email: string
  password: string
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(2)
  },
  textField: {
    width: '100%',
    marginBottom: theme.spacing(1),
    '& input': {
      fontSize: theme.typography.body2.fontSize
    }
  },
  button: {
    marginTop: theme.spacing(2),
    width: '100%',
    fontSize: theme.typography.body2.fontSize
  }
}))

export const Form = () => {
  const router = useRouter()
  const theme = useTheme()
  const { dispatch } = useContext(Context)
  const ref = useFocus()
  const { title, textField, button } = useStyles()

  const validationSchema: SchemaOf<FormTypes> = object({
    email: string().required('Email is required'),
    password: string().required('Password is required')
  })

  const formik = useFormik<FormTypes>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async values => {
      const res = await clientPostApi('api/login', values)

      if (res.success === true) {
        router.push('dashboard')
      } else {
        dispatch(openSnackbar(res.message, SnackbarType.ERROR))
      }
    }
  })

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flex={1}
    >
      <Typography component="h3" variant="h6" gutterBottom className={title}>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        width="min(80%, 300px)"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <TextField
          size="small"
          className={textField}
          id="email"
          label="Email"
          name="email"
          inputRef={ref}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          size="small"
          className={textField}
          type="password"
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
          {formik.isSubmitting ? 'Loading...' : 'login'}
        </Button>
      </Box>
      <FormLink href="/signup">
        <Typography
          variant="caption"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mt: theme.spacing(2)
          }}
        >
          Create your account {<ArrowForwardIcon fontSize="small" />}
        </Typography>
      </FormLink>
    </Box>
  )
}
