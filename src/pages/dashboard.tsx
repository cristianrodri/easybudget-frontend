import { Layout } from '@components/Layout'
import { serverInstance as axios } from '@config/axios'
import { withAuthentication } from '@utils/middleware'

const Dashboard = ({ data }) => {
  return (
    <Layout title="Dashboard">
      <div>{JSON.stringify(data)}</div>
    </Layout>
  )
}

export const getServerSideProps = withAuthentication(async ({ req }) => {
  const { token } = req.cookies

  const res = await axios.get('/users/me', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return {
    props: {
      message: res.data
    }
  }
})

export default Dashboard
