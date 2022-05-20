import { FC } from 'react'
import { Layout, LayoutProps } from './Layout'

export const LayoutAuth: FC<LayoutProps> = ({
  children,
  backgroundPage = 'default',
  title
}) => {
  return (
    <Layout title={title} backgroundPage={backgroundPage} isAuth>
      {children}
    </Layout>
  )
}
