import { AppProps } from 'next/app'
import { createTheme } from '@material-ui/core'
import { responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'
import { useEffect } from 'react'
import '../styles/styles.css'
import NextNProgress from 'nextjs-progressbar'
import { GlobalContext } from '@context/GlobalContext'
import { Dialog } from '@components/common/Dialog'

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
        <Dialog />
      </ThemeProvider>
    </GlobalContext>
  )
}

export default App
