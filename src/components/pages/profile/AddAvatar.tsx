import { useContext, useState } from 'react'
import Image from 'next/image'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { makeStyles } from '@mui/styles'
import { useUserData } from '@hooks/useSWRUser'
import { AvatarUser } from '@custom-types'
import { clientGetApi } from '@config/api_client'
import { serverPostApi } from '@config/api_server'
import { AxiosError } from 'axios'
import { openSnackbar } from '@context/actions'
import { SnackbarType } from '@utils/enums'
import { Context } from '@context/GlobalContext'

const useStyles = makeStyles(() => ({
  centered: {
    alignSelf: 'center'
  }
}))

export const AddAvatar = () => {
  const classes = useStyles()
  const { dispatch } = useContext(Context)
  const { data: user, mutate } = useUserData()
  const [file, setFile] = useState<File>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCloseUpload = () => {
    setFile(null)
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('files', file)
    formData.append('refId', `${user.id}`)
    formData.append('field', 'avatar')
    formData.append('ref', 'user')
    formData.append('source', 'users-permissions')

    setIsLoading(true)

    // Get the token from the client api
    const tokenRes = await clientGetApi<{ token: string }>('api/token')

    // Upload the image to the strapi server
    serverPostApi<AvatarUser[]>(
      `upload`,
      formData,
      tokenRes.success ? tokenRes.data.token : ''
    )
      .then(response => {
        setIsLoading(false)

        // Mutate the user avatar data after succeded upload
        const updatedUser = { ...user }
        updatedUser.avatar = response.data[0]

        dispatch(
          openSnackbar('Image uploaded successfully!', SnackbarType.SUCCESS)
        )
        mutate(updatedUser, false)
      })
      .catch((err: AxiosError) => {
        dispatch(openSnackbar(err.message, SnackbarType.ERROR))
      })
  }

  return (
    <Stack
      direction="column"
      sx={{
        mb: theme => theme.spacing(2),
        gap: theme => theme.spacing(2)
      }}
      className={classes.centered}
    >
      <Button component="label" variant="outlined" className={classes.centered}>
        <input type="file" onChange={e => setFile(e.target.files[0])} hidden />
        add avatar
      </Button>
      {file && (
        <Stack width={300} direction="column">
          <Image
            src={URL.createObjectURL(file)}
            unoptimized
            layout="intrinsic"
            width={'100%'}
            objectFit="contain"
            height={200}
            alt="User Avatar"
          />
          <Typography align="center" gutterBottom>
            {file.name}{' '}
            <IconButton onClick={handleCloseUpload}>
              <CloseIcon />
            </IconButton>
          </Typography>
          <Button
            variant="contained"
            className={classes.centered}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'uploading' : 'upload'}
          </Button>
        </Stack>
      )}
    </Stack>
  )
}
