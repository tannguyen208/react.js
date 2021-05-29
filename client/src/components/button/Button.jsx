import React from 'react'
import AButton from 'antd/lib/button'
import classNames from 'classnames'
import './Button.scss'

function Button(props) {
  const { className, ...rest } = props

  // customize button here
  const __class = classNames(className, '')

  return <AButton className={__class} {...rest} />
}

export default Button
