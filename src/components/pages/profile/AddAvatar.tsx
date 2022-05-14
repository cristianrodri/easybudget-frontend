import { useState } from 'react'
import Image from 'next/image'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  centered: {
    alignSelf: 'center'
  }
}))

export const AddAvatar = () => {
  const classes = useStyles()
  const [file, setFile] = useState<File>(null)

  const handleCloseUpload = () => {
    setFile(null)
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
          <Button variant="contained" className={classes.centered}>
            upload
          </Button>
        </Stack>
      )}
    </Stack>
  )
}
