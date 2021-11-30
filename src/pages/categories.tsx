import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme
} from '@material-ui/core'
import { serverInstance as axios } from '@config/axios'
import { Layout } from '@components/Layout'
import { useSWRUser } from '@hooks/useSWRUser'
import { withAuthentication } from '@utils/middleware'
import { AuthMenu } from '@components/common/AuthMenu'
import { User } from '@custom-types'
import { useFocus } from '@hooks/useFocus'
import { BudgetType } from '@utils/enums'
import { Category } from '@components/pages/categories/Category'

interface Props {
  user: User
}

const Categories = ({ user }: Props) => {
  const { data } = useSWRUser(user)
  const ref = useFocus()
  const theme = useTheme()

  return (
    <Layout title="Categories">
      <Typography component="h1" variant="h5" align="left">
        Categories
      </Typography>
      <Box position="absolute" top="1rem" right="0">
        <AuthMenu user={data} />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Box
          clone
          display="flex"
          flexDirection="column"
          alignSelf="center"
          mt={5}
        >
          <form>
            <TextField
              inputRef={ref}
              name="category"
              variant="outlined"
              label="Add category"
              style={{ marginBottom: '1rem' }}
            />
            <FormControl component="fieldset" style={{ marginBottom: '.5rem' }}>
              <FormLabel component="legend">Budget Type</FormLabel>
              <RadioGroup
                row
                aria-label="Type"
                name="type"
                // onChange={handleChangeRadio}
              >
                <FormControlLabel
                  value="income"
                  control={<Radio />}
                  label="Income"
                />
                <FormControlLabel
                  value="expense"
                  control={<Radio />}
                  label="Expense"
                />
              </RadioGroup>
            </FormControl>
            <Button type="submit" color="primary" variant="contained">
              Add
            </Button>
          </form>
        </Box>
        <Box mt={3}>
          <Typography component="h3" variant="h6" align="center">
            Available Categories
          </Typography>
          <Box
            display="flex"
            justifyContent="space-around"
            flexWrap="wrap"
            m={'auto'}
            style={{ width: 'min(100%, 500px)', gap: theme.spacing(2) }}
          >
            <Box>
              <Typography component="h3" align="center">
                Income
              </Typography>
              <Category budgetType={BudgetType.INCOME} user={user} />
            </Box>
            <Box>
              <Typography component="h3" align="center">
                Expense
              </Typography>
              <Category budgetType={BudgetType.EXPENSE} user={user} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export const getServerSideProps = withAuthentication<Props>(async ({ req }) => {
  const { token } = req.cookies

  const res = await axios.get('/users/me', {
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

export default Categories
