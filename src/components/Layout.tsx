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
      height: '150%',
      zIndex: 'var(--zindex-bg)',
      [theme.breakpoints.up('sm')]: {
        clipPath: 'polygon(100% 0, 100% 20%, 29% 100%, 0 70%, 0 0)'
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
  login: {},
  default: {
    backgroundColor: theme.palette.background.default
  }
}))

export const Layout: FC<Props> = ({
  children,
  title,
  backgroundPage = 'default'
}) => {
  const classes = useStyles()
  return (
    <Container className={classes[backgroundPage]}>
      <Head>
        <title>{title}</title>
      </Head>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Header />
        {children}
      </Box>
    </Container>
  )
}
