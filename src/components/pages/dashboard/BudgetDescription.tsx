import { Budget } from '@custom-types'
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { getDayAndMonth } from '@utils/dates'
import { BudgetType } from '@utils/enums'
import { formatMoney } from '@utils/money'
import { textCapitalize } from '@utils/string'
import DeleteIcon from '@mui/icons-material/Delete'
import { colorDescription } from '@utils/color'

type Props = Budget & {
  isDialog?: boolean
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
