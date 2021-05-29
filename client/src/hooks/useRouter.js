import { useMemo } from 'react'
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
  generatePath,
} from 'react-router-dom'
import Qs from 'query-string'

const queryConfig = {
  sort: true,
  skipNull: true,
  skipEmptyString: true,
  arrayFormatSeparator: '|',
  arrayFormat: 'separator',
}

// Hook
export function useRouter() {
  const params = useParams()
  const location = useLocation()
  const history = useHistory()
  const match = useRouteMatch()

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      // override query-string functions
      // docs: https://www.npmjs.com/package/query-string
      stringify: function (obj: Qs.UrlObject) {
        return Qs.stringify(obj, queryConfig)
      },
      // override react-router functions
      // docs: https://reactrouter.com/web/api/generatePath
      generatePath,
      // For convenience add push(), replace(), pathname at top level
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      query: {
        ...Qs.parse(location.search, queryConfig), // Convert string to object
        ...params,
      },
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      match,
      location,
      history,
    }
  }, [params, match, location, history])
}
