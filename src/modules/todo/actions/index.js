import * as actionTypes from "./types";

export const getTodos = dispatch => () => {
  dispatch({ type: actionTypes.GET_TODOS_REQUEST });

  return fetch("http://localhost:3001/api")
    .then(response => response.json())
    .then(todos => ({
      type: actionTypes.GET_TODOS_SUCCESS,
      payload: todos,
      error: false
    }))
    .catch(error => ({
      type: actionTypes.GET_TODOS_FAILURE,
      payload: error,
      error: true
    }));
};
