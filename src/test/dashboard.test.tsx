import { GlobalContext } from '@context/GlobalContext'
import { ThemeMuiProvider } from '@context/mui/ThemeMuiProvider'
import { render, screen } from '@testing-library/react'
import Dashboard from '../pages/dashboard'

jest.mock('../db/mongoose', () => ({
  __esModule: true
}))

jest.mock('../db/category/model', () => ({
  __esModule: true
}))

jest.mock('../db/budget/model', () => ({
  __esModule: true
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

// jest.spyOn('../pages/dashboard', 'getServerSideProps')

// jest.mock('../pages/dashboard', () => ({
//   __esModule: true, // this property makes it work
//   // default: 'mockedDashboard',
//   getServerSideProps: jest.fn()
// }))

describe('Dashboard Page WITHOUT categories', () => {
  beforeEach(() => {
    render(
      <GlobalContext>
        <ThemeMuiProvider>
          <Dashboard
            categoriesCount={0}
            // Pass the current date as an oldest budget date
            oldestBudgetDate={new Date().toISOString()}
          />
        </ThemeMuiProvider>
      </GlobalContext>
    )
  })

  it('should render alert message', () => {
    expect(
      screen.getByText(/At least one category is needed for adding budgets/i)
    ).toBeInTheDocument()
  })

  it('should not render "add budget button"', () => {
    expect(
      screen.queryByRole('button', { name: 'add' })
    ).not.toBeInTheDocument()
  })
})

describe('Dashboard Page WITH categories', () => {
  beforeEach(() => {
    render(
      <GlobalContext>
        <ThemeMuiProvider>
          <Dashboard
            categoriesCount={2}
            // Pass the current date as an oldest budget date
            oldestBudgetDate={new Date().toISOString()}
          />
        </ThemeMuiProvider>
      </GlobalContext>
    )
  })

  it('should not render alert message', () => {
    expect(
      screen.queryByText(/At least one category is needed for adding budgets/i)
    ).not.toBeInTheDocument()
  })

  it('should render "add budget button"', () => {
    expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument()
  })
})

it('should render "year select element"', () => {
  render(
    <GlobalContext>
      <ThemeMuiProvider>
        <Dashboard
          categoriesCount={2}
          // Pass the previous years as an oldest budget date
          oldestBudgetDate={new Date(
            `${new Date().getFullYear() - 2}`
          ).toISOString()}
        />
      </ThemeMuiProvider>
    </GlobalContext>
  )
  expect(screen.getAllByText(/year/i)[0]).toBeInTheDocument()
})
