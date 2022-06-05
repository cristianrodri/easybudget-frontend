import { useContext } from 'react'
import { Budget } from '@custom-types'
import { Box, Stack, Typography } from '@mui/material'
import { getDayAndMonth } from '@utils/dates'
import { BudgetType } from '@utils/enums'
import { formatMoney } from '@utils/money'
import { textCapitalize } from '@utils/string'
import { colorDescription } from '@utils/color'
import { Context } from '@context/GlobalContext'
import { openDialogDeletion, openDialogEdition } from '@context/actions'
import { ActionData } from '@components/common/ActionData'

type Props = {
  budget: Budget
  isDialog?: boolean
}

export const BudgetDescription = ({ budget, isDialog }: Props) => {
  const { dispatch } = useContext(Context)
  const { description, money, date, category } = budget
  const type =
    // If the component is not showed in the dialog category and the category data is not a number, then show the type of the category
    !isDialog && typeof category !== 'number'
      ? category.type
      : ('' as BudgetType)

  const handleEdit = () => {
    // The budget parameter is pass by spread object because it needs to be unmutable
    dispatch(openDialogEdition({ ...budget }))
  }

  const handleDelete = () => {
    dispatch(openDialogDeletion(budget))
  }

  return (
    <Stack direction="row" spacing={2}>
      {!isDialog && (
        <Stack color={colorDescription?.[type]?.main}>
          {type === BudgetType.INCOME ? '+' : '-'}
        </Stack>
      )}
      <Stack flexGrow={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
          fontWeight={theme => theme.typography.fontWeightRegular}
          color={colorDescription?.[type]?.main}
        >
          <Box component="span">{textCapitalize(description)}</Box>
          <Box
            component="span"
            sx={{
              width: '50%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: theme => theme.spacing(1),
              textAlign: 'right'
            }}
          >
            {formatMoney(money)}
            <ActionData
              actionType="edit"
              handleClick={handleEdit}
              color={colorDescription?.[type]?.main}
            />
            <ActionData
              actionType="delete"
              handleClick={handleDelete}
              color={colorDescription?.[type]?.main}
            />
          </Box>
        </Stack>
        <Typography
          component="span"
          variant="caption"
          color={colorDescription?.[type]?.light}
        >
          {getDayAndMonth(date)}
        </Typography>
      </Stack>
    </Stack>
  )
}
