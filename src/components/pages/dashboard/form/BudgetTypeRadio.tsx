import { ChangeEvent, SetStateAction } from 'react'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import { BudgetType } from '@utils/enums'
import { FormikErrors } from 'formik'
import { useUserData } from '@hooks/useSWRUser'
type CategoryId = {
  categoryId: string
}
interface Props {
  setFieldValue: (
    field: 'categoryId',
    value: number,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<CategoryId>> | Promise<void>
  setBudgetType: (value: SetStateAction<BudgetType>) => void
}

export const BudgetTypeRadio = ({ setFieldValue, setBudgetType }: Props) => {
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
        <FormControlLabel value="income" control={<Radio />} label="Income" />
        <FormControlLabel value="expense" control={<Radio />} label="Expense" />
      </RadioGroup>
    </FormControl>
  )
}
