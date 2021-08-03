import { useRouter } from 'next/router'
import { Button } from '@material-ui/core'
import { Layout } from '@components/Layout'
import {
  clientInstance as axiosClient,
  serverInstance as axiosServer
} from '@config/axios'
import { withAuthentication } from '@utils/middleware'

const Dashboard = ({ data }) => {
  const router = useRouter()
  console.log(data)

  const logout = async () => {
    const res = await axiosClient.post<{ success: boolean }>('/api/logout')

    console.log(res)

    if (res.data.success) router.push('/')
  }

  return (
    <Layout title="Dashboard">
      <div>{JSON.stringify(data)}</div>
      <Button onClick={logout}>Logout</Button>
    </Layout>
  )
}

export const getServerSideProps = withAuthentication(async ({ req }) => {
  const { token } = req.cookies

  const res = await axiosServer.get('/users/me', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return {
    props: {
      data: res.data
    }
  }
})

export default Dashboard
