import Image from 'next/image'
import Link from 'next/link'
import { makeStyles, Theme } from '@material-ui/core'
import { useSWRUser } from '@hooks/useSWRUser'
import { User } from '@custom-types'
import { AuthMenu } from './common/AuthMenu'
import { BackgroundType } from './Layout'

interface Props {
  userData: User
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

export const Header = ({ userData, backgroundPage }: Props) => {
  const { data } = useSWRUser(userData)
  const { header } = useStyles({ backgroundPage })

  return (
    <header className={header}>
      <Link href="/">
        <a data-testid="homepage">
          <Image src="/logo.png" layout="fixed" width={120} height={50} />
        </a>
      </Link>
      {data && <AuthMenu user={data} />}
    </header>
  )
}
