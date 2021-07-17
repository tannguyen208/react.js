import React, {useState, useEffect, useContext, createContext} from 'react'
import omit from 'lodash/omit'
import AccountApi from 'src/api/account.api'
import Role from 'src/utils/role'
import {useLocalStorage} from './useLocalStorage'

const AuthContext = createContext(undefined)
const initialAccount = {}
const initialToken = null

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({children}) {
  const auth = useAuthProvider()
  // eslint-disable-next-line react/jsx-filename-extension
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(AuthContext)

// Provider hook that creates auth object and handles state
function useAuthProvider() {
  // use modal Account if applier
  const [_token, setToken] = useLocalStorage('token', initialToken)
  const [_account, setAccount] = useState(initialAccount)

  const isAuthenticated = () => !!_token

  const signIn = async () => {
    let token = initialToken
    let account = initialAccount

    try {
      // fake api
      const {data} = await AccountApi.signIn()
      if (data.account.token) {
        token = data.account.token
        account = omit(account, ['token', 'roles', 'permissions'])
        Role.setRoles(data.account.roles)
        Role.setPermissions(data.account.permissions)
      }
    } catch (error) {
      //
    } finally {
      setToken(token)
      setAccount(account)
    }

    return !!token
  }

  const signOut = async () => {
    try {
      await AccountApi.signOut()
    } catch (error) {
      //
    } finally {
      setToken(initialToken)
      setAccount(initialAccount)
    }
  }

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {}, [])

  return {
    account: _account,
    isAuthenticated,
    signIn,
    signOut,
  }
}
