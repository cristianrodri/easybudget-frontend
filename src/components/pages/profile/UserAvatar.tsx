import { Stack } from '@mui/material'
import { Title } from './Title'
import { AddAvatar } from './AddAvatar'
import { EditAvatar } from './EditAvatar'
import { UploadApiResponse } from 'cloudinary'

interface Props {
  avatar: UploadApiResponse
}

export const UserAvatar = ({ avatar }: Props) => {
  return (
    <Stack sx={{ mt: theme => theme.spacing(2) }}>
      <Title name="Avatar" />
      {avatar ? <EditAvatar avatar={avatar} /> : <AddAvatar />}
    </Stack>
  )
}
