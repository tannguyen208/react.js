import React from 'react'
import {Button as AntButton} from 'antd'
import classNames from 'classnames'
import './Button.scss'

function Button(props) {
  const {className, ...rest} = props

  // customize button here
  const __class = classNames(className, '')

  return <AntButton className={__class} {...rest} />
}

export default Button
