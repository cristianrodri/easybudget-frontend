import { useDeleteUser } from '@hooks/useDeleteUser'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'

type Props = {
  open: boolean
  handleClose(): void
}

const PADDING_Y = 2
const PADDING_X = 3

export const DialogDelete = ({ open, handleClose }: Props) => {
  const { text, isLoading, handleChange, emptyText, handleSubmit } =
    useDeleteUser()

  const closeDialog = () => {
    emptyText()
    handleClose()
  }

  return (
    <Dialog open={open} onClose={closeDialog} sx={{ p: 2 }}>
      <DialogTitle sx={{ p: theme => theme.spacing(PADDING_Y, PADDING_X) }}>
        Are you sure you want to delete your account?
      </DialogTitle>
      <DialogContent
        sx={{ p: theme => theme.spacing(PADDING_Y, PADDING_X), pt: 2 }}
        style={{ paddingTop: 8 }}
      >
        <TextField
          type="password"
          label="Type your Password"
          value={text}
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
          {isLoading ? 'Deleting...' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
