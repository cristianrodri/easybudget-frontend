import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from './Form'

describe('Signup form', () => {
  it('should submit the signup form', async () => {
    render(<Form />)

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
    beforeEach(async () => {
      render(<Form />)
    })

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

    it.todo(
      'should render "Username should be of minimum 2 characters" after the user types one word on username input'
    )

    it.todo(
      'should render "Username should be of maximium 25 characters" after the user types more than 25 words on username input'
    )
  })
})

const submittingForm = () => {
  fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
}
