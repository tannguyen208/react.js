import React from 'react'
import {routePaths} from 'src/routes/paths'

const configuration = {
  key: routePaths.public.key,
  path: routePaths.public.path,
  component: React.lazy(() => import('./components/Public')),
}

export default configuration
