import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DatePicker from './DatePicker'
import { MoneyFormat } from './form/MoneyFormat'

export const DialogEdition = () => {
  const [open, setOpen] = useState(true)
  const [description, setDescription] = useState('')
  const [money, setMoney] = useState(0)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Budget</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme => theme.spacing(3)
        }}
      >
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          type="text"
          fullWidth
          variant="standard"
        />
        <MoneyFormat
          money={money}
          handleChange={value => setMoney(value.floatValue)}
        />
        <DatePicker />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Edit</Button>
      </DialogActions>
    </Dialog>
  )
}
