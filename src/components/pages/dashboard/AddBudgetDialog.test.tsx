import { ThemeMuiProvider } from '@context/mui/ThemeMuiProvider'
import { render, screen } from '@testing-library/react'
import { GlobalContext } from '@context/GlobalContext'
import { AddBudgetDialog } from './AddBudgetDialog'

const close = jest.fn()

describe('AddBudgetDialog form component', () => {
  beforeEach(() => {
    render(
      <GlobalContext>
        <ThemeMuiProvider>
          <AddBudgetDialog openDialog={true} handleClose={close} />
        </ThemeMuiProvider>
      </GlobalContext>
    )
  })

  it('should render description input', () => {
    expect(
      screen.getByRole('textbox', {
        name: /description/i
      })
    ).toBeInTheDocument()
  })

  it('should render amount input', () => {
    expect(
      screen.getByRole('textbox', {
        name: /amount/i
      })
    ).toBeInTheDocument()
  })

  it('should render input radio income', () => {
    expect(
      screen.getByRole('radio', {
        name: /income/i
      })
    ).toBeInTheDocument()
  })

  it('should render input radio expense', () => {
    expect(
      screen.getByRole('radio', {
        name: /expense/i
      })
    ).toBeInTheDocument()
  })
})
