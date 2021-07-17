import React from 'react'
import PropTypes from 'prop-types'
import {__DEV__} from 'src/utils/isEnv'

function Preloader({by}) {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log('Preloader render by: ', by)
  }

  return (
    <div className="c-preloader-wrapper">
      <div className="c-preloader" />
      <div className="c-preloader" />
      <div className="c-preloader" />
      <div className="c-preloader" />
    </div>
  )
}

Preloader.propTypes = {
  by: PropTypes.string.isRequired,
}

export default Preloader
