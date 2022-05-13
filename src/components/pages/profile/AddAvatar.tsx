import { useState } from 'react'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export const AddAvatar = () => {
  const [file, setFile] = useState<File>(null)

  const handleCloseUpload = () => {
    setFile(null)
  }

  return (
    <Stack
      direction="column"
      sx={{
        alignSelf: 'center',
        mb: theme => theme.spacing(2),
        gap: theme => theme.spacing(2)
      }}
    >
      <Button component="label" variant="outlined">
        <input type="file" onChange={e => setFile(e.target.files[0])} hidden />
        add avatar
      </Button>
      {file && (
        <Stack>
          <Typography>
            {file.name}{' '}
            <IconButton onClick={handleCloseUpload}>
              <CloseIcon />
            </IconButton>
          </Typography>
          <Button variant="contained">upload</Button>
        </Stack>
      )}
    </Stack>
  )
}
