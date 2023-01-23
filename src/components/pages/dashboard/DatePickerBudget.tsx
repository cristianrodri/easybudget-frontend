import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { FormikSetFieldType } from '@custom-types'

interface Props {
  date: string
  setFieldValue: FormikSetFieldType<'date', string>
}

export const DatePickerBudget = ({ date, setFieldValue }: Props) => {
  const handleChange = (date: Date) => {
    if (date.toString() !== 'Invalid Date') {
      setFieldValue('date', date.toISOString())
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label="Date and Time"
        inputFormat="dd-MMM-yyyy HH:mm"
        value={new Date(date)}
        onChange={handleChange}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
