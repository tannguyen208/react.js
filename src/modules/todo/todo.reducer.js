import * as actionTypes from "./todo.actionType";

const initialTodoState = {
  data: [],
  status: "initial"
};

const todoReducer = (state = initialTodoState, action) => {
  const { type, status, payload } = action;

  switch (type) {
    case actionTypes.FETCH_TODOS_REQUEST:
      return { ...state, status, data: payload };

    case actionTypes.FETCH_TODOS_SUCCESS:
      return { ...state, status, data: payload };

    case actionTypes.FETCH_TODOS_FAILURE:
      return { ...state, status, errorMessage: payload.message };

    default:
      return state;
  }

};

export default todoReducer;
