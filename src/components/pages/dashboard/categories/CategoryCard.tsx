import { useContext } from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { CategoryTypes } from '@custom-types'
import { bgColorWallet, colorWallet } from '@utils/color'
import { textCapitalize } from '@utils/string'
import { formatMoney } from '@utils/money'
import { Context } from '@context/GlobalContext'
import { showCategoryDialog } from '@context/actions'

type Props = CategoryTypes

export const CategoryCard = (props: Props) => {
  const { name, money, type } = props
  const { dispatch } = useContext(Context)

  const handleClick = () => {
    // Show the dialog with the props category data
    dispatch(showCategoryDialog(props))
  }

  return (
    <Card
      sx={{
        width: 200,
        backgroundColor: bgColorWallet[type],
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
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
          {formatMoney(money)}
        </Typography>
      </CardContent>
    </Card>
  )
}
