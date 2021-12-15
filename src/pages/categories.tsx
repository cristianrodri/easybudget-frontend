import { Box, Typography, useTheme } from '@material-ui/core'
import { serverInstance as axios } from '@config/axios'
import { Layout } from '@components/Layout'
import { useSWRUser } from '@hooks/useSWRUser'
import { withAuthentication } from '@utils/middleware'
import { AuthMenu } from '@components/common/AuthMenu'
import { User } from '@custom-types'
import { BudgetType } from '@utils/enums'
import { Category } from '@components/pages/categories/Category'
import { Form } from '@components/pages/categories/Form'

interface Props {
  user: User
}

const Categories = ({ user }: Props) => {
  const { data } = useSWRUser(user)
  const theme = useTheme()

  return (
    <Layout title="Categories">
      <Typography component="h1" variant="h5" align="left">
        Categories
      </Typography>
      <Box position="absolute" top="1rem" right="0">
        <AuthMenu user={data} />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Form userData={data} />
        <Box mt={3}>
          <Typography component="h3" variant="h6" align="center">
            Available Categories
          </Typography>
          <Box
            display="flex"
            justifyContent="space-around"
            flexWrap="wrap"
            m={'auto'}
            style={{ width: 'min(100%, 500px)', gap: theme.spacing(2) }}
          >
            <Box>
              <Typography component="h3" align="center">
                Income
              </Typography>
              <Category budgetType={BudgetType.INCOME} user={user} />
            </Box>
            <Box>
              <Typography component="h3" align="center">
                Expense
              </Typography>
              <Category budgetType={BudgetType.EXPENSE} user={user} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export const getServerSideProps = withAuthentication<Props>(async ({ req }) => {
  const { token } = req.cookies

  const res = await axios.get('/users/me', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  return {
    props: {
      user: res.data
    }
  }
})

export default Categories
