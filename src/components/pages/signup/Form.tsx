import { useContext } from 'react'
import { TextField, Button, Box, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import { object, string, SchemaOf, ref as yupRef } from 'yup'
import { useRouter } from 'next/router'
import { useFocus } from '@hooks/useFocus'
import { FormLink } from '@components/common/FormLink'
import { SnackbarType } from '@utils/enums'
import { Context } from '@context/GlobalContext'
import { openSnackbar } from '@context/actions'
import { clientPostApi } from '@config/api_client'

interface FormTypes {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const VARIANT = 'medium'

export const Form = () => {
  const theme = useTheme()
  const ref = useFocus()
  const router = useRouter()
  const { dispatch } = useContext(Context)

  const validationSchema: SchemaOf<FormTypes> = object({
    username: string()
      .min(2, 'Username should be of minimum 2 characters')
      .max(25, 'Username should be of maximum 25 characters')
      .required('Name is required'),
    email: string().email('Enter a valid email').required('Email is required'),
    password: string()
      .min(8, 'Password should be of minimum 8 characters')
      .required('Password is required'),
    confirmPassword: string().oneOf(
      [yupRef('password'), null],
      'Passwords must match'
    )
  })

  const formik = useFormik<FormTypes>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async values => {
      const submittedValues = { ...values }
      delete submittedValues.confirmPassword

      const res = await clientPostApi('api/register', submittedValues)

      if (res.success === true) {
        router.push('categories')
      } else {
        dispatch(openSnackbar(res.message, SnackbarType.ERROR))
      }
    }
  })

  return (
    <Box
      width={400}
      maxWidth={500}
      p={theme.spacing(4, 5)}
      borderRadius={8}
      bgcolor={theme.palette.grey[200]}
      boxShadow={theme.shadows[15]}
      display="grid"
    >
      <Typography
        component="h3"
        variant="h5"
        color="primary"
        align="center"
        gutterBottom
      >
        Sign up
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        display="grid"
        gap={theme.spacing(1.5)}
      >
        <TextField
          id="username"
          label="Username"
          name="username"
          inputRef={ref}
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          size={VARIANT}
        />
        <TextField
          id="email"
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          size={VARIANT}
        />
        <TextField
          id="password"
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          size={VARIANT}
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          size={VARIANT}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting}
          sx={{
            borderRadius: 24,
            padding: theme.spacing(1.5, 5),
            marginTop: theme.spacing(2)
          }}
        >
          {formik.isSubmitting ? 'Loading...' : 'sign up'}
        </Button>
      </Box>
      <Typography
        style={{ marginTop: theme.spacing(2) }}
        variant="body1"
        align="center"
      >
        Already registered? <FormLink href="/login">Login</FormLink>
      </Typography>
    </Box>
  )
}
