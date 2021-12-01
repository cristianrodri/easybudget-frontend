import { AppProps } from 'next/app'
import { createTheme, Snackbar } from '@material-ui/core'
import { responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'
import '../styles/styles.css'
import { useEffect } from 'react'
import NextNProgress from 'nextjs-progressbar'
import { Alert } from '@material-ui/lab'
import { GlobalContext } from '@context/GlobalContext'

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[400]
    }
  }
})
const responsiveTheme = responsiveFontSizes(theme)

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
        <Snackbar
          open={false}
          autoHideDuration={4000}
          onClose={() => console.log('close')}
        >
          <Alert onClose={() => console.log('close')} severity="success">
            This is a success message!
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </GlobalContext>
  )
}

export default App
