import { clientGetApi } from '@config/api_client'
import { clearGlobalState } from '@context/actions'
import { Context } from '@context/GlobalContext'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export const useLogout = () => {
  const { dispatch } = useContext(Context)
  const router = useRouter()

  const logout = async (url = 'login') => {
    const res = await clientGetApi('api/logout')

    if (res.success) {
      dispatch(clearGlobalState())

      router.push(`/${url ?? ''}`)
    }
  }

  return { logout }
}
