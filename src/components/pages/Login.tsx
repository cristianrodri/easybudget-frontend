import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.common.white,
    borderColor: 'currentColor'
  }
}))

export const Login = () => {
  const { root } = useStyles()
  return (
    <Button variant="outlined" className={root}>
      Login
    </Button>
  )
}
