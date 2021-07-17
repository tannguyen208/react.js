import React, {useCallback} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from 'src/hooks/useAuth'
import {useRouter} from 'src/hooks/useRouter'
import {routePaths} from 'src/routes/paths'

function PrivateRoute({children, ...rest}) {
  const auth = useAuth()
  const router = useRouter()

  const renderRoute = useCallback(
    (widget) => <Route {...rest}>{widget}</Route>,
    [rest]
  )

  // checking is logged
  if (!auth.isAuthenticated()) {
    return renderRoute(
      <Redirect
        to={{
          pathname: routePaths.login.path,
          state: router.location,
        }}
      />
    )
  }

  // checking has permission
  if (rest.canActivate && !rest.canActivate()) {
    return renderRoute(
      <Redirect
        to={{
          pathname: routePaths.error401.path,
          state: router.location,
        }}
      />
    )
  }

  return renderRoute(children)
}

export default React.memo(PrivateRoute)
