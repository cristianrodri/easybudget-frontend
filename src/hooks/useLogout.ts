import { clientPostApi } from '@config/api_client'
import { clearGlobalState } from '@context/actions'
import { Context } from '@context/GlobalContext'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export const useLogout = () => {
  const { dispatch } = useContext(Context)
  const router = useRouter()

  const logout = async () => {
    const res = await clientPostApi('api/logout')

    if (res.success) {
      dispatch(clearGlobalState())

      router.push(`/login`)
      // Window location is called because swr cache will be cleared
      window.location.href = '/login'
    }
  }

  return { logout }
}
