import { ThemeMuiProvider } from '@context/mui/ThemeMuiProvider'
import { render, screen } from '@testing-library/react'
import { BudgetType } from '@utils/enums'
import { Budget } from './Budget'

describe('Budget Summary INCOME', () => {
  beforeEach(() => {
    render(
      <ThemeMuiProvider>
        <Budget
          isLoading={false}
          colorType={BudgetType.INCOME}
          money={100_000}
        />
      </ThemeMuiProvider>
    )
  })

  it('should render "$ 100.000" as a money', () => {
    expect(
      screen.getByRole('heading', { name: '$ 100.000' })
    ).toBeInTheDocument()
  })

  it('should render "Income" as a title', () => {
    expect(screen.getByText(/income/i)).toBeInTheDocument()
  })
})

describe('Budget Summary EXPENSE', () => {
  beforeEach(() => {
    render(
      <ThemeMuiProvider>
        <Budget
          isLoading={false}
          colorType={BudgetType.EXPENSE}
          money={50_000}
        />
      </ThemeMuiProvider>
    )
  })

  it('should render "$ 50.000" as a money', () => {
    expect(
      screen.getByRole('heading', { name: '$ 50.000' })
    ).toBeInTheDocument()
  })

  it('should render "Expense" as a title', () => {
    expect(screen.getByText(/expense/i)).toBeInTheDocument()
  })
})

describe('Budget Summary EXPENSE', () => {
  beforeEach(() => {
    render(
      <ThemeMuiProvider>
        <Budget isLoading={false} colorType={'budget'} money={50_000} />
      </ThemeMuiProvider>
    )
  })

  it('should render "$ 50.000" as a money', () => {
    expect(
      screen.getByRole('heading', { name: '$ 50.000' })
    ).toBeInTheDocument()
  })

  it('should render "Budget" as a title', () => {
    expect(screen.getByText(/budget/i)).toBeInTheDocument()
  })
})
