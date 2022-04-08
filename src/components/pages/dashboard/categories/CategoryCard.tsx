import { CategoryTypes } from '@custom-types'
import { Card, CardContent, Typography } from '@mui/material'
import { bgColorWallet, colorWallet } from '@utils/color'
import { textCapitalize } from '@utils/string'
import { formatMoney } from '@utils/money'

type Props = Omit<CategoryTypes, 'id' | 'budgets'>

export const CategoryCard = ({ name, money, type }: Props) => {
  return (
    <Card sx={{ width: 200, backgroundColor: bgColorWallet[type] }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: theme => theme.spacing(1)
        }}
      >
        <Typography
          sx={{
            color: colorWallet[type]
          }}
        >
          {textCapitalize(name)}
        </Typography>
        <Typography
          sx={{
            fontWeight: theme => theme.typography.fontWeightBold,
            color: colorWallet[type]
          }}
        >
          $ {formatMoney(money)}
        </Typography>
      </CardContent>
    </Card>
  )
}
