import React from 'react'
import {Modal as AntModal} from 'antd'
import classNames from 'classnames'
import './Modal.scss'

function Modal(props) {
  const {className, ...rest} = props

  // customize button here
  const __class = classNames(className, '')

  return <AntModal className={__class} {...rest} />
}

export default Modal
