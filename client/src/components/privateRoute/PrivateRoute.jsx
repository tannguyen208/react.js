import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { IRoute } from 'src/models/route.model'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'src/hooks/useRouter'
import { routePaths } from 'src/routes/paths'

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth()
  const router = useRouter()

  const renderRoute = React.useCallback(
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

PrivateRoute.propTypes = {
  route: PropTypes.shape(IRoute),
}

export default React.memo(PrivateRoute)
