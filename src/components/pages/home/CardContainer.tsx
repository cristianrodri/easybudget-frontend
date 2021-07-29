import { Box, Grid } from '@material-ui/core'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import MoneyIcon from '@material-ui/icons/Money'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
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
    <Box clone pt={2}>
      <Grid container spacing={4} justify="center">
        {features.map((feature, i) => (
          <CardItem key={i} {...feature} />
        ))}
      </Grid>
    </Box>
  )
}
