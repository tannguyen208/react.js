import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "src/serviceWorker";

import rootStore from "src/rootStore";

import Layout from "src/layouts";
import "src/index.css";

/**
 * @version 1.0.0
 * @author [Tấn nguyễn](https://github.com/tannguyen208)
 * @function App  This is a description of the App. 💋
 */
function App() {
  return (
    <Provider store={rootStore}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
