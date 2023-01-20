import { PageTitle } from '@components/common/PageTitle'
import { LayoutAuth } from '@components/LayoutAuth'
import { PrivacyActions } from '@components/pages/privacy/Actions'

const Privacy = () => {
  return (
    <LayoutAuth title="Privacy">
      <PageTitle name="Privacy" variant="h5" />
      <PrivacyActions />
    </LayoutAuth>
  )
}

export default Privacy
