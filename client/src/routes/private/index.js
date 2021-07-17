import React from 'react'
import {routePaths} from 'src/routes/paths'

const configuration = {
  key: routePaths.private.key,
  path: routePaths.private.path,
  exact: true,
  redirectTo: routePaths.privateView.path,
  component: React.lazy(() => import('./components/Private')),
  childRoutes: [
    require('./routes/view').default,
    require('./routes/create').default,
    require('./routes/update').default,
  ],
}

export default configuration
