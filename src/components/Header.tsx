import Image from 'next/image'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  header: {
    position: 'absolute',
    width: '100%'
  }
}))

export const Header = () => {
  const logoSize = 100
  const { header } = useStyles()

  return (
    <header className={header}>
      <Link href="/">
        <a>
          <Image src="/logo.png" width={logoSize} height={logoSize} />
        </a>
      </Link>
    </header>
  )
}
