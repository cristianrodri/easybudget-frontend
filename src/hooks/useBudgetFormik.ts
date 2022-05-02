import { Budget } from '@custom-types'
import { FormikHelpers, useFormik } from 'formik'
import { number, object, SchemaOf, string } from 'yup'

type FormTypes = Omit<Budget, 'id' | 'date' | 'category'> & {
  categoryId: number | string
}

export const useBudgetFormik = (
  initialValues: FormTypes,
  onSubmit: (
    values: FormTypes,
    formikHelpers?: FormikHelpers<FormTypes>
  ) => void
) => {
  const validationSchema: SchemaOf<FormTypes> = object({
    description: string()
      .required('Description is required')
      .min(2, 'Description must be at least 2 characters')
      .max(50, 'Description must be at most 50 characters'),
    money: number()
      .transform(value => (isNaN(value) ? undefined : value))
      .required('Amount is required')
      .min(1, 'Amount must be greater than 0'),
    categoryId: number().required('Category is required')
  })

  const formik = useFormik<FormTypes>({
    initialValues,
    validationSchema,
    onSubmit
  })

  return formik
}
