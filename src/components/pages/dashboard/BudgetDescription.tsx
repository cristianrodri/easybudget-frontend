import { Budget } from '@custom-types'
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { getDayAndMonth } from '@utils/dates'
import { BudgetType } from '@utils/enums'
import { formatMoney } from '@utils/money'
import { textCapitalize } from '@utils/string'
import DeleteIcon from '@mui/icons-material/Delete'

type Props = Budget & {
  isDialog?: boolean
}

const color = {
  [BudgetType.INCOME]: {
    main: green[700],
    light: green[400]
  },
  [BudgetType.EXPENSE]: {
    main: red[700],
    light: red[400]
  }
}

export const BudgetDescription = ({
  description,
  money,
  date,
  category,
  isDialog
}: Props) => {
  const type = typeof category !== 'number' ? category.type : ('' as BudgetType)

  return (
    <Stack direction="row" spacing={2}>
      {!isDialog && (
        <Stack color={color?.[type]?.main}>
          {type === BudgetType.INCOME ? '+' : '-'}
        </Stack>
      )}
      <Stack flexGrow={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
          fontWeight={theme => theme.typography.fontWeightRegular}
          color={color?.[type]?.main}
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
                sx={{ p: 0, color: color?.[type]?.main }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
        <Typography
          component="span"
          variant="caption"
          color={color?.[type]?.light}
        >
          {getDayAndMonth(date)}
        </Typography>
      </Stack>
    </Stack>
  )
}
