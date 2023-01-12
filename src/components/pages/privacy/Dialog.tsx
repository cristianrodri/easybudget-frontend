import { useContext, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { TextField } from '@mui/material'
import { clientPutApi } from '@config/api_client'
import { Context } from '@context/GlobalContext'
import { openSnackbar } from '@context/actions'
import { SnackbarType } from '@utils/enums'
import { useFormik } from 'formik'

type Props = {
  open: boolean
  handleClose(): void
  newPassword: string
  resetForm: ReturnType<typeof useFormik>['resetForm']
}

const PADDING_Y = 2
const PADDING_X = 3

export const DialogConfirm = ({
  open,
  handleClose,
  newPassword,
  resetForm
}: Props) => {
  const { dispatch } = useContext(Context)
  const [currentPassword, setCurrentPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)

    const res = await clientPutApi('api/user/password/update', {
      currentPassword,
      newPassword
    })

    setIsLoading(false)

    if (res.success === true) {
      dispatch(
        openSnackbar(`Your password has been updated`, SnackbarType.SUCCESS)
      )

      setCurrentPassword('')
      resetForm()

      handleClose()
    } else {
      dispatch(openSnackbar(res.message, SnackbarType.ERROR))
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} sx={{ p: 2 }}>
      <DialogTitle sx={{ p: theme => theme.spacing(PADDING_Y, PADDING_X) }}>
        Type your current password
      </DialogTitle>
      <DialogContent
        sx={{ p: theme => theme.spacing(PADDING_Y, PADDING_X), pt: 2 }}
        style={{ paddingTop: 8 }}
      >
        <TextField
          type="password"
          label="Current Password"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          autoFocus
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ p: theme => theme.spacing(PADDING_Y, PADDING_X) }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Upading...' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
