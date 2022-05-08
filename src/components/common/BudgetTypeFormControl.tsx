import { ChangeEvent } from 'react'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import { BudgetType } from '@utils/enums'

interface Props {
  budgetType: BudgetType
  handleChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void
}

export const BudgetTypeFormControl = ({ budgetType, handleChange }: Props) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Budget Type</FormLabel>
      <RadioGroup row aria-label="Type" name="type" onChange={handleChange}>
        <FormControlLabel
          value="income"
          control={<Radio />}
          checked={budgetType === BudgetType.INCOME}
          label="Income"
        />
        <FormControlLabel
          value="expense"
          control={<Radio />}
          checked={budgetType === BudgetType.EXPENSE}
          label="Expense"
        />
      </RadioGroup>
    </FormControl>
  )
}
