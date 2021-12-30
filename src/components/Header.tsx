import Image from 'next/image'
import Link from 'next/link'
import { makeStyles, Theme } from '@material-ui/core'
import { AuthMenu } from './common/AuthMenu'
import { BackgroundType } from './Layout'

interface Props {
  backgroundPage: BackgroundType
}

const useStyles = makeStyles<Theme, { backgroundPage: BackgroundType }>(() => ({
  header: {
    position: props =>
      props.backgroundPage === 'default' ? 'static' : 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

export const Header = ({ backgroundPage }: Props) => {
  const { header } = useStyles({ backgroundPage })

  return (
    <header className={header}>
      <Link href="/">
        <a data-testid="homepage">
          <Image src="/logo.png" layout="fixed" width={120} height={50} />
        </a>
      </Link>
      <AuthMenu />
    </header>
  )
}
