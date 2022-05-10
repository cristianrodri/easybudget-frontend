import { useContext } from 'react'
import { Context } from '@context/GlobalContext'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { textCapitalize } from '@utils/string'
import { MONTH } from '@utils/dates'
import { DateType } from '@utils/enums'
import { WalletDateValue } from '@context/types'
import { changeWalletDate } from '@context/actions'

interface Props {
  dateType: DateType
  data: number[]
}

export const DateSelect = ({ dateType, data }: Props) => {
  const { values, dispatch } = useContext(Context)
  const { walletDate } = values

  const handleChange = (e: SelectChangeEvent<WalletDateValue>) => {
    dispatch(changeWalletDate(dateType, e.target.value as WalletDateValue))
  }

  return (
    <FormControl sx={{ width: 120 }}>
      <InputLabel id={`select-${dateType}-label`}>
        {textCapitalize(dateType)}
      </InputLabel>
      <Select
        labelId={`select-${dateType}-label`}
        id={`select-${dateType}`}
        value={walletDate[dateType]}
        label={textCapitalize(dateType)}
        onChange={handleChange}
      >
        {data.map(d => (
          <MenuItem key={d} value={d}>
            {dateType === DateType.MONTH ? MONTH[d] : d}
          </MenuItem>
        ))}
        <MenuItem value={'all'}>
          {dateType === DateType.MONTH ? 'All Year' : 'All Time'}
        </MenuItem>
      </Select>
    </FormControl>
  )
}
