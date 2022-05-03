import { ChangeEvent, SetStateAction } from 'react'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import { BudgetType } from '@utils/enums'
import { useUserData } from '@hooks/useSWRUser'
import { FormikSetFieldType } from '@custom-types'

interface Props {
  budgetType: BudgetType
  setBudgetType: (value: SetStateAction<BudgetType>) => void
  // Handling function provided by formik
  setFieldValue: FormikSetFieldType<'categoryId', number>
}

export const BudgetTypeRadio = ({
  budgetType,
  setFieldValue,
  setBudgetType
}: Props) => {
  const { data } = useUserData()

  const categories = data?.categories.map(({ id, type, name }) => ({
    id,
    name,
    type
  }))

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
