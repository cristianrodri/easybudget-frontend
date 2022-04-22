import { useContext } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Context } from '@context/GlobalContext'
import { closeCategoryDialog } from '@context/actions'
import { textCapitalize } from '@utils/string'
import { BudgetDescription } from './budgets/Budget'
import { formatMoney } from '@utils/money'
import { Box } from '@mui/material'
import { colorWallet } from '@utils/color'

export const DialogBudgets = () => {
  const { values, dispatch } = useContext(Context)
  const { categoryDialogOpen, categoryDialog } = values

  const handleClose = () => {
    dispatch(closeCategoryDialog())
  }

  return (
    <Dialog
      open={categoryDialogOpen}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="md"
      PaperProps={{ sx: { width: 600, height: '100%' } }}
    >
      <DialogTitle
        id="scroll-dialog-title"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box component="span">{textCapitalize(categoryDialog.name)}</Box>
        <Box component="span" sx={{ color: colorWallet[categoryDialog.type] }}>
          $ {formatMoney(categoryDialog.money)}
        </Box>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme => theme.spacing(2)
        }}
      >
        {categoryDialog.budgets.map(budget => (
          <BudgetDescription key={budget.id} {...budget} />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
