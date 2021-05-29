import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

function SEO({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="theme-color" content="#E6E6FA" />
      <meta name="description" content="Admin page of JhinStore" />
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string,
}

SEO.defaultProps = {
  title: process.env.PROJECT_NAME_DISPLAY,
}

export default SEO
