import * as actionTypes from "../actions/types";

const initialState = { todos: [], status: "initial" };
export const todoReducer = (state = initialState, action) => {
  let { type, status, payload } = action;
  switch (type) {
    case actionTypes.FETCH_TODOS_REQUEST:
      return { ...state, status, todos: payload };
    case actionTypes.FETCH_TODOS_SUCCESS:
      return { ...state, status, todos: payload };
    case actionTypes.FETCH_TODOS_FAILURE:
      return { ...state, status, errorMessage: action.payload.message };
    default:
      return state;
  }
};
