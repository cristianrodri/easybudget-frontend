import { Button } from '@mui/material'
import Link from 'next/link'
import { useStyles } from './commonStyles'

export const Signup = () => {
  const { root } = useStyles()

  return (
    <Link href="/signup" passHref>
      <Button
        variant="contained"
        className={root}
        sx={{
          width: 280,
          fontWeight: theme => theme.typography.fontWeightBold,
          backgroundColor: theme => theme.palette.primary.dark,
          color: theme =>
            theme.palette.getContrastText(theme.palette.primary.dark),
          borderRadius: theme => (theme.shape.borderRadius as number) * 10
        }}
      >
        Get started for free
      </Button>
    </Link>
  )
}
