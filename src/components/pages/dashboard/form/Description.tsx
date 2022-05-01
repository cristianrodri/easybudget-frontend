import { TextField } from '@mui/material'
import { FormikHandleChange } from '@custom-types'

interface Props {
  description: string
  touched: boolean
  error: string
  // handleChange is Provided by formik
  handleChange: FormikHandleChange
}

export const Description = ({
  description,
  handleChange,
  touched,
  error
}: Props) => {
  return (
    <TextField
      id="description"
      label="Description"
      name="description"
      value={description}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      error={touched && Boolean(error)}
      helperText={touched && error}
    />
  )
}
