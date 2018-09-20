import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

// redux
import rootReducers from "./reducers";
import CounterContainer from "./containers/CounterContainer";

let store = createStore(rootReducers, applyMiddleware());

const App = () => (
  <Provider store={store}>
    <CounterContainer />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
