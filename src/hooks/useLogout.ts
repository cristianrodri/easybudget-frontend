import { clientPostApi } from '@config/api_client'
import { clearGlobalState } from '@context/actions'
import { Context } from '@context/GlobalContext'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

export const useLogout = () => {
  const { dispatch } = useContext(Context)
  const router = useRouter()

  const logout = async () => {
    const res = await clientPostApi('api/logout')

    if (res.success) {
      dispatch(clearGlobalState())

      // eslint-disable-next-line no-console
      console.log(res)

      router.push(`/login`)
    }
  }

  return { logout }
}
