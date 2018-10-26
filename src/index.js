import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";

import rootStore from "./rootStore";

import HomePage from "pages/HomePage";
import "./index.css";

function App() {
  return (
    <Provider store={rootStore}>
      <HomePage />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
