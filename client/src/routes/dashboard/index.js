import React from 'react'
import {IRoute} from 'src/models/route.model'
import {routePaths} from 'src/routes/paths'
import {isGuard} from 'src/utils/isGuard'
import PermissionConst from 'src/constants/permission.const'
import Role from 'src/utils/role'

const configuration: IRoute = {
  key: routePaths.dashboard.key,
  path: routePaths.dashboard.path,
  authored: true,
  canActivate: () => {
    const ps = Role.getPermissions(PermissionConst['Page.Dashboard'])
    const p = Role.hasPermission(ps[PermissionConst['Page.Dashboard']])

    return isGuard(() => {
      return p(Role.View) || p(Role.ViewOwner)
    })
  },
  component: React.lazy(() => import('./components/Dashboard')),
}

export default configuration
