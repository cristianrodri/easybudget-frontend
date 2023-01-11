import { Stack } from '@mui/material'
import { AddAvatar } from './AddAvatar'
import { EditAvatar } from './EditAvatar'
import { UploadApiResponse } from 'cloudinary'
import { PageTitle } from '@components/common/PageTitle'

interface Props {
  avatar: UploadApiResponse
}

export const UserAvatar = ({ avatar }: Props) => {
  return (
    <Stack sx={{ mt: theme => theme.spacing(2) }}>
      <PageTitle name="Avatar" />
      {avatar ? <EditAvatar avatar={avatar} /> : <AddAvatar />}
    </Stack>
  )
}
