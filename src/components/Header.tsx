import Image from 'next/image'
import Link from 'next/link'
import { Theme } from '@mui/material'
import { AuthMenu } from './common/AuthMenu'
import { BackgroundType } from './Layout'
import { makeStyles } from '@mui/styles'

interface Props {
  backgroundPage: BackgroundType
  isAuth: boolean
}

const useStyles = makeStyles<Theme, { backgroundPage: BackgroundType }>(
  theme => ({
    header: {
      position: props =>
        props.backgroundPage === 'default' ? 'static' : 'absolute',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.spacing(2)
    }
  })
)

export const Header = ({ backgroundPage, isAuth }: Props) => {
  const { header } = useStyles({ backgroundPage })

  return (
    <header className={header}>
      <Link href="/">
        <a data-testid="homepage">
          <Image
            src="/logo.svg"
            layout="fixed"
            width={120}
            height={50}
            alt="Header logo"
          />
        </a>
      </Link>
      {/* AuthMenu is only showed in authenticated pages */}
      {isAuth ? <AuthMenu /> : null}
    </header>
  )
}
