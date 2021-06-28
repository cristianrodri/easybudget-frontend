import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid
} from '@material-ui/core'

interface Props {
  title: string
  description: string
  avatar: JSX.Element
}

export const CardItem = ({ title, description, avatar }: Props) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardHeader avatar={avatar} />
        <CardContent>
          <Typography>{title}</Typography>
          <Typography>{description}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
