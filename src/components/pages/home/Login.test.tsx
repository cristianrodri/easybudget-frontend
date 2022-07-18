import { ThemeMuiProvider } from '@context/mui/ThemeMuiProvider'
import { render, screen } from '@testing-library/react'
import { Login } from './Login'

describe('Login button into Homepage', () => {
  beforeEach(() => {
    render(
      <ThemeMuiProvider>
        <Login />
      </ThemeMuiProvider>
    )
  })

  it('should have href="/login"', () => {
    const login = screen.getByText(/login/i).closest('a')
    expect(login).toHaveAttribute('href', '/login')
  })
})
