import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { object, SchemaOf, string, ref as yupRef } from 'yup'
import { DialogDelete } from './DialogDelete'
import { DialogUpdate } from './DialogUpdate'

type FormTypes = { password: string; confirmPassword: string }

export const PrivacyActions = () => {
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const validationSchema: SchemaOf<FormTypes> = object({
    password: string()
      .required('Password is required')
      .min(8, 'Password should be of minimum 8 characters'),
    confirmPassword: string().oneOf(
      [yupRef('password'), null],
      'Passwords must match'
    )
  })

  const formik = useFormik<FormTypes>({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async () => {
      setOpenDialogUpdate(true)
    }
  })

  const handleClose = () => {
    setOpenDialogUpdate(false)
    setOpenDialogDelete(false)
  }

  const handleDelete = () => {
    setOpenDialogDelete(true)
  }

  return (
    <>
      <DialogUpdate
        open={openDialogUpdate}
        handleClose={handleClose}
        newPassword={formik.values.password}
        resetForm={formik.resetForm}
      />
      <DialogDelete open={openDialogDelete} handleClose={handleClose} />
      <Box
        sx={{
          width: 'min(100%, 400px)'
        }}
        ml="auto"
        mr="auto"
      >
        <Typography variant="h6" align="center" color="primary" gutterBottom>
          Update Password
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ gap: theme => theme.spacing(2) }}
        >
          <TextField
            sx={{ width: '80%' }}
            type="password"
            id="password"
            label="New Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            sx={{ width: '80%' }}
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Button type="submit" variant="contained">
            Update Password
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          sx={{ mt: theme => theme.spacing(2) }}
        >
          <Button onClick={handleDelete} variant="outlined" color="error">
            Delete Account
          </Button>
        </Box>
      </Box>
    </>
  )
}
