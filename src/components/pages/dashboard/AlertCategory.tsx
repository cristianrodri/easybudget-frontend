import React from 'react'
import { Alert, AlertTitle, Box } from '@mui/material'
import Link from 'next/link'

export const AlertCategory = () => {
  return (
    <Alert
      severity="warning"
      color="error"
      sx={{
        mt: theme => theme.spacing(2),
        width: '50%',
        alignSelf: 'center'
      }}
      variant="outlined"
    >
      <AlertTitle>
        At least one category is needed for adding budgets
      </AlertTitle>
      You can add categories —{' '}
      <Link href="categories" passHref>
        <Box component="a" sx={{ color: 'inherit' }}>
          <strong>Here</strong>
        </Box>
      </Link>
    </Alert>
  )
}
