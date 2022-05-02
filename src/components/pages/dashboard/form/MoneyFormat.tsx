import { TextField } from '@mui/material'
import { FormikErrors } from 'formik'
import NumberFormat, { NumberFormatValues } from 'react-number-format'

type MoneyType = { money: number }

type Props = {
  money: number
  touched?: boolean
  error?: string
  // Handling provided by formik
  setFieldValue?: (
    field: 'money',
    value: number,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<MoneyType>> | Promise<void>
  handleChange?: (values: NumberFormatValues) => void
}

export const MoneyFormat = ({
  money,
  setFieldValue,
  touched,
  error,
  handleChange
}: Props) => {
  const handleChangeMoney = (values: NumberFormatValues) => {
    // If setFieldValue prop is provided, it means that the value is changed by formik, otherwise, is changed by the component which is provided its own state
    if (!!setFieldValue) {
      setFieldValue('money', values.floatValue)
      return
    }

    handleChange(values)
  }
  return (
    <NumberFormat
      id="money"
      label="Amount"
      name="money"
      value={money}
      onValueChange={handleChangeMoney}
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
