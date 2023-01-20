import { useContext, useState } from 'react'
import { Context } from '@context/GlobalContext'
import { clientDeleteApi, clientPostApi } from '@config/api_client'
import { openSnackbar } from '@context/actions'
import { SnackbarType } from '@utils/enums'
import { useUserData } from '@hooks/useSWRUser'
import { useInputText } from './useInputText'
import { useLogout } from '@hooks/useLogout'

export const useDeleteUser = () => {
  const { dispatch } = useContext(Context)
  const [isLoading, setIsLoading] = useState(false)
  const { text, handleChange, emptyText } = useInputText()
  const { data } = useUserData()
  const { logout } = useLogout()

  const deleteUser = async () => {
    const res = await clientDeleteApi('api/user/delete', {
      params: {
        createdAt: data.createdAt
      }
    })

    if (res.success === true) {
      logout()
    } else {
      setIsLoading(false)
      dispatch(openSnackbar(res.message, SnackbarType.ERROR))
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    const res = await clientPostApi('api/user/password/check', {
      password: text
    })

    if (res.success === true) {
      await deleteUser()
    } else {
      setIsLoading(false)
      dispatch(openSnackbar(res.message, SnackbarType.ERROR))
    }
  }

  return { text, isLoading, handleChange, emptyText, handleSubmit }
}
