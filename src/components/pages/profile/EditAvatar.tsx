import { ChangeEvent, useContext, useState } from 'react'
import Image from 'next/image'
import { Button, Stack } from '@mui/material'
import { DialogAvatarDeletion } from './DialogAvatarDeletion'
import { clientDeleteApi } from '@config/api_client'
import { Context } from '@context/GlobalContext'
import { openSnackbar } from '@context/actions'
import { SnackbarType } from '@utils/enums'
import { Upload } from './Upload'
import { useUserAvatar } from '@hooks/useSWRAvatar'
import { UploadApiResponse } from 'cloudinary'

interface Props {
  avatar: UploadApiResponse
}

export const EditAvatar = ({ avatar }: Props) => {
  const { dispatch } = useContext(Context)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { mutate, data } = useUserAvatar(avatar)
  const [isUpdate, setIsUpdate] = useState(false)
  const [file, setFile] = useState<File>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const avatarUrl = data?.secure_url

  const openDialog = () => {
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
  }

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0])
    setIsUpdate(true)
  }

  const handleDelete = async () => {
    closeDialog()
    setIsDeleting(true)

    const res = await clientDeleteApi(`api/avatar/delete`)

    if (res.success === true) {
      dispatch(
        openSnackbar('Avatar deleted successfully!', SnackbarType.SUCCESS)
      )
      setIsDeleting(false)

      // Remove the avatar
      mutate(undefined, false)
    } else {
      dispatch(openSnackbar(res.message, SnackbarType.ERROR))
    }
  }

  if (isUpdate)
    return <Upload type="update" setIsUpdate={setIsUpdate} file={file} />

  return (
    <>
      <Stack direction="row" justifyContent="center">
        <Stack direction="column" alignItems="center">
          <Image
            src={avatarUrl}
            priority
            width={250}
            height={200}
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
            <Button
              component="label"
              variant="outlined"
              color="info"
              disabled={isDeleting}
            >
              update
              <input type="file" hidden onChange={handleUpdate} />
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={openDialog}
              disabled={isDeleting}
            >
              {isDeleting ? 'deleting' : 'delete'}
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <DialogAvatarDeletion
        dialogOpen={dialogOpen}
        closeDialog={closeDialog}
        handleDelete={handleDelete}
      />
    </>
  )
}
