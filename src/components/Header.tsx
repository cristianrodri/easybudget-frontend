import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  const logoSize = 100
  return (
    <header>
      <Link href="/">
        <a>
          <Image src="/logo.webp" width={logoSize} height={logoSize} />
        </a>
      </Link>
    </header>
  )
}
