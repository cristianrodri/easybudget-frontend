import { MouseEvent, useContext, useState } from 'react'
import { Avatar, Menu, MenuItem, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { getAvatarThumbnail } from '@utils/avatar'
import { useUserData } from '@hooks/useSWRUser'
import { clientPostApi } from '@config/api_client'
import { Context } from '@context/GlobalContext'
import { clearGlobalState } from '@context/actions'

export const AuthMenu = () => {
  const { data } = useUserData()
  const { dispatch } = useContext(Context)
  const avatarUrl = getAvatarThumbnail(data)
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = async () => {
    const res = await clientPostApi('api/logout')

    if (res.success) {
      dispatch(clearGlobalState())

      router.push('/')
    }
  }

  if (!data) return null

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ p: 0, minWidth: 0, '& span': { display: 'none' } }}
      >
        <Avatar
          style={{ cursor: 'pointer' }}
          src={avatarUrl}
          title={data?.username}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
        <MenuItem onClick={() => router.push('/categories')}>
          Categories
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  )
}
