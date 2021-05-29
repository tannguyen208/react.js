import React from 'react'
import PropTypes from 'prop-types'
import { __DEV__ } from 'src/utils/isEnv'

function Preloader({ by }) {
  if (__DEV__) {
    console.log('Preloader render by: ', by)
  }

  return (
    <div className="c-preloader-wrapper">
      <div className="c-preloader"></div>
      <div className="c-preloader"></div>
      <div className="c-preloader"></div>
      <div className="c-preloader"></div>
    </div>
  )
}

Preloader.propTypes = {
  by: PropTypes.string.isRequired,
}

export default Preloader
