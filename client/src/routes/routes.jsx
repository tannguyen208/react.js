import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Preloader from 'src/components/preloader'
import PrivateRoute from 'src/components/privateRoute'
import omit from 'lodash/omit'
import {routePaths} from './paths'

const routes = [
  {
    key: routePaths.root.key,
    path: routePaths.root.path,
    redirectTo: routePaths.dashboard.path,
  },
  {
    key: routePaths.main.key,
    path: routePaths.main.path,
    component: React.lazy(() => import('../container/App')),
    redirectTo: routePaths.dashboard.path,
    childRoutes: [
      require('./dashboard').default,
      require('./public').default,
      require('./private').default,
      require('./login').default,
      require('./401').default,
      require('./404').default,
      require('./500').default,
      {
        key: routePaths.error404.key,
        path: '*',
        redirectTo: routePaths.error404.path,
      },
    ],
  },
  {
    key: routePaths.error404.key,
    path: '*',
    redirectTo: routePaths.error404.path,
  },
]

function AppRouter() {
  const RenderRoute = React.useCallback((route) => {
    const {
      key,
      path,
      exact,
      redirectTo,
      childRoutes,
      authored,
      canActivate,
      preloader: Fallback = Preloader,
      component: Component,
    } = route
    const RouteParser = authored || canActivate ? PrivateRoute : Route
    const routeParserProps = omit(route, [
      'exact',
      'preloader',
      'component',
      'childRoutes',
    ])

    // checking is root or * route
    const pathIs = routePaths.isRoot(path) || routePaths.isNotFound(path)
    if (pathIs && redirectTo) {
      return (
        <RouteParser exact={routePaths.isRoot(path)} {...routeParserProps}>
          <Redirect to={redirectTo} />
        </RouteParser>
      )
    }

    // child route
    return (
      <RouteParser {...routeParserProps}>
        <React.Suspense fallback={<Fallback by={`Route:: ${key}`} />}>
          <Component>
            <If condition={childRoutes && childRoutes.length > 0}>
              <Switch>
                <If condition={exact && redirectTo}>
                  <Redirect exact from={path} to={redirectTo} />
                </If>
                {childRoutes.map(RenderRoute)}
              </Switch>
            </If>
          </Component>
        </React.Suspense>
      </RouteParser>
    )
  }, [])

  return <Switch>{routes.map(RenderRoute)}</Switch>
}

export default React.memo(AppRouter)
