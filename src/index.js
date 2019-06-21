import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import configureStore from "./store/configureStore";
import "./index.css";

import Todo from "./modules/todo/todo.container";

/**
 * @version 1.0.0
 * @author [Tấn nguyễn](https://github.com/tannguyen208)
 * @function App  This is a description of the App. 💋
 */
export class App extends React.Component {
  render() {
    return (
      <Provider store={configureStore}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Todo} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
