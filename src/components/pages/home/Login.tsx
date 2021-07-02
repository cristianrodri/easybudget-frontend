import { Button, makeStyles } from '@material-ui/core'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.getContrastText(theme.palette.common.white),
    borderRadius: theme.shape.borderRadius * 4,
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
