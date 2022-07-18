import { ThemeMuiProvider } from '@context/mui/ThemeMuiProvider'
import { render, screen } from '@testing-library/react'
import { Signup } from './Signup'

describe('Signup button into Homepage', () => {
  beforeEach(() => {
    render(
      <ThemeMuiProvider>
        <Signup />
      </ThemeMuiProvider>
    )
  })

  it('should have href="/signup"', () => {
    const signup = screen.getByText(/get started for free/i).closest('a')
    expect(signup).toHaveAttribute('href', '/signup')
  })
})
