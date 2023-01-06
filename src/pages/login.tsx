import Image from 'next/image'
import { Box } from '@mui/material'
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
        <Box
          display="flex"
          justifyContent="center"
          width="min(100%, 600px)"
          height="60vh"
          bgcolor="white"
          borderRadius="1rem"
        >
          <Box
            sx={{
              display: {
                xs: 'none',
                md: 'flex'
              },
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%'
            }}
          >
            <Image
              src="/banner-login.svg"
              priority
              width={200}
              height={200}
              alt="Login banner"
            />
          </Box>
          <Form />
        </Box>
      </Box>
    </Layout>
  )
}

export default Login
