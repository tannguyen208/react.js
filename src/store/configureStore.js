import createSagaMiddleware from "redux-saga";
import { createStore, compose, applyMiddleware } from "redux";

import combineSaga from "./combineSaga";
import combineReducer from "./combineReducer";

// saga middleware
const sagaMiddleware = createSagaMiddleware();
const combineMiddleware = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = createStore(
  combineReducer,
  composeEnhancers(applyMiddleware(...combineMiddleware))
);

sagaMiddleware.run(combineSaga);

export default configureStore;
