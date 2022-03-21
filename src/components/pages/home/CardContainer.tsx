import { Grid } from '@mui/material'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import MoneyIcon from '@mui/icons-material/Money'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { CardItem } from '@components/pages/home/CardItem'

export const CardContainer = () => {
  const features = [
    {
      title: 'Easy Management',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptas eum quas quo voluptatem eius illo vitae consequatur repellat?',
      avatar: <MonetizationOnIcon fontSize="large" color="primary" />
    },
    {
      title: 'Easy Management',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptas eum quas quo voluptatem eius illo vitae consequatur repellat?',
      avatar: <MoneyIcon fontSize="large" color="primary" />
    },
    {
      title: 'Easy Management',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptas eum quas quo voluptatem eius illo vitae consequatur repellat?',
      avatar: <AccountBalanceWalletIcon fontSize="large" color="primary" />
    }
  ]

  return (
    <Grid pt={2} container spacing={4} justifyContent="center">
      {features.map((feature, i) => (
        <CardItem key={i} {...feature} />
      ))}
    </Grid>
  )
}
