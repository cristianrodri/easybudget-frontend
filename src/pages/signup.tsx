import {
  Box,
  Typography,
  TextField,
  Button,
  makeStyles
} from '@material-ui/core'
import { Layout } from '@components/Layout'

const useStyles = makeStyles(theme => ({
  containerMessage: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 16,
    transform: 'scale(1.1)',
    boxShadow: theme.shadows[10]
  },
  containerForm: {
    backgroundColor: theme.palette.grey[300],
    borderRadius: 16
  }
}))

const Signup = () => {
  const { containerMessage, containerForm } = useStyles()
  return (
    <Layout title="Signup" backgroundPage="signup">
      <Box
        position="absolute"
        height="100%"
        zIndex="var(--before-header)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flex="1"
      >
        <Box width="min(100%, 700px)" display="flex">
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            className={containerMessage}
            p={4}
          >
            <Typography component="h3" variant="h4" gutterBottom>
              Easy Budget
            </Typography>
            <Typography>Manage all your incomes and expenses easily</Typography>
          </Box>
          <Box flex="1" p={4} borderRadius={16} className={containerForm}>
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
