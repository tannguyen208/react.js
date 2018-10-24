import React from "react";
import { Context } from "./context";
// components
import Blog from "./modules/blog";
import Book from "./modules/book";
// data
import dataBlog from "./data/blog";
import dataBook from "./data/book";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Context.Provider value={dataBlog}>
          <div className={"blog"}>
            <Blog />
          </div>
        </Context.Provider>

        <hr />

        <Context.Provider value={dataBook}>
          <div className={"book"}>
            <Book />
          </div>
        </Context.Provider>
      </React.Fragment>
    );
  }
}

export default App;
