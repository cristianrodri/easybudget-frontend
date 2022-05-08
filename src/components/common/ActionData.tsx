import { IconButton, Tooltip } from '@mui/material'
import { MouseEventHandler } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { makeStyles } from '@mui/styles'
import { textCapitalize } from '@utils/string'

interface Props {
  actionType: 'delete' | 'edit'
  handleClick: MouseEventHandler<HTMLButtonElement>
  color?: string
}

const useStyles = makeStyles(() => ({
  icon: {
    padding: 0,
    opacity: '0.5',
    transition: 'opacity 0.3s',
    '&:hover': {
      opacity: '1',
      backgroundColor: 'transparent'
    }
  }
}))

export const ActionData = ({ actionType, handleClick, color }: Props) => {
  const classes = useStyles()
  return (
    <Tooltip title={textCapitalize(actionType)} arrow>
      <IconButton
        aria-label={actionType}
        onClick={handleClick}
        className={classes.icon}
        style={{ color }}
      >
        {actionType === 'delete' ? <DeleteIcon /> : <EditIcon />}
      </IconButton>
    </Tooltip>
  )
}
