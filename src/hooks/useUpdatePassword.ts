import { ChangeEvent, useContext, useState } from 'react'
import { clientPutApi } from '@config/api_client'
import { openSnackbar } from '@context/actions'
import { Context } from '@context/GlobalContext'
import { SnackbarType } from '@utils/enums'

export const useUpdatePassword = (
  newPassword: string,
  succededFn: () => void
) => {
  const { dispatch } = useContext(Context)
  const [currentPassword, setCurrentPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentPassword(e.target.value)
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    const res = await clientPutApi('api/user/password/update', {
      currentPassword,
      newPassword
    })

    setIsLoading(false)

    if (res.success === true) {
      dispatch(
        openSnackbar(`Your password has been updated`, SnackbarType.SUCCESS)
      )

      setCurrentPassword('')

      // Callback function will be called after succeded response is received
      succededFn()
    } else {
      dispatch(openSnackbar(res.message, SnackbarType.ERROR))
    }
  }

  return { isLoading, currentPassword, handleChange, handleSubmit }
}
