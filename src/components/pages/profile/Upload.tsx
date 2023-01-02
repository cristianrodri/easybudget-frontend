import { Dispatch, SetStateAction, useContext, useState } from 'react'
import Image from 'next/image'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { makeStyles } from '@mui/styles'
import { clientPostApi } from '@config/api_client'
import { openSnackbar } from '@context/actions'
import { SnackbarType } from '@utils/enums'
import { Context } from '@context/GlobalContext'
import { useUserAvatar } from '@hooks/useSWRAvatar'
import { UploadApiResponse } from 'cloudinary'

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
  const { mutate } = useUserAvatar()
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
    formData.append('avatar', file)

    setIsLoading(true)

    // Add the params only when the component is used to update an avatar

    // Upload the image to the strapi server
    try {
      const res = await clientPostApi('api/avatar/add', formData)

      setIsLoading(false)

      if (res.success === false) {
        dispatch(openSnackbar(res.message, SnackbarType.ERROR))

        return
      }

      // If the response is an array, it means that the file was created on the strapi server. Otherwise, the file was updated and just received the avatar data
      const updatedAvatar = res.data as UploadApiResponse

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
      mutate(updatedAvatar, false)
    } catch (error) {}
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
        <Stack width={300} direction="column" alignItems="center">
          <Image
            src={URL.createObjectURL(file)}
            unoptimized
            width={250}
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
