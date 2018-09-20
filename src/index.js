import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas/rootSaga";
import ProductsReducer from "./reducers/ProductsReducer";
import ProductsContainer from "./containers/ProductsContainer";

// saga
const sagaMiddleware = createSagaMiddleware();

// reducers
const rootReducers = combineReducers({
  ProductsReducer
});

// store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

const App = () => (
  <Provider store={store}>
    <ProductsContainer />
  </Provider>
);

sagaMiddleware.run(rootSaga);
ReactDOM.render(<App />, document.getElementById("root"));
