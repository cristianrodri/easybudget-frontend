import { Box } from '@mui/material'
import { Layout } from '@components/Layout'
import { Form } from '@components/pages/signup/Form'

const Signup = () => {
  return (
    <Layout title="Signup" backgroundPage="login">
      <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
        <Box width="min(100%, 700px)" display="flex" justifyContent="center">
          <Form />
        </Box>
      </Box>
    </Layout>
  )
}

export default Signup
