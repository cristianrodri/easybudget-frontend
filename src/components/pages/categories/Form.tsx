import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material'
import { useFocus } from '@hooks/useFocus'
import { object, SchemaOf, string } from 'yup'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { Context } from '@context/GlobalContext'
import { SnackbarType } from '@utils/enums'
import { CategoryTypes, GetCategory } from '@custom-types'
import { useSWRCategories } from '@hooks/useSWRCategories'
import { openSnackbar } from '@context/actions'
import { clientPostApi } from '@config/api_client'

interface Props {
  categories: GetCategory[]
}

interface FormTypes {
  name: string
  type: string
}

export const Form = ({ categories }: Props) => {
  const { dispatch } = useContext(Context)
  const { data: categoriesData, mutate } = useSWRCategories(categories)
  const ref = useFocus()

  const validationSchema: SchemaOf<FormTypes> = object({
    name: string().required('Category name is required'),
    type: string().required('Budget Type is required')
  })

  const formik = useFormik<FormTypes>({
    initialValues: {
      name: '',
      type: ''
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      helpers.setSubmitting(true)

      const res = await clientPostApi<CategoryTypes, FormTypes>(
        'api/categories/add',
        values
      )

      if (res.success === true) {
        dispatch(
          openSnackbar(
            `${res.data.name} was added into ${res.data.type} category`,
            SnackbarType.SUCCESS
          )
        )

        // Mutate categories by adding new category
        const updatedCategories = categoriesData.concat(res.data)

        mutate(updatedCategories, false)

        helpers.resetForm()
        ref.current?.focus()
      } else {
        dispatch(openSnackbar(res.message, SnackbarType.ERROR))
      }

      helpers.setSubmitting(false)
    }
  })

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      display="flex"
      flexDirection="column"
      alignSelf="center"
    >
      <TextField
        id="name"
        inputRef={ref}
        name="name"
        variant="outlined"
        label="Add category"
        style={{ marginBottom: '1rem' }}
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <FormControl component="fieldset" style={{ marginBottom: '.5rem' }}>
        <FormLabel component="legend">Budget Type</FormLabel>
        <RadioGroup
          id="type"
          row
          aria-label="Type"
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
        >
          <FormControlLabel value="income" control={<Radio />} label="Income" />
          <FormControlLabel
            value="expense"
            control={<Radio />}
            label="Expense"
          />
        </RadioGroup>
        <FormHelperText style={{ color: '#f44336' }}>
          {formik.touched.type && formik.errors.type}
        </FormHelperText>
      </FormControl>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Adding...' : 'Add category'}
      </Button>
    </Box>
  )
}
