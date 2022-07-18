import { useEffect } from 'react'
import { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { GlobalContext } from '@context/GlobalContext'
import { Snackbar } from '@components/common/Snackbar'
import '../styles/styles.css'
import { theme, ThemeMuiProvider } from '@context/mui/ThemeMuiProvider'

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement.removeChild(jssStyles)
  }, [])

  return (
    <GlobalContext>
      <ThemeMuiProvider>
        <NextNProgress
          color={theme.palette.primary.light}
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
        />
        <Component {...pageProps} />
        <Snackbar />
      </ThemeMuiProvider>
    </GlobalContext>
  )
}

export default App
