import { useContext } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Context } from '@context/GlobalContext'
import { closeCategoryDialog } from '@context/actions'
import { textCapitalize } from '@utils/string'
import { BudgetDescription } from './BudgetDescription'
import { formatMoney } from '@utils/money'
import { Box, Stack } from '@mui/material'
import { dateTitle, sortBudgetsByDescDate } from '@utils/dates'
import { colorWallet } from '@utils/color'

export const DialogCategory = () => {
  const { values, dispatch } = useContext(Context)
  const { categoryDialogOpen, categoryDialog, walletDate } = values

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
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Stack component="span" direction="row" flexWrap="wrap">
          <Box component="span">
            {textCapitalize(categoryDialog.name)}&nbsp;-&nbsp;
          </Box>
          <Box component="span">{dateTitle(walletDate)}</Box>
        </Stack>
        <Box
          component="span"
          sx={{
            color: colorWallet[categoryDialog.type],
            width: '60%',
            textAlign: 'end'
          }}
        >
          {formatMoney(categoryDialog.money)}
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
        {categoryDialog.budgets.sort(sortBudgetsByDescDate).map(budget => (
          <BudgetDescription key={budget.id} budget={budget} isDialog />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
