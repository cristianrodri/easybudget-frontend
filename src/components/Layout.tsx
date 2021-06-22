import { FC } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { Header } from './Header'

const Container = styled.div`
  min-height: 100vh;
  max-width: var(--container-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`

export const Layout: FC<{ title: string }> = ({ children, title }) => {
  return (
    <Container>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
    </Container>
  )
}
