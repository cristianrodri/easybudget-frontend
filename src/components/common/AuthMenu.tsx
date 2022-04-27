import { Avatar, Menu, MenuItem } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { useRouter } from 'next/router'
import { SERVER_URL } from '@config/url'
import { getAvatar } from '@utils/avatar'
import { useUserData } from '@hooks/useSWRUser'
import { clientGetApi } from '@config/api_client'
import { ApiResponseSuccess } from '@custom-types'

export const AuthMenu = () => {
  const { data } = useUserData()
  const avatarUrl = getAvatar(data)
  const router = useRouter()

  const logout = async () => {
    const res = await clientGetApi<ApiResponseSuccess<never>>('/api/logout')

    if (res.data.success) router.push('/')
  }

  if (!data) return null

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <>
          <Avatar
            style={{ cursor: 'pointer' }}
            src={`${SERVER_URL}${avatarUrl}`}
            title={data?.username}
            {...bindTrigger(popupState)}
          />
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
            <MenuItem onClick={() => router.push('/categories')}>
              Categories
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  )
}
