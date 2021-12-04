import { setupServer } from 'msw/node'
import { DefaultRequestBody, rest } from 'msw'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from './Form'

const server = setupServer(
  rest.post<DefaultRequestBody, { success: boolean }>(
    '/api/login',
    (req, res, ctx) => {
      return res(ctx.delay(100), ctx.json({ success: true }))
    }
  )
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('Login Form', () => {
  it('should render Loading... after submit the form', async () => {
    render(<Form />)

    userEvent.type(
      screen.getByLabelText(/email or username/i),
      'john.dee@someemail.com'
    )
    userEvent.type(screen.getByLabelText(/^password$/i), 'Dee123456')

    submittingForm()

    // Check to see if the button text changes to Loading...
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Loading...' })
      ).toBeInTheDocument()
    )
  })

  describe('Show validation errors after submitting an empty form', () => {
    beforeEach(() => {
      render(<Form />)
    })

    it('should render "Email or username is required"', async () => {
      submittingForm()
      await waitFor(() => {
        expect(
          screen.getByText(/Email or username is required/i)
        ).toBeInTheDocument()
      })
    })

    it('should render "Password is required"', async () => {
      submittingForm()
      await waitFor(() => {
        expect(screen.getByText(/password is required/i)).toBeInTheDocument()
      })
    })
  })

  describe('Remove error messages after user types any words', () => {
    beforeEach(async () => {
      render(<Form />)
    })

    it('should remove "Email or username is required"', async () => {
      submittingForm()
      await waitFor(() => {
        userEvent.type(screen.getByLabelText(/email or username/i), 'c')
      })

      await waitFor(() => {
        expect(
          screen.queryByText(/^Email or username is required$/i)
        ).not.toBeInTheDocument()
      })
    })

    it('should remove "Password is required"', async () => {
      submittingForm()
      await waitFor(() => {
        userEvent.type(screen.getByLabelText(/Password/i), 'c')
      })

      await waitFor(() => {
        expect(
          screen.queryByText(/Password is required/i)
        ).not.toBeInTheDocument()
      })
    })
  })
})

const submittingForm = () => {
  userEvent.click(screen.getByRole('button', { name: 'login' }))
}