import { Box, Typography, useTheme } from '@mui/material'
import { withAuthentication } from '@utils/middleware'
import { GetCategory } from '@custom-types'
import { BudgetType } from '@utils/enums'
import { Category } from '@components/pages/categories/Category'
import { Form } from '@components/pages/categories/Form'
import { useSWRCategories } from '@hooks/useSWRCategories'
import { serverGetApi } from '@config/api_server'
import { LayoutAuth } from '@components/LayoutAuth'

interface Props {
  categories: GetCategory[]
}

const Categories = ({ categories }: Props) => {
  const { data: categoriesData } = useSWRCategories(categories)
  const theme = useTheme()

  return (
    <LayoutAuth title="Categories">
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Categories
      </Typography>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Form categories={categoriesData} />
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
              <Category
                budgetType={BudgetType.INCOME}
                categories={categoriesData}
              />
            </Box>
            <Box>
              <Typography component="h3" align="center">
                Expense
              </Typography>
              <Category
                budgetType={BudgetType.EXPENSE}
                categories={categoriesData}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </LayoutAuth>
  )
}

export const getServerSideProps = withAuthentication<Props>(async ({ req }) => {
  const res = await serverGetApi<GetCategory[]>('categories', req.cookies.token)

  return {
    props: {
      categories: res.data
    }
  }
})

export default Categories
