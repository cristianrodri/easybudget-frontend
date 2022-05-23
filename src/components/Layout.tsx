import { FC } from 'react'
import Head from 'next/head'
import { Container, Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Header } from './Header'

export type BackgroundType = 'homepage' | 'login' | 'default'

export interface LayoutProps {
  title: string
  backgroundPage?: BackgroundType
  isAuth?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  homepage: {
    '&::before': {
      content: "''",
      background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.secondary.light})`,
      position: 'absolute',
      top: '0',
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: 'var(--zindex-bg)',
      [theme.breakpoints.up('md')]: {
        clipPath: 'polygon(100% 0, 100% 20%, 29% 100%, 0 70%, 0 0)'
      }
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

export const Layout: FC<LayoutProps> = ({
  children,
  title,
  backgroundPage = 'default',
  isAuth = false
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
      >
        <Header backgroundPage={backgroundPage} isAuth={isAuth} />
        {children}
      </Box>
    </Container>
  )
}
