import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  Theme
} from '@mui/material'
import { makeStyles } from '@mui/styles'

interface Props {
  title: string
  description: string
  avatar: JSX.Element
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    borderRadius: '1rem',
    padding: theme.spacing(2),
    boxShadow: theme.shadows[5]
  },
  header: {
    padding: theme.spacing(4),
    '& *': {
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  cardContent: {
    paddingTop: 0
  },
  cardTitle: {
    paddingBottom: theme.spacing(3)
  }
}))

export const CardItem = ({ title, description, avatar }: Props) => {
  const { card, header, cardContent, cardTitle } = useStyles()
  return (
    <Grid item xs={10} sm={5} md={4} lg={3}>
      <Card className={card}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <CardHeader avatar={avatar} className={header} />
        </Box>
        <CardContent className={cardContent}>
          <Typography
            component="h3"
            variant="h6"
            align="center"
            sx={{ color: 'primary.main' }}
            className={cardTitle}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
