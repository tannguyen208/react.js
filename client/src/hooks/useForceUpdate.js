import {useCallback, useState} from 'react'

export default function useForceUpdate() {
  const [, force] = useState(Object.create(null))

  // Turn force(required_parameter) into dispatch().
  const memoizedDispatch = useCallback(() => {
    // force update using with callback memoized function
    force(Object.create(null))
  }, [force])

  return memoizedDispatch
}
