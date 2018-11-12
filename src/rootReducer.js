import { combineReducers } from "redux";
import { errorReducer } from "./components/functions/loading/loadingError";
import { loadingReducer } from "./components/functions/loading/loadingReducer";
import { todoReducer } from "./modules/todo/reducers";

const rootReducer = combineReducers({
  loadingReducer,
  errorReducer,
  todoReducer
});

export default rootReducer;
