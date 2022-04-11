import { Skeleton, Stack } from '@mui/material'

const Rectangular = ({ width }: { width: number | string }) => (
  <Skeleton
    variant="rectangular"
    width={width}
    height={20}
    sx={{ borderRadius: 1 }}
  />
)

export const Loading = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Skeleton variant="circular" width={10} height={10} />
      <Stack flexGrow={1} spacing={1}>
        <Rectangular width={'100%'} />
        <Rectangular width={80} />
      </Stack>
    </Stack>
  )
}
