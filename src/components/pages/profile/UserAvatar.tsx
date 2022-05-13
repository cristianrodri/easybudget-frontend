import { Stack } from '@mui/material'
import { Title } from './Title'
import { AvatarUser } from '@custom-types'
import { AddAvatar } from './AddAvatar'
import { EditAvatar } from './EditAvatar'

interface Props {
  avatar: AvatarUser
}

export const UserAvatar = ({ avatar }: Props) => {
  return (
    <Stack sx={{ mt: theme => theme.spacing(2) }}>
      <Title name="Avatar" />
      {avatar ? <EditAvatar avatar={avatar} /> : <AddAvatar />}
    </Stack>
  )
}
