import Image from 'next/image'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { Layout } from '@components/Layout'
import { Form } from '@components/pages/login/Form'
import { withPublic } from '@utils/middleware'

const Login = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

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
              <Image
                src="/banner-login.svg"
                width={200}
                height={200}
                alt="Login banner"
              />
            </Box>
          )}
          <Form />
        </Box>
      </Box>
    </Layout>
  )
}

export const getServerSideProps = withPublic()

export default Login
