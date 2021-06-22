import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

const StyledHeader = styled.header`
  height: var(--header-height);
`

export const Header = () => {
  const logoSize = 100
  return (
    <StyledHeader>
      <Link href="/">
        <a>
          <Image src="/logo.webp" width={logoSize} height={logoSize} />
        </a>
      </Link>
    </StyledHeader>
  )
}
