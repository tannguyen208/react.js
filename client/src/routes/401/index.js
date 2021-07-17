import React from 'react'

import {routePaths} from 'src/routes/paths'

const configuration = {
  key: routePaths.error401.key,
  path: routePaths.error401.path,
  component: React.lazy(() => import('./components/401')),
}

export default configuration
