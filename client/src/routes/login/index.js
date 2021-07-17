import React from 'react'
import {routePaths} from 'src/routes/paths'

const configuration = {
  key: routePaths.login.key,
  path: routePaths.login.path,
  component: React.lazy(() => import('./components/Login')),
}

export default configuration
