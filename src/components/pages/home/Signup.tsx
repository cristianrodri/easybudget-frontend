import { Button, Box, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Link from 'next/link'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    borderRadius: (theme.shape.borderRadius as number) * 10,
    padding: theme.spacing(1.2, 3.5),
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: 1.5,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light)
    }
  }
}))

export const Signup = () => {
  const { root } = useStyles()
  return (
    <Link href="/signup" passHref>
      <Box component={Button} pt={3}>
        <Button variant="contained" className={root}>
          Get started for free
        </Button>
      </Box>
    </Link>
  )
}
