import { MouseEvent, useState } from 'react'
import { Avatar, Menu, MenuItem, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useUserData } from '@hooks/useSWRUser'
import { useUserAvatar } from '@hooks/useSWRAvatar'
import { useLogout } from '@hooks/useLogout'

export const AuthMenu = () => {
  const { data } = useUserData()
  const { data: avatar } = useUserAvatar()
  const avatarUrl = avatar?.secure_url
  const router = useRouter()
  const { logout } = useLogout()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
  }

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
        <MenuItem onClick={() => router.push('/privacy')}>Privacy</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}
