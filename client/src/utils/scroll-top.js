import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

/**
 * @param {object} props
 */
function ScrollToTop(props) {
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return props.children
}

export default withRouter(ScrollToTop)
