import Image from 'next/image'
import { Layout } from '@components/Layout'
import { Box, makeStyles, Typography } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    '&::before': {
      content: "''",
      background: theme.palette.primary.main,
      position: 'fixed',
      top: '0',
      left: 0,
      width: '100%',
      height: '100%',
      clipPath: 'polygon(100% 0, 100% 22%, 27% 120%, 0 72%, 0 0)',
      zIndex: 'var(--zindex-bg)'
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
              variant="h5"
              component="h3"
              gutterBottom
              className={clsx(titles, subtitle)}
            >
              Manage all your budget easily and customize your incomes or
              expenses categories as you want
            </Typography>
          </Box>
          <Box className={presentation}>
            <Image width={600} height={400} src="/banner.svg" />
          </Box>
        </Box>
      </main>
    </Layout>
  )
}

export default IndexPage
