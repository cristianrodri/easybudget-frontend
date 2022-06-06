import { ChangeEvent, SetStateAction } from 'react'
import { BudgetType } from '@utils/enums'
import { useUserData } from '@hooks/useSWRUser'
import { FormikSetFieldType } from '@custom-types'
import { BudgetTypeFormControl } from '@components/common/BudgetTypeFormControl'

interface Props {
  budgetType: BudgetType
  setBudgetType: (value: SetStateAction<BudgetType>) => void
  // Handling function provided by formik
  setFieldValue: FormikSetFieldType<'category', number | string>
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
    setBudgetType(e.target.value as BudgetType)

    // When budget type is changed in radio button, display the first "budget type" into the select
    const firstBudgetType = categories
      .filter(c => c.type === e.target.value)
      .sort((a, b) => (a.name < b.name ? -1 : 1))[0]

    // If the type checked has no related categories, set the field value with empty string
    setFieldValue('category', firstBudgetType?.id ?? '')
  }

  return (
    <BudgetTypeFormControl
      budgetType={budgetType}
      handleChange={handleChangeRadio}
    />
  )
}
