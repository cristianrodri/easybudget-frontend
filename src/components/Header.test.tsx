import { ThemeMuiProvider } from '@context/mui/ThemeMuiProvider'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  beforeEach(() => {
    render(
      <ThemeMuiProvider>
        <Header backgroundPage="homepage" isAuth={false} />
      </ThemeMuiProvider>
    )
  })

  it('link has href="/" in header logo', () => {
    const header = screen.getByRole('img', { name: /header logo/i })
    expect(header).toBeInTheDocument()
  })
})
