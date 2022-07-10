import { ThemeMuiProvider } from '@context/mui/ThemeMuiProvider'
import { render, screen, waitFor } from '@testing-library/react'
import { AddBudgetIcon } from './AddBudgetIcon'
import { GlobalContext } from '@context/GlobalContext'
import userEvent from '@testing-library/user-event'

describe('AddBudgetIcon component', () => {
  beforeEach(() => {
    render(
      <GlobalContext>
        <ThemeMuiProvider>
          <AddBudgetIcon />
        </ThemeMuiProvider>
      </GlobalContext>
    )
  })

  it('should show AddBudgetDialog form when icon is clicked', async () => {
    userEvent.click(screen.getByRole('button', { name: 'add' }))

    await waitFor(() => {
      expect(screen.getByText(/add new budget/i)).toBeInTheDocument()
    })
  })
})
