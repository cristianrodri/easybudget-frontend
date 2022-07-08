import { ThemeMuiProvider } from '@context/mui/ThemeMuiProvider'
import { render, screen } from '@testing-library/react'
import { AddBudgetIcon } from './AddBudgetIcon'
import { GlobalContext } from '@context/GlobalContext'

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

  it('should have a button in the document', () => {
    expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument()
  })
})
