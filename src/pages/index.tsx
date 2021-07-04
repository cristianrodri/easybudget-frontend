import Image from 'next/image'
import { Box, makeStyles, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { Layout } from '@components/Layout'
import { Signup } from '@components/pages/home/Signup'
import { Login } from '@components/pages/home/Login'
import { CardContainer } from '@components/pages/home/CardContainer'

const useStyles = makeStyles(theme => ({
  presentation: {
    flex: '1 0 300px'
  },
  titles: {
    textAlign: 'left',
    marginBottom: theme.spacing(2),
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
  const { presentation, titles, subtitle } = useStyles()

  return (
    <Layout title="EasyBudget" backgroundPage="homepage">
      <Box component="main" display="flex" alignItems="center" height="90vh">
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
      </Box>
      <CardContainer />
    </Layout>
  )
}

export default IndexPage
