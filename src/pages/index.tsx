import Image from 'next/image'
import { Box, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { Layout } from '@components/Layout'
import { Signup } from '@components/pages/home/Signup'
import { Login } from '@components/pages/home/Login'

const useStyles = makeStyles((theme: Theme) => ({
  presentation: {
    flex: '1 0 300px'
  },
  titles: {
    textAlign: 'left',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
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
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Layout title="EasyBudget" backgroundPage="homepage">
      <Box
        component="main"
        display="flex"
        alignItems="center"
        minHeight="100vh"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          width="100%"
        >
          <Box className={presentation}>
            <Typography
              component="h1"
              variant="h3"
              gutterBottom
              className={titles}
              color="white"
            >
              Easy Budget
            </Typography>
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
              display="flex"
              flexWrap="wrap"
              gap={2}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  justifyContent: 'center'
                }
              }}
            >
              <Signup />
              <Login />
            </Box>
          </Box>
          {!matches && (
            <Box className={presentation}>
              <Image
                width={400}
                height={300}
                layout="responsive"
                src="/banner.svg"
                alt="Homepage banner"
              />
            </Box>
          )}
        </Box>
      </Box>
      {/* <CardContainer /> */}
    </Layout>
  )
}

export default IndexPage
