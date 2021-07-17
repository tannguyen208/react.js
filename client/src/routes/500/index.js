import React from 'react'

import {routePaths} from 'src/routes/paths'

const configuration = {
  key: routePaths.error500.key,
  path: routePaths.error500.path,
  component: React.lazy(() => import('./components/500')),
}

export default configuration
