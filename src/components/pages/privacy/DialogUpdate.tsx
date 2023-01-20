import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useUpdatePassword } from '@hooks/useUpdatePassword'

type Props = {
  open: boolean
  handleClose(): void
  newPassword: string
  resetForm: ReturnType<typeof useFormik>['resetForm']
}

const PADDING_Y = 2
const PADDING_X = 3

export const DialogUpdate = ({
  open,
  handleClose,
  newPassword,
  resetForm
}: Props) => {
  const {
    isLoading,
    currentPassword,
    setCurrentPassword,
    handleChange,
    handleSubmit
  } = useUpdatePassword(newPassword, () => {
    resetForm()

    handleClose()
  })

  const closeDialog = () => {
    setCurrentPassword('')
    handleClose()
  }

  return (
    <Dialog open={open} onClose={closeDialog} sx={{ p: 2 }}>
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
          onChange={handleChange}
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
