import {IPath} from 'src/models/route.model'

export const routePaths: {[key: string]: IPath} = {
  // root paths
  root: {key: 'RP', path: '/'},
  main: {key: 'RP.Home', path: '/_:home'},

  // main pages
  dashboard: {key: 'RP.Dashboard', path: '/_dashboard'},
  public: {key: 'RP.Public', path: '/_public'},
  private: {key: 'RP.Private', path: '/_private'},
  privateView: {key: 'RP.PrivateView', path: '/_private/view'},
  privateCreate: {key: 'RP.PrivateCreate', path: '/_private/create'},
  privateUpdate: {key: 'RP.PrivateUpdate', path: '/_private/update'},

  // auth paths
  login: {key: 'RP.Login', path: '/_login'},

  // exception paths
  error401: {key: 'RP.NoHaveAccess', path: '/_401'},
  error404: {key: 'RP.PageNotFound', path: '/_404'},
  error500: {key: 'RP.ServerError', path: '/_500'},
}

routePaths.isRoot = (path) => path === '/'
routePaths.isNotFound = (path) => path === '*'
