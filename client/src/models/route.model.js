export class IPath {
  key: string
  path: string
}

export class IRoute {
  key: string
  path: string
  exact: boolean
  redirectTo: string
  component: JSX.Element
  preloader: JSX.Element
  childRoutes: IRoute[]
  authored: boolean // for check isLogin, ...
  canActivate: () => boolean // for check permission, ...
}
