import { FC } from 'react'
import Link from 'next/link'
import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

interface Props {
  href: string
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark
    }
  }
}))

export const FormLink: FC<Props> = ({ href, children }) => {
  const { link } = useStyles()

  return (
    <Link href={href}>
      <a className={link}>{children}</a>
    </Link>
  )
}
