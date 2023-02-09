import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from './Form'
import { GlobalContext } from '@context/GlobalContext'
import { ThemeMuiProvider } from '@context/mui/ThemeMuiProvider'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

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

  it('should check username, email, password and confirm password values. Also Loading... as button text after submit the form', async () => {
    const user = userEvent.setup()

    const username = getUsername()
    const email = getEmail()
    const password = getPassword()
    const confirmPassword = getConfirmPassword()

    await user.type(username, 'John')
    await user.type(email, 'john.dee@someemail.com')
    await user.type(password, 'Dee123456')
    await user.type(confirmPassword, 'Dee123456')

    await submittingForm()

    // Check to see if the button text changes to Loading...
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /loading.../i })
      ).toBeInTheDocument()
    )

    await waitFor(() => expect(username.value).toBe('John'))
    await waitFor(() => expect(email.value).toBe('john.dee@someemail.com'))
    await waitFor(() => expect(password.value).toBe('Dee123456'))
    await waitFor(() => expect(confirmPassword.value).toBe('Dee123456'))
  }, 10_000)

  describe('Show validation errors after submitting an empty form', () => {
    it('should render "Name is required"', async () => {
      await submittingForm()

      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      })
    })

    it('should render "Email is required"', async () => {
      await submittingForm()

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      })
    })

    it('should render "Password is required"', async () => {
      await submittingForm()
      await waitFor(() => {
        expect(screen.getByText(/password is required/i)).toBeInTheDocument()
      })
    })

    it('should render "Enter a valid email" after the user types any word on email input', async () => {
      await submittingForm()
      await waitFor(() => {
        userEvent.type(getEmail(), 'c')
      })
      await waitFor(() => {
        expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument()
      })
    })

    it('should render "Username should be of minimum 2 characters" after the user types one word on username input', async () => {
      const user = userEvent.setup()

      await submittingForm()

      await user.type(getUsername(), 'c')

      await waitFor(() => {
        expect(
          screen.getByText(/^Username should be of minimum 2 characters$/i)
        ).toBeInTheDocument()
      })
    })

    it('should render "Username should be of maximum 25 characters" after the user types more than 25 words on username input', async () => {
      const user = userEvent.setup()

      await submittingForm()

      await user.type(getUsername(), 'usertypesmorethan25characters')

      await waitFor(() => {
        expect(
          screen.getByText(/^Username should be of maximum 25 characters$/i)
        ).toBeInTheDocument()
      })
    })

    it('should render "Password should be of minimum 8 characters"', async () => {
      const user = userEvent.setup()

      await submittingForm()

      await user.type(getPassword(), 'cccyyy')

      await waitFor(() => {
        expect(
          screen.getByText(/^Password should be of minimum 8 characters$/i)
        ).toBeInTheDocument()
      })
    })
  })
})

const getUsername = () => screen.getByLabelText(/username/i) as HTMLInputElement

const getEmail = () => screen.getByLabelText(/email/i) as HTMLInputElement

const getPassword = () =>
  screen.getByLabelText(/^password$/i) as HTMLInputElement

const getConfirmPassword = () =>
  screen.getByLabelText(/^confirm password$/i) as HTMLInputElement

const submittingForm = async () => {
  const user = userEvent.setup()

  await user.click(screen.getByRole('button', { name: /sign up/i }))
}
