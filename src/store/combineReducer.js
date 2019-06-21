import { combineReducers } from "redux";

// reducers
import todoReducer from "../modules/todo/todo.reducer";

const combineReducer = combineReducers({
  todo: todoReducer
});

export default combineReducer;
