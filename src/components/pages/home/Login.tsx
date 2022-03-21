import { Button, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Link from 'next/link'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.getContrastText(theme.palette.common.white),
    borderRadius: (theme.shape.borderRadius as number) * 4,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light)
    }
  }
}))

export const Login = () => {
  const { root } = useStyles()
  return (
    <Link href="/login" passHref>
      <Button variant="contained" className={root}>
        Login
      </Button>
    </Link>
  )
}
