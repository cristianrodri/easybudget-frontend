import { render, screen, waitFor } from '@testing-library/react'
import { Form } from './Form'
import { GlobalContext } from '@context/GlobalContext'
import { ThemeMuiProvider } from '@context/mui/ThemeMuiProvider'
import userEvent from '@testing-library/user-event'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('Login Form', () => {
  beforeEach(async () => {
    render(
      <GlobalContext>
        <ThemeMuiProvider>
          <Form />
        </ThemeMuiProvider>
      </GlobalContext>
    )
  })

  it('should check email and password values. Also Loading... as button text after submit the form', async () => {
    const user = userEvent.setup()
    const email = getEmail()
    const password = getPassword()
    const button = getButton()

    await user.type(email, 'john.dee@someemail.com')
    await user.type(password, 'Dee123456')

    await user.click(button)

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /loading.../i })
      ).toBeInTheDocument()
    )

    await waitFor(() => expect(email.value).toBe('john.dee@someemail.com'))
    await waitFor(() => expect(password.value).toBe('Dee123456'))
  })

  describe('Show validation errors after submitting an empty form', () => {
    it('should render "Email is required"', async () => {
      await submittingForm()

      await waitFor(() => {
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
      })
    })

    it('should render "Password is required"', async () => {
      await submittingForm()

      await waitFor(() => {
        expect(screen.getByText(/password is required/i)).toBeInTheDocument()
      })
    })
  })

  describe('Remove error messages after user types any words', () => {
    it('should remove "Email is required"', async () => {
      const user = userEvent.setup()

      await user.click(getButton())

      await waitFor(() =>
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
      )

      await user.type(getEmail(), 'c')

      await waitFor(() => {
        expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument()
      })
    })

    it('should remove "Password is required"', async () => {
      submittingForm()
      const user = userEvent.setup()

      await user.click(getButton())

      await waitFor(() =>
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
      )

      await user.type(getPassword(), 'c')

      await waitFor(() => {
        expect(
          screen.queryByText(/Password is required/i)
        ).not.toBeInTheDocument()
      })
    })
  })
})

const getEmail = () => screen.getByLabelText(/email/i) as HTMLInputElement
const getPassword = () => screen.getByLabelText(/password/i) as HTMLInputElement
const getButton = () => screen.getByRole('button', { name: /login/i })

const submittingForm = async () => {
  const user = userEvent.setup()

  await user.click(getButton())
}
