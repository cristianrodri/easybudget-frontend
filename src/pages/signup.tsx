import { Box, Theme, Typography } from '@mui/material'
import clsx from 'clsx'
import { Layout } from '@components/Layout'
import { Form } from '@components/pages/signup/Form'
import { withPublic } from '@utils/middleware'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
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
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(2)
  },
  description: {
    letterSpacing: 2
  }
}))

const Signup = () => {
  const { containerMessage, text, title, description } = useStyles()

  return (
    <Layout title="Signup" backgroundPage="signup">
      <Box display="flex" justifyContent="center" alignItems="center" flex="1">
        <Box width="min(100%, 700px)" display="flex">
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
          <Form />
        </Box>
      </Box>
    </Layout>
  )
}

export const getServerSideProps = withPublic()

export default Signup
