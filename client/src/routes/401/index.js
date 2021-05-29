import React from 'react'
import { IRoute } from 'src/models/route.model'
import { routePaths } from 'src/routes/paths'

const configuration: IRoute = {
  key: routePaths.error401.key,
  path: routePaths.error401.path,
  component: React.lazy(() => import('./components/401')),
}

export default configuration
