import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

export default function MaterialUIPickers() {
  const [value, setValue] = useState<Date | null>(new Date())

  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label="Date and Time"
        inputFormat="dd-MMM-yyyy HH:mm"
        value={value}
        onChange={handleChange}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
