import React from 'react'
import {routePaths} from 'src/routes/paths'
import {isGuard} from 'src/utils/isGuard'
import PermissionConst from 'src/constants/permission.const'
import Role from 'src/utils/role'

const configuration = {
  key: routePaths.privateCreate.key,
  path: routePaths.privateCreate.path,
  authored: true,
  canActivate: () => {
    const pop = Role.getPermissionBy(PermissionConst['Page.Private'])
    const pf = Role.hasPermission(pop)

    return isGuard(() => pf(Role.Create))
  },
  component: React.lazy(() => import('./components/Create')),
}

export default configuration
