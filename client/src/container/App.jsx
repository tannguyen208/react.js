import React, {useState, useEffect} from 'react'
import isEqual from 'lodash/isEqual'
import {useTheme} from 'src/hooks/useTheme'
import AccountApi from 'src/api/account.api'
import Role from 'src/utils/role'

function App(props) {
  const {themeLoaded, fetchThemes} = useTheme()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetchThemes()
  }, [])

  useEffect(() => {
    const checkRole = async () => {
      const {account} = await AccountApi.checkSignIn()
      if (account.username) {
        // set roles
        Role.setRoles(account.roles)
        Role.setPermissions(account.permissions)
      }

      setLoaded(true)
    }

    checkRole()
  }, [])

  return (
    <Choose>
      <When condition={loaded && themeLoaded}>{props.children}</When>
      <Otherwise>Loading ...</Otherwise>
    </Choose>
  )
}

export default React.memo(App, isEqual)
