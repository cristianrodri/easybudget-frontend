import { ThemeMuiProvider } from '@context/mui/ThemeMuiProvider'
import { render, screen } from '@testing-library/react'
import IndexPage from '../pages/index'

describe('IndexPage', () => {
  beforeEach(() => {
    render(
      <ThemeMuiProvider>
        <IndexPage />
      </ThemeMuiProvider>
    )
  })

  it('should render IndexPage', () => {
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('should render Easy Budget as presentation title', () => {
    expect(screen.getByText(/easy budget/i)).toBeInTheDocument()
  })
})
