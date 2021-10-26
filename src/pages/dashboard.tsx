import { useRouter } from 'next/router'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  Fab,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  Menu,
  MenuItem,
  OutlinedInput,
  Slide,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import CloseIcon from '@material-ui/icons/Close'
import { Layout } from '@components/Layout'
import {
  clientInstance as axiosClient,
  serverInstance as axiosServer
} from '@config/axios'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import { withAuthentication } from '@utils/middleware'
import { User } from '@custom-types'
import { SERVER_URL } from '@config/url'
import { forwardRef, ReactElement, Ref, useState } from 'react'

interface Props {
  user: User
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  form: {
    padding: theme.spacing(2)
  }
}))

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Dashboard = ({ user }: Props) => {
  const router = useRouter()
  const classes = useStyles()
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
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add New Budget
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <form className={classes.form}>
          <TextField label="Description" variant="outlined" fullWidth />
          <FormControl fullWidth className={'classes.margin'}>
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="standard-adornment-amount"
              // value={0}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </form>
      </Dialog>
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
