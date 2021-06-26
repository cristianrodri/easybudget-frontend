import { FC } from 'react'
import Head from 'next/head'
import { Container, Box } from '@material-ui/core'
import { Header } from './Header'

export const Layout: FC<{ title: string }> = ({ children, title }) => (
  <Container>
    <Head>
      <title>{title}</title>
    </Head>
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />
      {children}
    </Box>
  </Container>
)
