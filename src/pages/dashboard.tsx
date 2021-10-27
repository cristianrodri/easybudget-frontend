import { useRouter } from 'next/router'
import { Avatar, Box, Fab, Menu, MenuItem } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { forwardRef, useState } from 'react'
import NumberFormat from 'react-number-format'
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

  const avatarUrl = user.avatar
    ? user.avatar?.formats
      ? user.avatar.formats.thumbnail.url
      : user.avatar.url
    : user.username.charAt(0).toUpperCase()
  console.log(user)

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
      <Box position="fixed" right="0" bottom="0" p={3}>
        <Fab
          color="primary"
          aria-label="add"
          title="Create Budget"
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </Box>
      <AddBudget openDialog={open} handleClose={handleClose} />
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
