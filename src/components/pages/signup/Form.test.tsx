import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from './Form'
import { setupServer } from 'msw/node'
import { DefaultRequestBody, rest } from 'msw'
import { GlobalContext } from '@context/GlobalContext'
import { ThemeMuiProvider } from '@context/mui/ThemeMuiProvider'

const server = setupServer(
  rest.post<DefaultRequestBody, { success: boolean }>(
    '/api/register',
    (req, res, ctx) => {
      return res(ctx.delay(100), ctx.json({ success: true }))
    }
  )
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('Signup form', () => {
  beforeEach(async () => {
    render(
      <GlobalContext>
        <ThemeMuiProvider>
          <Form />
        </ThemeMuiProvider>
      </GlobalContext>
    )
  })

  it('should render Loading... after submit the form', async () => {
    userEvent.type(screen.getByLabelText(/username/i), 'John')
    userEvent.type(screen.getByLabelText(/email/i), 'john.dee@someemail.com')
    userEvent.type(screen.getByLabelText(/^password$/i), 'Dee123456')
    userEvent.type(screen.getByLabelText(/^confirm password$/i), 'Dee123456')

    submittingForm()

    // Check to see if the button text changes to Loading...
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Loading...' })
      ).toBeInTheDocument()
    )
  })

  describe('Show validation errors after submitting an empty form', () => {
    it('should render "Name is required"', async () => {
      submittingForm()
      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      })
    })

    it('should render "Email is required"', async () => {
      submittingForm()
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      })
    })

    it('should render "Password is required"', async () => {
      submittingForm()
      await waitFor(() => {
        expect(screen.getByText(/password is required/i)).toBeInTheDocument()
      })
    })

    it('should render "Enter a valid email" after the user types any word on email input', async () => {
      submittingForm()
      await waitFor(() => {
        userEvent.type(screen.getByLabelText(/email/i), 'c')
      })
      await waitFor(() => {
        expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument()
      })
    })

    it('should render "Username should be of minimum 2 characters" after the user types one word on username input', async () => {
      submittingForm()
      await waitFor(() => {
        userEvent.type(screen.getByLabelText(/username/i), 'c')
      })
      await waitFor(() => {
        expect(
          screen.getByText(/^Username should be of minimum 2 characters$/i)
        ).toBeInTheDocument()
      })
    })

    it('should render "Username should be of maximum 25 characters" after the user types more than 25 words on username input', async () => {
      submittingForm()

      await waitFor(() => {
        fireEvent.change(screen.getByLabelText(/username/i), {
          target: { value: 'usertypesmorethan25characters' }
        })
      })

      await waitFor(() => {
        expect(
          screen.getByText(/^Username should be of maximum 25 characters$/i)
        ).toBeInTheDocument()
      })
    })

    it('should render "Password should be of minimum 8 characters"', async () => {
      submittingForm()
      await waitFor(() => {
        userEvent.type(screen.getByLabelText(/^password$/i), 'cccyyy')
      })
      await waitFor(() => {
        expect(
          screen.getByText(/^Password should be of minimum 8 characters$/i)
        ).toBeInTheDocument()
      })
    })
  })
})

const submittingForm = () => {
  fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
}
