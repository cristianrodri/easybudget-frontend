import { AppProps } from 'next/app'
import { createMuiTheme } from '@material-ui/core'
import { responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'
import '../styles/styles.css'
import { useEffect } from 'react'

export const theme = createMuiTheme({
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
    <ThemeProvider theme={responsiveTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
