import {
  Box,
  Button,
  TextField,
  makeStyles,
  Typography
} from '@material-ui/core'
import { useFormik } from 'formik'
import { object, string, SchemaOf } from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useFocus } from '@hooks/useFocus'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { clientInstance as axios } from '@config/axios'

interface FormTypes {
  identifier: string
  password: string
}

const useStyles = makeStyles(theme => ({
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
  const ref = useFocus()
  const { title, textField, button } = useStyles()

  const validationSchema: SchemaOf<FormTypes> = object({
    identifier: string().required('Email or username is required'),
    password: string().required('Password is required')
  })

  const formik = useFormik<FormTypes>({
    initialValues: {
      identifier: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)

      const res = await axios.post('/api/login', values)
      if (res.data.success) {
        router.push('dashboard')
      } else {
        // add a alert message later on
        console.log(res.data.message)
      }
      setSubmitting(false)
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
        clone
        width="min(80%, 300px)"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
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
        </form>
      </Box>
      <Link href="/signup" passHref>
        <Box
          clone
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          width="max-content"
          mx="auto"
          mb={2}
          style={{ textDecoration: 'none' }}
        >
          <a>
            <Box
              clone
              display="grid"
              gridTemplateColumns="auto auto"
              justifyContent="center"
              alignItems="center"
              gridGap="0.5rem"
            >
              <Typography variant="caption">
                Create your account {<ArrowForwardIcon fontSize="small" />}
              </Typography>
            </Box>
          </a>
        </Box>
      </Link>
    </Box>
  )
}
