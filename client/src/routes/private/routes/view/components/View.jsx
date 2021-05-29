import React from 'react'
import Button from 'src/components/button'
import PermissionConst from 'src/constants/permission.const'
import Role from 'src/utils/role'

function View() {
  const pop = Role.getPermissionBy(PermissionConst['Page.Private'])
  const pf = Role.hasPermission(pop)

  return (
    <div className="err-container text-center">
      <h1>View Page</h1>
      <Button disabled={!pf(Role.Download)}>Download</Button>
      <Button disabled={!pf(Role.DownloadOwner)}>Download Owner</Button>
    </div>
  )
}

export default React.memo(View)
