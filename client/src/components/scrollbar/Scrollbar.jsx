import React, {useRef, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'perfect-scrollbar'
import classNames from 'classnames'
import isEqual from 'lodash/isEqual'
import {useIsMounted} from 'src/hooks/useIsMounted'
import './Scrollbar.scss'

const events = {
  'ps-scroll-y': 'onScrollY',
  'ps-scroll-x': 'onScrollX',
  'ps-scroll-up': 'onScrollUp',
  'ps-scroll-down': 'onScrollDown',
  'ps-scroll-left': 'onScrollLeft',
  'ps-scroll-right': 'onScrollRight',
  'ps-y-reach-start': 'onYReachStart',
  'ps-y-reach-end': 'onYReachEnd',
  'ps-x-reach-start': 'onXReachStart',
  'ps-x-reach-end': 'onXReachEnd',
}

Object.freeze(events)

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  options: PropTypes.object,
  onScrollX: PropTypes.func,
  onScrollY: PropTypes.func,
  onScrollUp: PropTypes.func,
  onScrollDown: PropTypes.func,
  onScrollLeft: PropTypes.func,
  onScrollRight: PropTypes.func,
  onYReachStart: PropTypes.func,
  onYReachEnd: PropTypes.func,
  onXReachStart: PropTypes.func,
  onXReachEnd: PropTypes.func,
  onSync: PropTypes.func,
  component: PropTypes.string,
}

const defaultProps = {
  className: '',
  style: undefined,
  options: undefined,
  onScrollX: undefined,
  onScrollY: undefined,
  onScrollUp: undefined,
  onScrollDown: undefined,
  onScrollLeft: undefined,
  onScrollRight: undefined,
  onYReachStart: undefined,
  onYReachEnd: undefined,
  onXReachStart: undefined,
  onXReachEnd: undefined,
  onSync: (ps) => ps.update(),
  component: 'div',
}

function Scrollbar(props) {
  const {
    className,
    style,
    options,
    onScrollY,
    onScrollX,
    onScrollUp,
    onScrollDown,
    onScrollLeft,
    onScrollRight,
    onYReachStart,
    onYReachEnd,
    onXReachStart,
    onXReachEnd,
    onSync,
    children,
    component: Comp,
    ...remainProps
  } = props

  const containerRef = useRef(null)
  const scrollbarRef = useRef(null)
  const handlerByEvent = useRef({})
  const isMounted = useIsMounted()

  useEffect(() => {
    if (isMounted.current) {
      scrollbarRef.current = new PerfectScrollbar(containerRef.current, {
        wheelSpeed: 2,
        wheelPropagation: false,
        ...options,
      })
    }

    return () => {
      Object.keys(handlerByEvent.current).forEach((key) => {
        const value = handlerByEvent.current[key]

        if (value) {
          scrollbarRef.current.removeEventListener(key, value, false)
        }
      })
      handlerByEvent.current = {}
      scrollbarRef.current.destroy()
      scrollbarRef.current = null
    }
  }, [isMounted])

  useEffect(() => {
    updateEvent(props)

    updateScroll()
    updateUI()
  })

  const updateEvent = useCallback((prevProps = {}) => {
    Object.keys(events).forEach((key) => {
      const callback = props[events[key]]
      const prevCallback = prevProps[events[key]]
      if (callback !== prevCallback) {
        if (prevCallback) {
          const prevHandler = handlerByEvent.current[key]
          containerRef.current.removeEventListener(key, prevHandler, false)
          handlerByEvent.current[key] = null
        }
        if (callback) {
          const handler = () => callback(containerRef.current)
          containerRef.current.addEventListener(key, handler, false)
          handlerByEvent.current[key] = handler
        }
      }
    })
  }, [])

  const updateUI = useCallback(() => {
    const psClassNames = containerRef.current.className
      .split(' ')
      .filter((name) => name.match(/^ps([-_].+|)$/))
      .join(' ')

    containerRef.current.className = classNames(
      'scrollbar-container',
      psClassNames
    )
  }, [])

  const updateScroll = useCallback(() => {
    onSync(scrollbarRef.current)
  }, [onSync])

  return (
    <Comp style={style} ref={containerRef} {...remainProps}>
      {children}
    </Comp>
  )
}

Scrollbar.propTypes = propTypes
Scrollbar.defaultProps = defaultProps

export default React.memo(Scrollbar, isEqual)
