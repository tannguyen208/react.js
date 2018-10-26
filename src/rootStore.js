import { createStore, compose, applyMiddleware } from "redux";

import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";
import { rootMiddleware, sagaMiddleware } from "./rootMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...rootMiddleware))
);

sagaMiddleware.run(rootSaga);
export default rootStore;
