import { useContext } from 'react'
import { Budget } from '@custom-types'
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { getDayAndMonth } from '@utils/dates'
import { BudgetType } from '@utils/enums'
import { formatMoney } from '@utils/money'
import { textCapitalize } from '@utils/string'
import DeleteIcon from '@mui/icons-material/Delete'
import { colorDescription } from '@utils/color'
import { Context } from '@context/GlobalContext'
import { openDialogDeletion } from '@context/actions'

type Props = {
  budget: Budget
  isDialog?: boolean
}

export const BudgetDescription = ({ budget, isDialog }: Props) => {
  const { dispatch } = useContext(Context)
  const { description, money, date, category } = budget
  const type = typeof category !== 'number' ? category.type : ('' as BudgetType)

  const handleDeleteClick = () => {
    dispatch(openDialogDeletion(budget))
  }

  return (
    <Stack direction="row" spacing={2}>
      {!isDialog && (
        <Stack color={colorDescription?.[type]?.main}>
          {type === BudgetType.INCOME ? '+' : '-'}
        </Stack>
      )}
      <Stack flexGrow={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
          fontWeight={theme => theme.typography.fontWeightRegular}
          color={colorDescription?.[type]?.main}
        >
          <Box component="span">{textCapitalize(description)}</Box>
          <Box
            component="span"
            sx={{
              width: '50%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: theme => theme.spacing(1),
              textAlign: 'right'
            }}
          >
            {formatMoney(money)}
            <Tooltip title="Delete" arrow>
              <IconButton
                aria-label="delete"
                sx={{ p: 0, color: colorDescription?.[type]?.main }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
        <Typography
          component="span"
          variant="caption"
          color={colorDescription?.[type]?.light}
        >
          {getDayAndMonth(date)}
        </Typography>
      </Stack>
    </Stack>
  )
}
