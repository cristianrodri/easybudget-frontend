import {
  Box,
  Typography,
  TextField,
  Button,
  makeStyles
} from '@material-ui/core'
import clsx from 'clsx'
import { Layout } from '@components/Layout'

const useStyles = makeStyles(theme => ({
  containerMessage: {
    backgroundColor: theme.palette.primary.main,
    transform: 'scale(1.1)',
    boxShadow: theme.shadows[15]
  },
  containerForm: {
    backgroundColor: theme.palette.grey[200],
    boxShadow: theme.shadows[15]
  },
  text: {
    color: theme.palette.grey[50]
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightBold
  },
  description: {
    letterSpacing: 2
  }
}))

const Signup = () => {
  const { containerMessage, containerForm, text, title, description } =
    useStyles()
  return (
    <Layout title="Signup" backgroundPage="signup">
      <Box
        position="absolute"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flex="1"
      >
        <Box width="min(100%, 700px)" height="70%" display="flex">
          <Box
            width="45%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            borderRadius={16}
            className={containerMessage}
            p={6}
          >
            <Typography
              component="h3"
              variant="h4"
              gutterBottom
              className={clsx(text, title)}
            >
              Easy Budget
            </Typography>
            <Typography className={clsx(text, description)}>
              Manage all your incomes and expenses easily
            </Typography>
          </Box>
          <Box width="55%" p={6} borderRadius={16} className={containerForm}>
            <Typography component="h3" variant="h4">
              Sign up
            </Typography>
            <form>
              <TextField label="Name" />
              <TextField label="Email" />
              <TextField label="Password" />
              <Button type="submit" variant="contained" color="secondary">
                sign up
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default Signup
