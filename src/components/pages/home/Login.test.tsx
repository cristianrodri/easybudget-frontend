import { render, screen } from '@testing-library/react'
import { Login } from './Login'

describe('Login button into Homepage', () => {
  beforeEach(() => {
    render(<Login />)
  })

  it('should have href="/login"', () => {
    const login = screen.getByText(/login/i).closest('a')
    expect(login).toHaveAttribute('href', '/login')
  })
})
