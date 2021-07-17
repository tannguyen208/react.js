import React from 'react'

import {routePaths} from 'src/routes/paths'
import {isGuard} from 'src/utils/isGuard'
import PermissionConst from 'src/constants/permission.const'
import Role from 'src/utils/role'

const configuration = {
  key: routePaths.dashboard.key,
  path: routePaths.dashboard.path,
  authored: true,
  canActivate: () => {
    const ps = Role.getPermissions(PermissionConst['Page.Dashboard'])
    const p = Role.hasPermission(ps[PermissionConst['Page.Dashboard']])

    return isGuard(() => p(Role.View) || p(Role.ViewOwner))
  },
  component: React.lazy(() => import('./components/Dashboard')),
}

export default configuration
