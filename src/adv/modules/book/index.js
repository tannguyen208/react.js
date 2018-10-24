import React, { Component } from "react";
import { Context } from "../../context";

export default class Book extends Component {
  render() {
    return (
      <Context.Consumer>
        {context =>
          context.map((book, index) => (
            <React.Fragment key={index}>
              <h3>{book.name}</h3>
            </React.Fragment>
          ))
        }
      </Context.Consumer>
    );
  }
}
