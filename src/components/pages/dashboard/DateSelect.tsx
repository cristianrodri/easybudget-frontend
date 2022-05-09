import { useContext } from 'react'
import { Context } from '@context/GlobalContext'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { textCapitalize } from '@utils/string'
import { MONTH } from '@utils/dates'

interface Props {
  dateType: 'month' | 'year'
  data: number[]
}

export const DateSelect = ({ dateType, data }: Props) => {
  const { values } = useContext(Context)
  const { walletDate } = values

  return (
    <FormControl sx={{ width: 120 }}>
      <InputLabel id={`select-${dateType}-label`}>
        {textCapitalize(dateType)}
      </InputLabel>
      <Select
        labelId={`select-${dateType}-label`}
        id={`select-${dateType}`}
        value={walletDate[dateType]}
        label="Year"
      >
        {data.map(d => (
          <MenuItem key={d} value={d}>
            {dateType === 'month' ? MONTH[d] : d}
          </MenuItem>
        ))}
        <MenuItem value={'all'}>
          {dateType === 'month' ? 'All Year' : 'All Time'}
        </MenuItem>
      </Select>
    </FormControl>
  )
}
