import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  const logoSize = 100
  return (
    <header style={{ height: 'var(--header-height)' }}>
      <Link href="/">
        <a>
          <Image src="/logo.png" width={logoSize} height={logoSize} />
        </a>
      </Link>
    </header>
  )
}
