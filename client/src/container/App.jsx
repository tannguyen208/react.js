import React, {useState, useEffect} from 'react'
import isEqual from 'lodash/isEqual'
import {useTheme} from 'src/hooks/useTheme'
import AccountApi from 'src/api/account.api'
import Role from 'src/utils/role'

function App(props) {
  const {children} = props
  const {themeLoaded, fetchThemes} = useTheme()
  const [loaded, setLoaded] = useState(false)

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

      setLoaded(true)
    }

    checkRole()
  }, [])

  return (
    <Choose>
      <When condition={loaded && themeLoaded}>{children}</When>
      <Otherwise>Loading ...</Otherwise>
    </Choose>
  )
}

export default React.memo(App, isEqual)
