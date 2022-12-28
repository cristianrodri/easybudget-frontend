import { useContext } from 'react'
import { AddCategory, Budget } from '@custom-types'
import { Box, Stack, Typography } from '@mui/material'
import { getDayAndMonth, getFullDate, isAllTime } from '@utils/dates'
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
  const {
    values: { walletDate },
    dispatch
  } = useContext(Context)
  const { description, money, date } = budget
  budget.category = isDialog
    ? typeof budget.category === 'string'
      ? budget.category
      : budget.category.id
    : budget.category
  const type =
    // If the component is not showed in the dialog category and the category data is not a number, then show the type of the category
    !isDialog ? (budget.category as AddCategory).type : ('' as BudgetType)

  const handleEdit = () => {
    // The budget parameter is pass by spread object because it needs to be unmutable
    dispatch(openDialogEdition({ ...budget }))
  }

  const handleDelete = () => {
    dispatch(openDialogDeletion(budget))
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ borderBottom: theme => `1px solid ${theme.palette.grey[300]}` }}
    >
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
          <Typography component="span">
            {textCapitalize(description)}
          </Typography>
          <Typography component="span" sx={{ width: '40%', textAlign: 'end' }}>
            {formatMoney(money)}
          </Typography>
        </Stack>
        <Stack
          component="span"
          color={colorDescription?.[type]?.light}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="span" variant="caption">
            {isAllTime(walletDate) ? getFullDate(date) : getDayAndMonth(date)}
          </Typography>
          <Box
            component="span"
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: theme => theme.spacing(1),
              textAlign: 'right'
            }}
          >
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
      </Stack>
    </Stack>
  )
}
