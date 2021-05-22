import { useState, useEffect, useContext, createContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { ApiFaker } from '../mocks/api';

const $AuthContext = createContext();
const $initialUser = null;
const $initialToken = null;

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <$AuthContext.Provider value={auth}>{children}</$AuthContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext($AuthContext);
};

// Provider hook that creates auth object and handles state
function useAuthProvider() {
  // use modal User if applier
  const [user, setUser] = useState($initialUser);
  const [token, setToken] = useLocalStorage('token', $initialToken);

  const isAuthenticated = () => {
    return !!token;
  };

  const signIn = async () => {
    try {
      const signed = await ApiFaker.signIn();
      setUser(signed.username);
      setToken(signed.token);
    } catch (error) {
      //
    }
  };

  const signOut = async () => {
    try {
      await ApiFaker.signOut();
      setUser($initialUser);
      setToken($initialToken);
    } catch (error) {
      //
    }
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {}, []);

  return {
    user,
    isAuthenticated,
    signIn,
    signOut,
  };
}
