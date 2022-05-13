import { Typography } from '@mui/material'

interface Props {
  name: string
}

export const Title = ({ name }: Props) => {
  return (
    <Typography component="h1" variant="h5" align="center" gutterBottom>
      {name}
    </Typography>
  )
}
