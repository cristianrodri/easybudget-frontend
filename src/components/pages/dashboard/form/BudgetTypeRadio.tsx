import { ChangeEvent, SetStateAction } from 'react'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import { BudgetType } from '@utils/enums'
import { AddCategory } from '@custom-types'
import { FormikErrors } from 'formik'
type CategoryId = {
  categoryId: string
}
interface Props {
  categories: AddCategory[]
  setFieldValue: (
    field: 'categoryId',
    value: number,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<CategoryId>> | Promise<void>
  setBudgetType: (value: SetStateAction<BudgetType>) => void
}

export const BudgetTypeRadio = ({
  categories,
  setFieldValue,
  setBudgetType
}: Props) => {
  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setBudgetType(e.target.value as BudgetType) // When budget type is changed in radio button, display the first "budget type" into the select

    const firstBudgetType = categories.find(
      category => category.type === e.target.value
    )
    setFieldValue('categoryId', firstBudgetType.id)
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Budget Type</FormLabel>
      <RadioGroup
        row
        aria-label="Type"
        name="type"
        onChange={handleChangeRadio}
      >
        <FormControlLabel value="income" control={<Radio />} label="Income" />
        <FormControlLabel value="expense" control={<Radio />} label="Expense" />
      </RadioGroup>
    </FormControl>
  )
}
