import { AppProps } from 'next/app'
import { createMuiTheme } from '@material-ui/core'
import { responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'
import '../styles/styles.css'
import { useEffect } from 'react'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/monikai.css'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#9d3ff5'
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
      <JSONPretty id="json-pretty" data={responsiveTheme}></JSONPretty>
    </ThemeProvider>
  )
}

export default App
