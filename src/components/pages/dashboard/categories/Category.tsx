import { CategoryTypes } from '@custom-types'
import { Skeleton, Stack, Typography } from '@mui/material'
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
            md: 'flex-start'
          }
        }}
      >
        {categories?.map(category => (
          <CategoryCard key={category.id} {...category} />
        ))}
        {!categories &&
          Array.from({ length: 5 }, (_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              sx={{ width: 200, height: 96, borderRadius: 1 }}
            />
          ))}
      </Stack>
    </Stack>
  )
}
