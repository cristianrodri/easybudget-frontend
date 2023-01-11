import { PageTitle } from '@components/common/PageTitle'
import { LayoutAuth } from '@components/LayoutAuth'
import { UpdatePassword } from '@components/pages/privacy/UpdatePassword'

const Privacy = () => {
  return (
    <LayoutAuth title="Privacy">
      <PageTitle name="Privacy" variant="h5" />
      <UpdatePassword />
    </LayoutAuth>
  )
}

export default Privacy
