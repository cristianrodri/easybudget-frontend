import { Layout } from '@components/Layout'
import {
  clientInstance as axiosClient,
  serverInstance as axios
} from '@config/axios'
import { Context } from '@context/GlobalContext'
import { User } from '@custom-types'
import { useFocus } from '@hooks/useFocus'
import { useSWRUser } from '@hooks/useSWRUser'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { SnackbarType } from '@utils/enums'
import { withAuthentication } from '@utils/middleware'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { object, SchemaOf, string } from 'yup'

interface Props {
  user: User
}

interface FormTypes {
  username: string
  email: string
}

const Profile = ({ user }: Props) => {
  const { data } = useSWRUser(user)
  const { openSnackbar } = useContext(Context)
  const ref = useFocus()
  const [readOnly, setReadOnly] = useState(true)

  const validationSchema: SchemaOf<FormTypes> = object({
    username: string()
      .min(2, 'Username should be of minimum 2 characters')
      .max(25, 'Username should be of maximum 25 characters')
      .required('Name is required'),
    email: string().email('Enter a valid email').required('Email is required')
  })

  const formik = useFormik<FormTypes>({
    initialValues: {
      username: data.username,
      email: data.email
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      helpers.setSubmitting(true)

      const res = await axiosClient.put('/api/user/edit', values, {
        params: {
          id: data.id
        }
      })

      if (res.data.success) {
        openSnackbar(
          'Profile data has been changed successfully',
          SnackbarType.SUCCESS
        )
      } else {
        openSnackbar(res.data.message, SnackbarType.ERROR)
      }

      helpers.setSubmitting(false)
      setReadOnly(true)
    }
  })

  const handleReadOnly = () => {
    setReadOnly(false)
    ref.current?.focus()
  }

  return (
    <Layout title="Profile">
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Profile
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          clone
          display="flex"
          flexDirection="column"
          style={{ width: 'min(90%, 300px)' }}
        >
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="username"
              inputRef={ref}
              name="username"
              variant="outlined"
              label="Username"
              style={{ marginBottom: '1rem' }}
              InputProps={{
                readOnly
              }}
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              id="email"
              name="email"
              variant="outlined"
              label="Email"
              style={{ marginBottom: '1rem' }}
              InputProps={{
                readOnly
              }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            {!readOnly ? (
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={formik.isSubmitting}
              >
                Save Changes
              </Button>
            ) : null}
          </form>
        </Box>
        {readOnly ? (
          <Button color="primary" variant="contained" onClick={handleReadOnly}>
            Edit profile
          </Button>
        ) : null}
      </Box>
    </Layout>
  )
}

export default Profile

export const getServerSideProps = withAuthentication<Props>(async ({ req }) => {
  const { token } = req.cookies

  const res = await axios.get('/users/me', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  return {
    props: {
      user: res.data
    }
  }
})
