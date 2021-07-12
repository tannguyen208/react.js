import React from 'react'
import {IRoute} from 'src/models/route.model'
import {routePaths} from 'src/routes/paths'

const configuration: IRoute = {
  key: routePaths.error500.key,
  path: routePaths.error500.path,
  component: React.lazy(() => import('./components/500')),
}

export default configuration
