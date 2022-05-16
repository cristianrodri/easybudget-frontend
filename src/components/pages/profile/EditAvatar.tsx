import Image from 'next/image'
import { Button, Stack } from '@mui/material'
import { SERVER_URL } from '@config/url'
import { AvatarUser } from '@custom-types'

interface Props {
  avatar: AvatarUser
}

export const EditAvatar = ({ avatar }: Props) => {
  return (
    <Stack direction="row" justifyContent="center">
      <Stack direction="column" alignItems="center">
        <Image
          src={`${SERVER_URL}${avatar.url}`}
          layout="fixed"
          width={300}
          height={200}
          objectFit="contain"
          alt="User Avatar"
        />
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          zIndex={theme => theme.zIndex.fab}
          sx={{
            color: theme => theme.palette.common.white,
            backgroundColor: theme => theme.palette.common.white
          }}
        >
          <Button component="label" variant="outlined" color="info">
            <input type="file" hidden />
            update
          </Button>
          <Button variant="outlined" color="error">
            delete
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
