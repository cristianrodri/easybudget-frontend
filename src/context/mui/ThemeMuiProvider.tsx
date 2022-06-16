import { responsiveFontSizes } from '@mui/material'
import { purple } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FC } from 'react'

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[400]
    }
  },
  typography: {
    fontFamily: '"Nunito", sans-serif'
  }
})

const responsiveTheme = responsiveFontSizes(theme)

export const ThemeMuiProvider: FC = ({ children }) => {
  return <ThemeProvider theme={responsiveTheme}>{children}</ThemeProvider>
}
