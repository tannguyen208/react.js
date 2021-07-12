import {useRef, useEffect} from 'react'

export function useIsMounted() {
  const _ref = useRef(false)

  useEffect(() => {
    _ref.current = true

    return () => (_ref.current = false)
  }, [])

  return _ref
}
