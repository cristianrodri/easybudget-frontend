import { openSnackbar } from '@context/actions'
import { Context } from '@context/GlobalContext'
import { SnackbarType, STORAGE } from '@utils/enums'
import { useEffect, useContext } from 'react'

export const useUserDeletionValue = () => {
  const { dispatch } = useContext(Context)

  useEffect(() => {
    const userDeleted = localStorage.getItem(STORAGE.USER_DELETE) || null

    if (JSON.parse(userDeleted)) {
      localStorage.removeItem(STORAGE.USER_DELETE)

      dispatch(
        openSnackbar(
          'Your account has been deleted successfully',
          SnackbarType.SUCCESS
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
