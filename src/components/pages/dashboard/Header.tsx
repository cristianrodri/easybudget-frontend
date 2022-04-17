import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  formControl: {
    width: 120
  }
}))

export const Header = () => {
  const { formControl } = useStyles()

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      spacing={4}
      gap={2}
      sx={{
        justifyContent: {
          xs: 'center',
          md: 'space-between'
        }
      }}
    >
      <Typography variant="h4" component="h1">
        Wallet - March 2022
      </Typography>
      <Stack direction="row" spacing={2}>
        {/* Select year */}
        <FormControl className={formControl}>
          <InputLabel id="select-year-label">Year</InputLabel>
          <Select
            labelId="select-year-label"
            id="select-year"
            value={2022}
            label="Year"
          >
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
          </Select>
        </FormControl>
        {/* Select month */}
        <FormControl className={formControl}>
          <InputLabel id="select-label-month">Month</InputLabel>
          <Select
            labelId="select-label-month"
            id="select-month"
            value={'March'}
            label="Month"
          >
            <MenuItem value={'March'}>March</MenuItem>
            <MenuItem value={'February'}>February</MenuItem>
            <MenuItem value={'January'}>January</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  )
}
