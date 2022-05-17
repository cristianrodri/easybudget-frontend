import { ChangeEvent, useContext, useState } from 'react'
import Image from 'next/image'
import { Button, Stack } from '@mui/material'
import { SERVER_URL } from '@config/url'
import { AvatarUser } from '@custom-types'
import { DialogAvatarDeletion } from './DialogAvatarDeletion'
import { clientDeleteApi } from '@config/api_client'
import { useUserData } from '@hooks/useSWRUser'
import { Context } from '@context/GlobalContext'
import { openSnackbar } from '@context/actions'
import { SnackbarType } from '@utils/enums'
import { Upload } from './Upload'

interface Props {
  avatar: AvatarUser
}

export const EditAvatar = ({ avatar }: Props) => {
  const { dispatch } = useContext(Context)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { data, mutate } = useUserData()
  const [isUpdate, setIsUpdate] = useState(false)
  const [file, setFile] = useState<File>(null)
  const [isDeleting, setIsDeleting] = useState(false)

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

    const res = await clientDeleteApi(`api/avatar/delete/${avatar.id}`)

    if (res.success === true) {
      dispatch(
        openSnackbar('Avatar deleted successfully!', SnackbarType.SUCCESS)
      )
      setIsDeleting(false)

      // Remove the avatar
      const mutatedData = { ...data }
      mutatedData.avatar = null

      mutate(mutatedData, false)
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
              {isDeleting ? 'deleting' : 'deleted'}
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
