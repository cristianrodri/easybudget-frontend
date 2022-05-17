import { Dispatch, SetStateAction, useContext, useState } from 'react'
import Image from 'next/image'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { makeStyles } from '@mui/styles'
import { useUserData } from '@hooks/useSWRUser'
import { AvatarUser, StrapiErrorResponse } from '@custom-types'
import { clientGetApi } from '@config/api_client'
import { serverPostApi } from '@config/api_server'
import { openSnackbar } from '@context/actions'
import { SnackbarType, Status } from '@utils/enums'
import { Context } from '@context/GlobalContext'

type Props =
  | { type: 'add' }
  | {
      type: 'update'
      setIsUpdate: Dispatch<SetStateAction<boolean>>
      file: File
    }

const useStyles = makeStyles(() => ({
  centered: {
    alignSelf: 'center'
  }
}))

export const Upload = (props: Props) => {
  const { type } = props
  const classes = useStyles()
  const { dispatch } = useContext(Context)
  const { data: user, mutate } = useUserData()
  const [file, setFile] = useState<File>(
    props.type === 'update' ? props.file : null
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleCloseUpload = () => {
    setFile(null)

    // Back to original avatar component if the close uploading comes from EditAvatar
    if (props.type === 'update') {
      props.setIsUpdate(false)
    }
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

    // Add the params only when the component is used to update an avatar
    const params = type === 'update' ? `?id=${user.avatar.id}` : ''

    // Upload the image to the strapi server
    serverPostApi<AvatarUser[] | StrapiErrorResponse>(
      `upload${params}`,
      formData,
      tokenRes.success ? tokenRes.data.token : '',
      // By adding validationStatus, the custom error messages provided by strapi will be received by resolve promise
      { validateStatus: status => status < 600 }
    ).then(res => {
      setIsLoading(false)

      if (res.status === Status.BAD_REQUEST) {
        const errorResponse = res.data as StrapiErrorResponse

        dispatch(
          openSnackbar(errorResponse.data.errors[0].message, SnackbarType.ERROR)
        )

        return
      }

      // Mutate the user avatar data after succeded upload
      const updatedUser = { ...user }
      updatedUser.avatar = (res.data as AvatarUser[])[0]

      // Unmount the Upload component after a image is successfully uploaded by changing parent state to false
      if (props.type === 'update') {
        props.setIsUpdate(false)
      }

      dispatch(
        openSnackbar(
          `Avatar ${type === 'update' ? 'updated' : 'added'} successfully!`,
          SnackbarType.SUCCESS
        )
      )
      mutate(updatedUser, false)
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
        {type} avatar
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
