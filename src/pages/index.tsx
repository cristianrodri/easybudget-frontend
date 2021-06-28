import Image from 'next/image'
import { Layout } from '@components/Layout'
import { Box, makeStyles, Typography, Grid } from '@material-ui/core'
import clsx from 'clsx'
import { Signup } from '@components/pages/home/Signup'
import { Login } from '@components/pages/home/Login'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import MoneyIcon from '@material-ui/icons/Money'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import { CardItem } from '@components/pages/home/CardItem'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    height: '90vh',
    '&::before': {
      content: "''",
      background: theme.palette.primary.main,
      position: 'fixed',
      top: '0',
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 'var(--zindex-bg)',
      [theme.breakpoints.up('sm')]: {
        clipPath: 'polygon(100% 0, 100% 22%, 27% 120%, 0 72%, 0 0)'
      }
    }
  },
  presentation: {
    flex: '1 0 300px'
  },
  titles: {
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  subtitle: {
    color: theme.palette.primary.contrastText,
    letterSpacing: 2
  }
}))

const IndexPage = () => {
  const { main, presentation, titles, subtitle } = useStyles()
  const features = [
    {
      title: 'Easy Management',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptas eum quas quo voluptatem eius illo vitae consequatur repellat?',
      avatar: <MonetizationOnIcon />
    },
    {
      title: 'Easy Management',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptas eum quas quo voluptatem eius illo vitae consequatur repellat?',
      avatar: <MoneyIcon />
    },
    {
      title: 'Easy Management',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptas eum quas quo voluptatem eius illo vitae consequatur repellat?',
      avatar: <AccountBalanceWalletIcon />
    }
  ]

  return (
    <Layout title="EasyBudget">
      <main className={main}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Box alignSelf="start" className={presentation}>
            <Box clone color="white">
              <Typography
                component="h1"
                variant="h3"
                gutterBottom
                className={titles}
              >
                Easy Budget
              </Typography>
            </Box>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              className={clsx(titles, subtitle)}
            >
              Manage all your budget easily and customize your incomes or
              expenses categories as you want
            </Typography>
            <Box
              mt={2}
              mb={2}
              display="grid"
              gridGap="1rem"
              gridTemplateColumns={{ sm: 'max-content max-content' }}
            >
              <Signup />
              <Login />
            </Box>
          </Box>
          <Box className={presentation}>
            <Image width={600} height={400} src="/banner.svg" />
          </Box>
        </Box>
      </main>
      <Grid container spacing={4} justify="center">
        {features.map((feature, i) => (
          <CardItem key={i} {...feature} />
        ))}
      </Grid>
    </Layout>
  )
}

export default IndexPage
