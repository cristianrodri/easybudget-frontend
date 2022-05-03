import { Budget } from '@custom-types'
import { FormikHelpers, useFormik } from 'formik'
import { date, number, object, SchemaOf, string } from 'yup'

export type AddTypes = Omit<Budget, 'id' | 'date' | 'category'> & {
  categoryId: number | string
}

export type EditTypes = AddTypes & Pick<Budget, 'date'>

type FormTypes = AddTypes | EditTypes

export const useBudgetFormik = (
  type: 'add' | 'update',
  onSubmit: (
    values: FormTypes,
    formikHelpers?: FormikHelpers<FormTypes>
  ) => void
) => {
  // If the parameter type is "update" the validation schema should have the date property, otherwise just is not included. Same applies to initialValues with the date property
  const schemaDate =
    type === 'update' ? { date: date().required('Date is required') } : {}
  const dateValue = type === 'update' ? { date: null } : {}

  const validationSchema: SchemaOf<FormTypes> = object({
    description: string()
      .required('Description is required')
      .min(2, 'Description must be at least 2 characters')
      .max(50, 'Description must be at most 50 characters'),
    money: number()
      .transform(value => (isNaN(value) ? undefined : value))
      .required('Amount is required')
      .min(1, 'Amount must be greater than 0'),
    categoryId: number().required('Category is required'),
    ...schemaDate
  })

  const formik = useFormik<FormTypes>({
    initialValues: {
      description: '',
      money: null,
      categoryId: '',
      ...dateValue
    },
    validationSchema,
    onSubmit
  })

  return formik
}
