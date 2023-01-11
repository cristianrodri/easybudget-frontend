import { Box, Typography, useTheme } from '@mui/material'
import { GetCategory } from '@custom-types'
import { BudgetType } from '@utils/enums'
import { Category as CategoryComp } from '@components/pages/categories/Category'
import { Form } from '@components/pages/categories/Form'
import { useSWRCategories } from '@hooks/useSWRCategories'
import { LayoutAuth } from '@components/LayoutAuth'
import { getUserId } from '@utils/api/token'
import Category from '@db/category/model'
import { connectDB } from '@db/mongoose'
import { PageTitle } from '@components/common/PageTitle'

interface Props {
  categories: GetCategory[]
}

const Categories = ({ categories }: Props) => {
  const { data: categoriesData } = useSWRCategories(categories)
  const theme = useTheme()

  return (
    <LayoutAuth title="Categories">
      <PageTitle name="Categories" />
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
              <CategoryComp
                budgetType={BudgetType.INCOME}
                categories={categoriesData}
              />
            </Box>
            <Box>
              <Typography component="h3" align="center">
                Expense
              </Typography>
              <CategoryComp
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

export const getServerSideProps = async ({ req }) => {
  const userId = getUserId(req)
  await connectDB()

  const categories = await Category.find({ user: userId })

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories))
    }
  }
}

export default Categories
