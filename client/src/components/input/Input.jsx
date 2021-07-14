import React from 'react'
import {Input as AntInput} from 'antd'
import classNames from 'classnames'
import './Input.scss'

function Input(props) {
  const {className, ...rest} = props

  // customize button here
  const __class = classNames(className, '')

  return <AntInput className={__class} {...rest} />
}

export default Input
