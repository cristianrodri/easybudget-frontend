import { TextField } from '@mui/material'
import { FormikErrors } from 'formik'
import NumberFormat from 'react-number-format'

type MoneyType = { money: number }

interface Props {
  money: number
  setFieldValue: (
    field: 'money',
    value: number,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<MoneyType>> | Promise<void>
  touched: boolean
  error: string
}

export const MoneyFormat = ({
  money,
  setFieldValue,
  touched,
  error
}: Props) => {
  return (
    <NumberFormat
      id="money"
      label="Amount"
      name="money"
      value={money}
      onValueChange={values => setFieldValue('money', values.floatValue)}
      customInput={TextField}
      variant="outlined"
      fullWidth
      error={touched && Boolean(error)}
      helperText={touched && error}
      thousandSeparator="."
      decimalSeparator=","
      isNumericString
      prefix="$"
    />
  )
}
