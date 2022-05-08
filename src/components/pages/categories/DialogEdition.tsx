import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { GetCategory } from '@custom-types'
import { useState } from 'react'

interface Props {
  open: boolean
  handleClose: () => void
  category: GetCategory
}

export const DialogEdition = ({ open, handleClose, category }: Props) => {
  const [name, setName] = useState(category.name)

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Category Name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  )
}
