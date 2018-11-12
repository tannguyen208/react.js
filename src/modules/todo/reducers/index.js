import * as actionTypes from "../actions/types";

const initialState = { todos: [] };
export const todoReducer = (state = initialState, action) => {
  console.log(action);
  
  switch (action.type) {
    case actionTypes.GET_TODOS_REQUEST:
      return { ...state, isFetching: true };
    case actionTypes.GET_TODOS_SUCCESS:
      return { ...state, isFetching: false, todos: action.payload };
    case actionTypes.GET_TODOS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.message
      };
    default:
      return state;
  }
};
