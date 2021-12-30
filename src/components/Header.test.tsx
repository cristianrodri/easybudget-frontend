import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  beforeEach(() => {
    render(<Header backgroundPage="homepage" />)
  })

  it('link has href="/" in header logo', () => {
    const header = screen.getByTestId('homepage')
    expect(header).toHaveAttribute('href', '/')
  })
})
