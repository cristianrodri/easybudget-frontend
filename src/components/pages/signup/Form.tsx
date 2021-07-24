import {
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
  Snackbar
} from '@material-ui/core'
// import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik'
import { object, string, SchemaOf } from 'yup'
import { useEffect, useRef, useState } from 'react'
import { clientInstance as axios } from '@config/axios'
import { useRouter } from 'next/router'

interface FormTypes {
  username: string
  email: string
  password: string
}

export const Form = () => {
  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement>()
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const validationSchema: SchemaOf<FormTypes> = object({
    username: string()
      .min(2, 'Password should be of minimum 2 characters')
      .max(25, 'Password should be of maximum 25 characters')
      .required('Name is required'),
    email: string().email('Enter a valid email').required('Email is required'),
    password: string()
      .min(8, 'Password should be of minimum 8 characters')
      .required('Password is required')
  })

  const formik = useFormik<FormTypes>({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)

      const res = await axios.post('/api/register', values)
      if (res.data.success) {
        router.push('dashboard')
      } else {
        setOpen(true)
        setErrorMessage(res.data.message)
      }
      setSubmitting(false)
    }
  })

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      width="55%"
      p={theme.spacing(6, 8)}
      borderRadius={16}
      bgcolor={theme.palette.grey[200]}
      boxShadow={theme.shadows[15]}
      display="grid"
    >
      <Box clone alignSelf="center">
        <Typography component="h3" variant="h4" color="primary">
          Sign up
        </Typography>
      </Box>
      <Box clone display="grid">
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="username"
            label="Username"
            name="username"
            inputRef={inputRef}
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
          />
          <Box
            clone
            justifySelf="start"
            alignSelf="center"
            style={{ borderRadius: 24, padding: theme.spacing(1.5, 5) }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Loading...' : 'sign up'}
            </Button>
          </Box>
        </form>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message={errorMessage}
        onClose={handleClose}
      />
    </Box>
  )
}
