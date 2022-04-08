import { CategoryTypes } from '@custom-types'
import { Stack, Typography } from '@mui/material'
import { colorWallet } from '@utils/color'
import { BudgetType } from '@utils/enums'
import { textCapitalize } from '@utils/string'
import { CategoryCard } from './CategoryCard'

interface Props {
  type: BudgetType
  categories: CategoryTypes[]
}

export const Category = ({ type, categories }: Props) => {
  return (
    <Stack mb={3}>
      <Typography
        variant="h6"
        component="h3"
        align="center"
        sx={{ color: colorWallet[type] }}
        gutterBottom
      >
        {textCapitalize(type)} categories
      </Typography>
      <Stack
        direction="row"
        gap={2}
        flexWrap="wrap"
        sx={{
          justifyContent: {
            xs: 'center',
            lg: 'flex-start'
          }
        }}
      >
        {categories.map(category => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </Stack>
    </Stack>
  )
}
