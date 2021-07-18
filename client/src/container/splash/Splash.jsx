import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Preloader from 'src/components/preloader'
import {useTheme} from 'src/hooks/useTheme'
import {isGuard} from 'src/utils/isGuard'
import AccountApi from 'src/api/account.api'
import Role from 'src/utils/role'
import './Splash.scss'

function Splash(props) {
  const {setDone} = props
  const [logged, setLogged] = useState(false)
  const {themeLoaded, fetchThemes} = useTheme()
  // using for check deeps useEffect & update if all values are true
  const doneDeeps = [
    logged, // checking user is logged in
    themeLoaded, // checking themes loaded
  ]

  useEffect(() => {
    fetchThemes()
  }, [])

  useEffect(() => {
    const checkRole = async () => {
      const {data} = await AccountApi.checkSignIn()
      if (data.account.username) {
        // set roles
        Role.setRoles(data.account.roles)
        Role.setPermissions(data.account.permissions)
      }

      setLogged(true)
    }

    checkRole()
  }, [])

  /**
   * Check all done then force update,
   * Just forceUpdate when doneDeeps are true
   *
   * @run {useEffect}
   */
  useEffect(() => {
    if (isGuard(...doneDeeps)) {
      setDone(true)
    }
  }, doneDeeps)

  return <Preloader by="Splash" />
}

Splash.propTypes = {
  setDone: PropTypes.func.isRequired,
}

export default React.memo(Splash)
