import React from 'react'
import { Alert, AlertTitle, Box } from '@mui/material'
import Link from 'next/link'

export const AlertCategory = () => {
  return (
    <Alert
      severity="warning"
      color="error"
      sx={{
        my: theme => theme.spacing(2),
        width: '50%',
        alignSelf: 'center'
      }}
      variant="outlined"
    >
      <AlertTitle>
        At least one category is needed for adding budgets
      </AlertTitle>
      You can add categories —{' '}
      <Link href="categories">
        <Box component="span" sx={{ color: 'inherit' }}>
          <strong>Here</strong>
        </Box>
      </Link>
    </Alert>
  )
}
