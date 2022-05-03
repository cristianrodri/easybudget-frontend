import { FormikSetFieldType } from '@custom-types'
import { TextField } from '@mui/material'
import NumberFormat from 'react-number-format'

type Props = {
  money: number
  touched: boolean
  error: string
  // Handling function provided by formik
  setFieldValue: FormikSetFieldType<'money', number>
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
