import { ThemeMuiProvider } from '@context/mui/ThemeMuiProvider'
import { render, screen, waitFor } from '@testing-library/react'
import { GlobalContext } from '@context/GlobalContext'
import { AddBudgetDialog } from './AddBudgetDialog'
import userEvent from '@testing-library/user-event'
import { BudgetType } from '@utils/enums'
import { clientPostApi } from '@config/api_client'

const mockHandleCloseFn = jest.fn()

jest.mock('../../../config/api_client', () => ({
  clientPostApi: jest.fn()
}))

jest.mock('../../../hooks/useSWRUser', () => ({
  useUserData: () => ({
    data: {
      categories: [
        {
          id: 1,
          name: 'fruits',
          type: BudgetType.EXPENSE,
          money: 12000
        },
        {
          id: 2,
          name: 'salary',
          type: BudgetType.INCOME,
          money: 1200000
        },
        {
          id: 3,
          name: 'clothes',
          type: BudgetType.EXPENSE,
          money: 120000
        }
      ]
    },
    // Mock mutateByAddingNewBudget to prevent warning (TODO - split up api logic from the component)
    mutateByAddingBudgetToCategory: jest.fn()
  })
}))

// Mock mutateByAddingNewBudget to prevent warning (TODO - split up api logic from the component)
jest.mock('../../../hooks/useSWRLatestBudgets', () => ({
  useSWRLatestBudgets: () => ({
    mutateByAddingNewBudget: jest.fn()
  })
}))

describe('AddBudgetDialog form component', () => {
  beforeEach(async () => {
    render(
      <GlobalContext>
        <ThemeMuiProvider>
          <AddBudgetDialog openDialog={true} handleClose={mockHandleCloseFn} />
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

  it('should submit the add budget form', async () => {
    // Mock return value for clientPostApi
    ;(
      clientPostApi as jest.MockedFunction<typeof clientPostApi>
    ).mockResolvedValueOnce({
      success: true,
      data: {
        description: 'apples'
      }
    })
    const user = userEvent.setup()

    // Type the description
    await user.type(
      screen.getByRole('textbox', {
        name: /description/i
      }),
      'apples'
    )

    // Type the amount
    await user.type(
      screen.getByRole('textbox', {
        name: /amount/i
      }),
      '3000'
    )

    // Click the budget type radio
    await user.click(
      screen.getByRole('radio', {
        name: /expense/i
      })
    )

    // Open category options by clicking the first option
    await user.click(
      screen.getByRole('button', {
        name: /clothes/i
      })
    )

    // Select the fruits option
    await user.click(
      screen.getByRole('option', {
        name: /fruits/i
      })
    )

    // Submit the form
    await user.click(
      screen.getByRole('button', {
        name: /save/i
      })
    )

    await waitFor(() => {
      expect(clientPostApi).toHaveBeenCalled()
      expect(clientPostApi).toHaveBeenCalledWith('api/budget/add', {
        description: 'apples',
        money: 3000,
        category: 1
      })
    })
  }, 10_000)
})
