import { Skeleton, Stack, Typography } from '@mui/material'
import PaidIcon from '@mui/icons-material/Paid'
import { textCapitalize } from '@utils/string'
import { BudgetType } from '@utils/enums'
import { colorWallet } from '@utils/color'
import { formatMoney } from '@utils/money'

interface Props {
  colorType: BudgetType.INCOME | BudgetType.EXPENSE | 'budget'
  money: number
  isLoading: boolean
}

export const Budget = ({ colorType, money, isLoading }: Props) => {
  return (
    <Stack
      width={250}
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
    >
      {isLoading ? (
        <Skeleton variant="circular" width={24} height={24} color="primary" />
      ) : (
        <PaidIcon htmlColor={colorWallet[colorType]} />
      )}
      {isLoading ? (
        <Skeleton width={130} height={28} color="primary" />
      ) : (
        <Typography
          variant="h6"
          color={colorWallet[colorType]}
          sx={{
            fontWeight: theme =>
              theme.typography[
                colorType === 'budget' ? 'fontWeightBold' : 'fontWeightRegular'
              ]
          }}
        >
          $ {formatMoney(money)}
        </Typography>
      )}
      {isLoading ? (
        <Skeleton width={60} height={28} />
      ) : (
        <Typography color={colorWallet[colorType]}>
          {textCapitalize(colorType)}
        </Typography>
      )}
    </Stack>
  )
}
