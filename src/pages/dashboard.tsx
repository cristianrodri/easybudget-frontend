import { useState } from 'react'
import { Box, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import moment from 'moment'
import { Layout } from '@components/Layout'
import { serverInstance as axios } from '@config/axios'
import { withAuthentication } from '@utils/middleware'
import { User } from '@custom-types'
import AddBudget from '@components/pages/dashboard/AddBudget'
import { useSWRUser } from '@hooks/useSWRUser'

interface Props {
  user: User
}

const Dashboard = ({ user }: Props) => {
  const [open, setOpen] = useState(false)
  const { data } = useSWRUser(user)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Layout title="Dashboard">
      {data.categories.map(category => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          {category.budgets.map(budget => (
            <div key={budget.id}>
              {budget.description} {budget.money}
            </div>
          ))}
        </div>
      ))}
      <Box position="absolute" right="0" bottom="0" paddingBottom={2}>
        <Fab
          color="primary"
          aria-label="add"
          title="Create Budget"
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </Box>
      <AddBudget openDialog={open} handleClose={handleClose} user={data} />
    </Layout>
  )
}

export const getServerSideProps = withAuthentication<Props>(async ({ req }) => {
  const { token } = req.cookies

  const monthStart = moment().startOf('month').format()
  const monthEnd = moment().endOf('month').format()

  const res = await axios.get('/users/me', {
    headers: {
      Authorization: 'Bearer ' + token
    },
    params: {
      budgets_date_start: monthStart,
      budgets_date_end: monthEnd
    }
  })

  return {
    props: {
      user: res.data
    }
  }
})

export default Dashboard
