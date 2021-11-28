import { FC } from 'react'
import Head from 'next/head'
import { Container, Box, makeStyles } from '@material-ui/core'
import { Header } from './Header'

type BackgroundType = 'homepage' | 'signup' | 'login' | 'default'

interface Props {
  title: string
  backgroundPage?: BackgroundType
}

const useStyles = makeStyles(theme => ({
  homepage: {
    '&::before': {
      content: "''",
      background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.secondary.light})`,
      position: 'absolute',
      top: '0',
      left: 0,
      width: '100%',
      minHeight: '100vh',
      zIndex: 'var(--zindex-bg)',
      [theme.breakpoints.up('md')]: {
        clipPath: 'polygon(100% 0, 100% 20%, 29% 100%, 0 70%, 0 0)',
        height: '140%'
      }
    }
  },
  signup: {
    '&::before': {
      content: "''",
      background: theme.palette.grey[50],
      position: 'absolute',
      top: '0',
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 'var(--zindex-bg)'
    }
  },
  login: {
    '&::before': {
      content: "''",
      background: `linear-gradient(45deg, ${theme.palette.primary.main} 70%, ${theme.palette.primary.light})`,
      position: 'absolute',
      top: '0',
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 'var(--zindex-bg)'
    }
  }
}))

export const Layout: FC<Props> = ({
  children,
  title,
  backgroundPage = 'default'
}) => {
  const classes = useStyles()
  return (
    <Container
      maxWidth={backgroundPage === 'homepage' ? 'lg' : 'xl'}
      className={classes[backgroundPage]}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        position="relative"
        paddingTop="1rem"
      >
        {/* <Header /> */}
        {children}
      </Box>
    </Container>
  )
}
