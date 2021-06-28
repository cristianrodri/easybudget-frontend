import { Button, Box, makeStyles } from '@material-ui/core'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.getContrastText(theme.palette.grey[200]),
    borderRadius: theme.shape.borderRadius * 10,
    padding: theme.spacing(1.2, 3.5),
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: 1.5,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.getContrastText(theme.palette.primary.dark)
    }
  }
}))

export const Signup = () => {
  const { root } = useStyles()
  return (
    <Link href="/signup" passHref>
      <Box clone pt={3}>
        <Button variant="contained" className={root}>
          Get started for free
        </Button>
      </Box>
    </Link>
  )
}
