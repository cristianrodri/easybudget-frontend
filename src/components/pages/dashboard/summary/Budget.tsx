import { Stack, Typography } from '@mui/material'
import PaidIcon from '@mui/icons-material/Paid'
import { red, green, blue } from '@mui/material/colors'
import { textCapitalize } from '@utils/string'
import { BudgetType } from '@utils/enums'

interface Props {
  colorType: BudgetType.INCOME | BudgetType.EXPENSE | 'budget'
  money: number
}

const COLOR_VALUE = 800

const color = {
  expense: red[COLOR_VALUE],
  income: green[COLOR_VALUE],
  budget: blue[COLOR_VALUE]
}

export const Budget = ({ colorType, money }: Props) => {
  const formatMoney = new Intl.NumberFormat('es-CL').format(money)

  return (
    <Stack
      width="250px"
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
    >
      <PaidIcon htmlColor={color[colorType]} />
      <Typography
        variant="h6"
        color={color[colorType]}
        sx={{
          fontWeight: theme =>
            theme.typography[
              colorType === 'budget' ? 'fontWeightBold' : 'fontWeightRegular'
            ]
        }}
      >
        $ {formatMoney}
      </Typography>
      <Typography color={color[colorType]}>
        {textCapitalize(colorType)}
      </Typography>
    </Stack>
  )
}
