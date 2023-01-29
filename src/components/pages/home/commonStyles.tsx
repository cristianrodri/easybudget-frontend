import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1.2, 3.5),
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    ['@media (max-width: 450px)']: {
      width: '100%'
    }
  }
}))
