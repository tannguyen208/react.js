import React, { useState, useEffect, useContext, createContext } from 'react'
import omit from 'lodash/omit'
import { useLocalStorage } from './useLocalStorage'
import AccountApi from 'src/api/account.api'
import Role from 'src/utils/role'

const $AuthContext = createContext()
const $initialAccount = {}
const $initialToken = null

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({ children }) {
  const auth = useAuthProvider()
  return <$AuthContext.Provider value={auth}>{children}</$AuthContext.Provider>
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext($AuthContext)
}

// Provider hook that creates auth object and handles state
function useAuthProvider() {
  // use modal Account if applier
  const [token, setToken] = useLocalStorage('token', $initialToken)
  const [account, setAccount] = useState($initialAccount)

  const isAuthenticated = () => {
    return !!token
  }

  const signIn = async () => {
    let _token = $initialToken
    let _account = $initialAccount

    try {
      // fake api
      const { account } = await AccountApi.signIn()
      if (account.token) {
        _token = account.token
        _account = omit(account, ['token', 'roles', 'permissions'])
        Role.setRoles(account.roles)
        Role.setPermissions(account.permissions)
      }
    } catch (error) {
      //
    } finally {
      setToken(_token)
      setAccount(_account)
    }

    return !!_token
  }

  const signOut = async () => {
    try {
      await AccountApi.signOut()
    } catch (error) {
      //
    } finally {
      setToken($initialToken)
      setAccount($initialAccount)
    }
  }

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {}, [])

  return {
    account,
    isAuthenticated,
    signIn,
    signOut,
  }
}
