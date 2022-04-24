import { blue, green, red } from '@mui/material/colors'
import { BudgetType } from './enums'

const COLOR_VALUE = 800
const BG_COLOR_VALUE = 100
const COLOR_DESCRIPTION_MAIN = 700
const COLOR_DESCRIPTION_LIGHT = 700

export const colorWallet = {
  expense: red[COLOR_VALUE],
  income: green[COLOR_VALUE],
  budget: blue[COLOR_VALUE]
}

export const bgColorWallet = {
  expense: red[BG_COLOR_VALUE],
  income: green[BG_COLOR_VALUE],
  budget: blue[BG_COLOR_VALUE]
}

export const colorDescription = {
  [BudgetType.INCOME]: {
    main: green[COLOR_DESCRIPTION_MAIN],
    light: green[COLOR_DESCRIPTION_LIGHT]
  },
  [BudgetType.EXPENSE]: {
    main: red[COLOR_DESCRIPTION_MAIN],
    light: red[COLOR_DESCRIPTION_LIGHT]
  }
}
