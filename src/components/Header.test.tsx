import { render, screen } from '@testing-library/react'
import { Header } from './Header'

it('link has href="/" in header logo', () => {
  render(<Header />)
  const header = screen.getByTestId('homepage')
  expect(header).toHaveAttribute('href', '/')
})
