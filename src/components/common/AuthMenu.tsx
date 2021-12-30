import { Avatar, Menu, MenuItem } from '@material-ui/core'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { useRouter } from 'next/router'
import { SERVER_URL } from '@config/url'
import { getAvatar } from '@utils/avatar'
import { clientInstance as axios } from '@config/axios'
import { useSWRUser } from '@hooks/useSWRUser'

export const AuthMenu = () => {
  const { data } = useSWRUser()
  const avatarUrl = getAvatar(data)
  const router = useRouter()

  const logout = async () => {
    const res = await axios.post<{ success: boolean }>('/api/logout')

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
