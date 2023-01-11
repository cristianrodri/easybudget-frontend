import { useContext, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { LayoutAuth } from '@components/LayoutAuth'
import { useFormik } from 'formik'
import { object, SchemaOf, string } from 'yup'
import { PageTitle } from '@components/common/PageTitle'
import { UserAvatar } from '@components/pages/profile/UserAvatar'
import { clientPutApi } from '@config/api_client'
import { openSnackbar } from '@context/actions'
import { Context } from '@context/GlobalContext'
import { UpdateUser, User as UserType } from '@custom-types'
import { useFocus } from '@hooks/useFocus'
import { useUserData } from '@hooks/useSWRUser'
import { SnackbarType } from '@utils/enums'
import { useUserAvatar } from '@hooks/useSWRAvatar'
import { getUserId } from '@utils/api/token'
import User from '@db/user/model'

interface Props {
  userData: UserType
}

interface FormTypes {
  username: string
  email: string
}

const Profile = ({ userData }: Props) => {
  const { dispatch } = useContext(Context)
  const { data } = useUserData(userData)
  const { data: avatar } = useUserAvatar(userData.avatar)
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

      const res = await clientPutApi<UpdateUser, FormTypes>(
        'api/user/update',
        values,
        {
          params: {
            id: data.id
          }
        }
      )

      if (res.success === true) {
        dispatch(
          openSnackbar(
            'Profile data has been changed successfully',
            SnackbarType.SUCCESS
          )
        )
      } else {
        dispatch(openSnackbar(res.message, SnackbarType.ERROR))
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
    <LayoutAuth title="Profile">
      <PageTitle name="Profile" />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          display="flex"
          flexDirection="column"
          style={{ width: 'min(90%, 300px)' }}
        >
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
        </Box>
        {readOnly ? (
          <Button color="primary" variant="contained" onClick={handleReadOnly}>
            Edit profile
          </Button>
        ) : null}
      </Box>
      <UserAvatar avatar={avatar} />
    </LayoutAuth>
  )
}

export default Profile

export const getServerSideProps = async ({ req }) => {
  const userId = getUserId(req)

  const data = await User.findOne({ _id: userId })

  return {
    props: {
      userData: JSON.parse(JSON.stringify(data))
    }
  }
}
