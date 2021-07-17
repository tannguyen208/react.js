import React from 'react'

import {routePaths} from 'src/routes/paths'

const configuration = {
  key: routePaths.error404.key,
  path: routePaths.error404.path,
  component: React.lazy(() => import('./components/404')),
}

export default configuration
