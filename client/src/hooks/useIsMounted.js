import {useRef, useEffect} from 'react'

export function useIsMounted() {
  const ref = useRef(false)

  useEffect(() => {
    ref.current = true

    return () => {
      ref.current = false
    }
  }, [])

  return ref
}
