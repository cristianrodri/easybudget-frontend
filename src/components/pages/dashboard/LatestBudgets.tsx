import { Box, Stack, Typography } from '@mui/material'

const LatestBudgets = () => {
  return (
    <Stack
      width={350}
      sx={{ backgroundColor: theme => theme.palette.grey[200] }}
      alignSelf="baseline"
    >
      <Typography component="h3" variant="h6" align="center" gutterBottom>
        Latest Budgets
      </Typography>
      {/* Budgets Container */}
      <Stack px={4} py={2} spacing={2}>
        <Stack direction="row" spacing={2}>
          <Stack color="success.main">{'+'}</Stack>
          <Stack flexGrow={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={2}
              fontWeight={theme => theme.typography.fontWeightRegular}
              color="success.main"
            >
              <Box
                component="span"
                sx={{ '&::first-letter': { textTransform: 'uppercase' } }}
              >
                salary
              </Box>
              <Box component="span">$ 1.000.000</Box>
            </Stack>
            <Typography
              component="span"
              variant="caption"
              color="success.light"
            >
              28 March
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack color="error.main">{'-'}</Stack>
          <Stack flexGrow={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              fontWeight={theme => theme.typography.fontWeightRegular}
              color="error.main"
            >
              <Box
                component="span"
                sx={{ '&::first-letter': { textTransform: 'uppercase' } }}
              >
                propina
              </Box>
              <Box component="span">$ 1.000</Box>
            </Stack>
            <Typography component="span" variant="caption" color="error.light">
              28 March
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default LatestBudgets
