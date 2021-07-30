import Image from 'next/image'
import { Box, useMediaQuery, useTheme } from '@material-ui/core'
import { Layout } from '@components/Layout'
import { Form } from '@components/pages/login/Form'

const Login = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Layout title="Login" backgroundPage="login">
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          width="min(100%, 600px)"
          height="60vh"
          bgcolor="white"
          borderRadius="1rem"
        >
          {!matches && (
            <Box
              width="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image src="/banner-login.svg" width={200} height={200} />
            </Box>
          )}
          <Form />
        </Box>
      </Box>
    </Layout>
  )
}

export default Login
