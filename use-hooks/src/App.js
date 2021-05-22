import { useEffect, useState, useCallback } from 'react';
import './App.css';
import {
  useAsync,
  ASYNC_IDLE_STATUS,
  ASYNC_PENDING_STATUS,
  ASYNC_SUCCESS_STATUS,
  ASYNC_FAILURE_STATUS,
} from './hooks/useAsync';
import { useDebounce } from './hooks/useDebounce';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ApiFaker } from './mocks/api';

export default function App() {
  return (
    <AuthProvider>
      <HookUseAuth />
      <HookUseAsync />
      <HookUseDebounce />
    </AuthProvider>
  );
}

export function HookUseAuth() {
  const auth = useAuth();

  function renderSignIn() {
    return <div onClick={auth.signIn}>SignIn</div>;
  }

  function renderSignOut() {
    return <div onClick={auth.signOut}>SignOut</div>;
  }

  return (
    <div>
      {auth.isAuthenticated() ? renderSignOut() : renderSignIn()}
      <div>{auth.user}</div>
    </div>
  );
}

export function HookUseAsync() {
  const { value, status, error } = useAsync(ApiFaker.fetchUser, {
    immediate: true,
  });

  return (
    <div>
      {status === ASYNC_IDLE_STATUS && 'Idle'}
      {status === ASYNC_PENDING_STATUS && 'Fetching ...'}
      {status === ASYNC_SUCCESS_STATUS && value.fullName}
      {status === ASYNC_FAILURE_STATUS && error}
    </div>
  );
}

export function HookUseDebounce() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);

  useEffect(() => {
    // search term value after delay 2000ms
    if (debouncedSearchTerm) {
      // do something
      console.log(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Input search here ..."
    />
  );
}
