import Image from 'next/image'
import { Box, Paper } from '@material-ui/core'
import { Layout } from '@components/Layout'
import { Form } from '@components/pages/login/Form'

const Login = () => {
  return (
    <Layout title="Login" backgroundPage="login">
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box clone display="flex" width="min(100%, 600px)" height="60vh">
          <Paper elevation={3}>
            <Box
              width="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src="/banner-login.svg"
                // layout="responsive"
                width={200}
                height={200}
              />
            </Box>
            <Form />
          </Paper>
        </Box>
      </Box>
    </Layout>
  )
}

export default Login
