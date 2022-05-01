import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import { AddCategory, FormikHandleChange } from '@custom-types'
import { BudgetType } from '@utils/enums'

interface Props {
  categoryId: string | number
  categories: AddCategory[]
  handleChange: FormikHandleChange
  touched: boolean
  error: string
  budgetType: BudgetType
}

export const CategorySelect = ({
  categoryId,
  categories,
  handleChange,
  touched,
  error,
  budgetType
}: Props) => {
  return (
    <FormControl
      sx={{
        display: 'flex',
        width: 'min(100%, 200px)',
        marginTop: theme => theme.spacing(-2)
      }}
    >
      <InputLabel id="select-label">Category</InputLabel>
      <Select
        labelId="select-label"
        id="categoryId"
        name="categoryId"
        value={categoryId}
        defaultValue={''}
        onChange={handleChange}
        label="Category"
        error={touched && Boolean(error)}
      >
        {categories?.map(category => (
          <MenuItem
            key={category.id}
            value={category.id}
            style={{ display: budgetType !== category.type ? 'none' : '' }}
          >
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText sx={{ color: theme => theme.palette.error.main }}>
        {touched && error}
      </FormHelperText>
    </FormControl>
  )
}
