import { useEffect, useReducer, useCallback } from 'react';

export const ASYNC_IDLE_STATUS = '@status/idle';
export const ASYNC_PENDING_STATUS = '@status/pending';
export const ASYNC_SUCCESS_STATUS = '@status/success';
export const ASYNC_FAILURE_STATUS = '@status/failure';

// Initial state that we pass into useReducer
const initialState = {
  status: ASYNC_IDLE_STATUS,
  value: null,
  error: null,
};

// Our reducer function to handle state changes based on action
const reducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ASYNC_PENDING_STATUS:
      return {
        ...initialState,
        status: ASYNC_PENDING_STATUS,
      };

    case ASYNC_SUCCESS_STATUS:
      return {
        ...state,
        value: action.payload,
        status: ASYNC_SUCCESS_STATUS,
      };

    case ASYNC_FAILURE_STATUS:
      return {
        ...state,
        error: action.payload,
        status: ASYNC_FAILURE_STATUS,
      };
  }
};

export function useAsync(asyncFunction, { immediate = true }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    dispatch({ type: ASYNC_PENDING_STATUS });

    return asyncFunction()
      .then((payload) => {
        dispatch({ type: ASYNC_SUCCESS_STATUS, payload });
      })
      .catch((error) => {
        dispatch({ type: ASYNC_FAILURE_STATUS, payload: error });
      });
  }, [asyncFunction]);

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute,
    status: state.status,
    value: state.value,
    error: state.error,
  };
}
