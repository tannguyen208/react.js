import React from 'react'
import { IRoute } from 'src/models/route.model'
import { routePaths } from 'src/routes/paths'

const configuration: IRoute = {
  key: routePaths.login.key,
  path: routePaths.login.path,
  component: React.lazy(() => import('./components/Login')),
}

export default configuration
