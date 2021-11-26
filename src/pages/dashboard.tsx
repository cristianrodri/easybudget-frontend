import { useRouter } from 'next/router'
import { useState } from 'react'
import { Avatar, Box, Fab, Menu, MenuItem } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import useSWR from 'swr'
import { Layout } from '@components/Layout'
import {
  clientInstance as axiosClient,
  serverInstance as axiosServer
} from '@config/axios'
import { withAuthentication } from '@utils/middleware'
import { User } from '@custom-types'
import { SERVER_URL } from '@config/url'
import AddBudget from '@components/pages/dashboard/AddBudget'

interface Props {
  user: User
}

const Dashboard = ({ user }: Props) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { data } = useSWR<User>(
    '/api/user',
    async (url: string) => {
      const res = await axiosClient.get(url)
      return res.data.user
    },
    {
      fallbackData: user
    }
  )

  const avatarUrl = user.avatar
    ? user.avatar?.formats
      ? user.avatar.formats.thumbnail.url
      : user.avatar.url
    : user.username.charAt(0).toUpperCase()
  const allCategories = data.categories.map(category => ({
    id: category.id,
    name: category.name,
    type: category.type
  }))

  const logout = async () => {
    const res = await axiosClient.post<{ success: boolean }>('/api/logout')

    if (res.data.success) router.push('/')
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Layout title="Dashboard">
      <Box
        clone
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingTop="1rem"
      >
        <header>
          <h1>Overview</h1>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {popupState => (
              <>
                <Avatar
                  style={{ cursor: 'pointer' }}
                  src={`${SERVER_URL}${avatarUrl}`}
                  title={user.username}
                  {...bindTrigger(popupState)}
                />
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close}>Edit User</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
        </header>
      </Box>
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
      <AddBudget
        openDialog={open}
        handleClose={handleClose}
        categories={allCategories}
      />
    </Layout>
  )
}

export const getServerSideProps = withAuthentication<Props>(async ({ req }) => {
  const { token } = req.cookies

  const res = await axiosServer.get('/users/me', {
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

export default Dashboard
