import { useEffect } from 'react'
import { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { responsiveFontSizes } from '@mui/material'
import { purple } from '@mui/material/colors'
import { GlobalContext } from '@context/GlobalContext'
import { Snackbar } from '@components/common/Snackbar'
import '../styles/styles.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'

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

console.log(responsiveTheme)

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement.removeChild(jssStyles)
  }, [])

  return (
    <GlobalContext>
      <ThemeProvider theme={responsiveTheme}>
        <NextNProgress
          color={theme.palette.primary.light}
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
        />
        <Component {...pageProps} />
        <Snackbar />
      </ThemeProvider>
    </GlobalContext>
  )
}

export default App
