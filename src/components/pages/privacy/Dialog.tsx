import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { TextField } from '@mui/material'

type Props = {
  open: boolean
  handleClose(): void
}

export const DialogConfirm = ({ open, handleClose }: Props) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ p: theme => theme.spacing(1, 3) }}>
        Type your current password
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <TextField type="password" label="Current Password" />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" fullWidth>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
