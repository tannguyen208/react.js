/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react'
import {Prompt} from 'react-router-dom'
import Button from 'src/components/button'
import Modal from 'src/components/modal'

function RouteLeavingGuard(props) {
  const {navigate, when, shouldBlockNavigation} = props
  const [visible, setVisible] = useState(false)
  const [lastLocation, setLastLocation] = useState()
  const [confirmedNavigation, setConfirmedNavigation] = useState(false)

  const showModal = (location) => {
    setVisible(true)
    setLastLocation(location)
  }

  const closeModal = (cb) => {
    setVisible(false)
    if (cb) {
      cb()
    }
  }

  const handleBlockedNavigation = (nextLocation) => {
    if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
      showModal(nextLocation)
      return false
    }
    return true
  }

  const onOk = () => {
    closeModal(() => {
      if (lastLocation) {
        setConfirmedNavigation(true)
      }
    })
  }

  const onCancel = () => {
    closeModal()
  }

  useEffect(() => {
    if (confirmedNavigation) {
      navigate(lastLocation.pathname)
      setConfirmedNavigation(false)
    }
  }, [confirmedNavigation])

  return (
    <>
      <Prompt when={when} message={handleBlockedNavigation} />
      <Modal
        visible={visible}
        title="Sure?"
        onOk={onOk}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="link" type="primary" onClick={onOk}>
            Continue
          </Button>,
        ]}
      >
        <p>Are you sure? :D</p>
      </Modal>
    </>
  )
}

export default RouteLeavingGuard
