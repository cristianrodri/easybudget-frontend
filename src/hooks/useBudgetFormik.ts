import { Budget } from '@custom-types'
import { FormikHelpers, useFormik } from 'formik'
import { date, number, object, SchemaOf, string } from 'yup'

export type AddBudgetTypes = Omit<Budget, 'id' | 'date'>

export type EditBudgetTypes = AddBudgetTypes & Pick<Budget, 'date'>

export type BudgetFormTypes = AddBudgetTypes | EditBudgetTypes

export const useBudgetFormik = (
  type: 'add' | 'update',
  onSubmit: (
    values: BudgetFormTypes,
    formikHelpers?: FormikHelpers<BudgetFormTypes>
  ) => void
) => {
  // If the parameter type is "update" the validation schema should have the date property, otherwise just is not included. Same applies to initialValues with the date property
  const schemaDate =
    type === 'update' ? { date: date().required('Date is required') } : {}
  const dateValue = type === 'update' ? { date: null } : {}

  const validationSchema: SchemaOf<BudgetFormTypes> = object({
    description: string()
      .required('Description is required')
      .min(2, 'Description must be at least 2 characters')
      .max(50, 'Description must be at most 50 characters'),
    money: number()
      .transform(value => (isNaN(value) ? undefined : value))
      .required('Amount is required')
      .min(1, 'Amount must be greater than 0'),
    category: string().required('Category is required'),
    ...schemaDate
  })

  const formik = useFormik<BudgetFormTypes>({
    initialValues: {
      description: '',
      money: null,
      category: '',
      ...dateValue
    },
    validationSchema,
    onSubmit
  })

  return formik
}
