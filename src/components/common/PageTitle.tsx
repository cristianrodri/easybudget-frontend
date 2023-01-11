import { Typography, TypographyVariant } from '@mui/material'

interface Props {
  name: string
  variant?: TypographyVariant
}

export const PageTitle = ({ name, variant = 'h5' }: Props) => {
  return (
    <Typography component="h1" variant={variant} align="center" gutterBottom>
      {name}
    </Typography>
  )
}
