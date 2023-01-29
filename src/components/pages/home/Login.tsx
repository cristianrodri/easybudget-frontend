import { Button } from '@mui/material'
import Link from 'next/link'
import { useStyles } from './commonStyles'

export const Login = () => {
  const { root } = useStyles()

  return (
    <Link href="/login" passHref>
      <Button
        variant="contained"
        className={root}
        sx={{
          width: 200,
          backgroundColor: theme => theme.palette.common.white,
          color: theme =>
            theme.palette.getContrastText(theme.palette.common.white),
          borderRadius: theme => (theme.shape.borderRadius as number) * 4
        }}
      >
        Login
      </Button>
    </Link>
  )
}
