import React from 'react'
import {IRoute} from 'src/models/route.model'
import {routePaths} from 'src/routes/paths'

const configuration: IRoute = {
  key: routePaths.public.key,
  path: routePaths.public.path,
  component: React.lazy(() => import('./components/Public')),
}

export default configuration
