import React from "react";
import ReactDOM from "react-dom";
import Adv from "./adv";
const Context = React.createContext();

const Family = () => (
  <ul style={{ background: "#eee", padding: 20 }}>
    <Persion />
  </ul>
);

const Persion = () => (
  <Context.Consumer>
    {context =>
      context.map((c, i) => (
        <React.Fragment key={i}>
          <li>{c.name}</li>
        </React.Fragment>
      ))
    }
  </Context.Consumer>
);

const App = () => (
  <Context.Provider value={LIST_VALUES_CONTEXT}>
    <Family />
  </Context.Provider>
);

const LIST_VALUES_CONTEXT = [
  {
    name: "Celia	Sutton"
  },
  {
    name: "Bradford	Cunningham"
  },
  {
    name: "Antonio	George"
  },
  {
    name: "Orlando	Dixon"
  }
];

ReactDOM.render(<Adv />, document.getElementById("root"));
